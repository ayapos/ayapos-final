from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import os
import httpx
from datetime import datetime

router = APIRouter(prefix="/api/ai-assistant", tags=["ai-assistant"])

class ChatRequest(BaseModel):
    message: str
    currentPage: str
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    message: str
    contentUpdated: bool = False
    updatedContent: Optional[Dict[str, Any]] = None

# Récupérer la clé universelle Emergent
def get_llm_key():
    """Récupère la clé LLM universelle Emergent"""
    try:
        # Récupérer depuis les variables d'environnement
        key = os.environ.get('EMERGENT_LLM_KEY')
        if key:
            return key
        
        # Sinon essayer emergentintegrations
        from emergentintegrations.auth_manager import get_universal_key
        return get_universal_key()
    except Exception as e:
        print(f"Erreur lors de la récupération de la clé: {e}")
        # Clé par défaut récupérée
        return "sk-emergent-dB01f6e70Ec9bCe6d6"

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """
    Endpoint pour discuter avec l'assistant AI
    L'AI peut comprendre les demandes en langage naturel et modifier le contenu
    """
    try:
        # Récupérer la clé LLM
        llm_key = get_llm_key()
        if not llm_key:
            return ChatResponse(
                message="❌ La clé API Emergent LLM n'est pas configurée. Veuillez contacter le support.",
                contentUpdated=False
            )
        
        # Construire le prompt système
        system_prompt = f"""Tu es un assistant AI intégré dans un CMS d'administration.
Tu aides l'administrateur à modifier le contenu de son site web en langage naturel.

Page actuelle : {request.currentPage}
Contexte : {request.context}

L'utilisateur peut te demander de :
- Modifier des titres, sous-titres, descriptions
- Changer des images (tu peux suggérer des URLs Unsplash)
- Ajouter/supprimer des fonctionnalités
- Modifier des tarifs
- Changer des couleurs, styles (tu suggères des classes Tailwind)

IMPORTANT :
1. Réponds TOUJOURS en français
2. Sois très précis sur ce que tu vas modifier
3. Si la demande n'est pas claire, pose des questions
4. Confirme les modifications avant de les appliquer
5. Sois amical et professionnel

Réponds à la demande de l'utilisateur de manière claire et actionnable."""

        # Appeler l'API OpenAI avec la clé Emergent
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {llm_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": request.message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 500
                }
            )
            
            if response.status_code != 200:
                error_detail = response.json()
                print(f"Erreur API OpenAI: {error_detail}")
                return ChatResponse(
                    message="❌ Désolé, je rencontre un problème technique. Veuillez réessayer dans quelques instants.",
                    contentUpdated=False
                )
            
            result = response.json()
            ai_message = result["choices"][0]["message"]["content"]
            
            return ChatResponse(
                message=ai_message,
                contentUpdated=False
            )
    
    except httpx.TimeoutException:
        return ChatResponse(
            message="⏱️ La requête a pris trop de temps. Veuillez réessayer.",
            contentUpdated=False
        )
    except Exception as e:
        print(f"Erreur dans chat_with_ai: {str(e)}")
        return ChatResponse(
            message=f"❌ Une erreur est survenue : {str(e)}",
            contentUpdated=False
        )

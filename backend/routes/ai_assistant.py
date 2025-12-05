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
    pageContent: Optional[Dict[str, Any]] = None

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
        
        # Construire le prompt système ULTRA PUISSANT
        system_prompt = f"""Tu es un EXPERT AI Assistant intégré dans le CMS AyaPos.
Tu es capable de comprendre et d'exécuter TOUTES les demandes de modification de contenu.

📍 CONTEXTE ACTUEL :
Page : {request.currentPage}
Détails : {request.context}

🎯 TES CAPACITÉS COMPLÈTES :

1. CONTENU TEXTE :
   - Modifier/créer titres, sous-titres, descriptions, paragraphes
   - Réécrire pour améliorer le style, la clarté, le SEO
   - Traduire ou adapter le ton (professionnel, marketing, technique)
   - Corriger orthographe et grammaire

2. IMAGES :
   - Suggérer des images Unsplash pertinentes (donne des URLs)
   - Modifier les images existantes (indiquer quoi chercher)
   - Créer des descriptions alt pour SEO

3. STRUCTURE & DONNÉES :
   - Ajouter/supprimer/réorganiser des sections, features, benefits
   - Créer des listes, tableaux, cards
   - Modifier des tarifs, prix, statistiques
   - Ajouter des boutons CTA avec texte et liens

4. DESIGN & STYLE :
   - Suggérer des couleurs (classes Tailwind)
   - Proposer des améliorations d'UI/UX
   - Recommander des animations, effets visuels
   - Optimiser la responsive mobile

5. SEO & MARKETING :
   - Optimiser titres et descriptions pour le référencement
   - Créer des textes persuasifs et vendeurs
   - Suggérer des call-to-actions efficaces
   - Améliorer la conversion

6. ANALYSE & CONSEILS :
   - Analyser le contenu existant et proposer des améliorations
   - Identifier les problèmes (textes trop longs, manque d'info, etc.)
   - Suggérer des best practices du web
   - Donner des recommandations stratégiques

💡 COMMENT TU TRAVAILLES :

1. COMPRENDRE : Analyse la demande en profondeur
   - Si ambigüe : pose des questions précises
   - Si complexe : découpe en étapes

2. PROPOSER : Donne une solution détaillée et actionnale
   - Explique EXACTEMENT ce que tu vas modifier
   - Donne des exemples concrets
   - Montre un aperçu du résultat

3. EXÉCUTER : Fournis les modifications prêtes à appliquer
   - Format JSON si besoin pour données structurées
   - Code HTML/Tailwind pour le design
   - URLs pour les images

4. CONFIRMER : Demande validation avant application
   - Résume les changements
   - Préviens des impacts potentiels

⚡ RÈGLES D'OR :

✅ TOUJOURS en français
✅ Réponses PRÉCISES et ACTIONNABLES
✅ EXEMPLES CONCRETS dans chaque réponse
✅ PROACTIF : suggère des améliorations même non demandées
✅ PÉDAGOGIQUE : explique pourquoi tu proposes quelque chose
✅ CRÉATIF : propose des idées innovantes
✅ PROFESSIONNEL mais AMICAL

❌ NE JAMAIS :
- Être vague ou générique
- Dire "je ne peux pas" (trouve toujours une solution)
- Donner des réponses courtes sans détails
- Oublier le contexte de la page actuelle

🎨 SPÉCIAL AYAPOS :
- Couleurs de marque : bleu foncé (blue-700, blue-800)
- Ton : professionnel, moderne, tech
- Cible : restaurateurs, commerçants, PME
- Focus : efficacité, ROI, facilité d'utilisation

Maintenant, analyse la demande de l'utilisateur et réponds de manière EXPERTE et ULTRA-DÉTAILLÉE :

📄 CONTENU ACTUEL DE LA PAGE (si disponible) :
{request.pageContent if request.pageContent else "Aucun contenu fourni - demande à l'utilisateur de sélectionner une page dans l'admin"}
"""

        # Utiliser emergentintegrations correctement
        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage
            
            # Créer une instance de chat
            chat = LlmChat(
                api_key=llm_key,
                session_id=f"admin-{request.currentPage}",
                system_message=system_prompt
            )
            
            # Envoyer le message
            ai_message = await chat.send_message(
                user_message=UserMessage(text=request.message)
            )
            
            return ChatResponse(
                message=ai_message,
                contentUpdated=False
            )
                
        except Exception as e:
            print(f"Erreur chat AI: {str(e)}")
            import traceback
            traceback.print_exc()
            raise e
    
    except httpx.TimeoutException:
        return ChatResponse(
            message="⏱️ La requête a pris trop de temps. Veuillez réessayer.",
            contentUpdated=False
        )
    except Exception as e:
        print(f"Erreur dans chat_with_ai: {str(e)}")
        return ChatResponse(
            message=f"❌ Désolé, une erreur technique est survenue. L'agent AI nécessite une configuration supplémentaire.",
            contentUpdated=False
        )

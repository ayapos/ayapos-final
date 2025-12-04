from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/content", tags=["Content Management"])

class ContentSection(BaseModel):
    id: str
    type: str  # 'text', 'image', 'title', 'description'
    label: str
    value: str
    order: int

class PageContent(BaseModel):
    page: str
    sections: List[ContentSection]
    updatedAt: Optional[datetime] = None

class ContentUpdate(BaseModel):
    sections: List[ContentSection]

@router.get("/")
async def get_all_content():
    """
    Get all content for all pages (public endpoint)
    """
    try:
        content_list = await db.content.find({}, {"_id": 0}).to_list(1000)
        
        # If no content exists, initialize with default structure
        if not content_list:
            content_list = await initialize_default_content()
        
        return {"success": True, "content": content_list}
    except Exception as e:
        logger.error(f"Error fetching content: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération du contenu"
        )

@router.get("/{page_name}")
async def get_page_content(page_name: str):
    """
    Get content for a specific page (public endpoint)
    """
    try:
        # Try to find by 'slug' first (new format), then by 'page' (old format)
        content = await db.content.find_one({"slug": page_name}, {"_id": 0})
        
        if not content:
            content = await db.content.find_one({"page": page_name}, {"_id": 0})
        
        if not content:
            # Return default structure if page doesn't exist yet
            content = get_default_page_structure(page_name)
        
        return {"success": True, "content": content}
    except Exception as e:
        logger.error(f"Error fetching content for {page_name}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la récupération du contenu de {page_name}"
        )

@router.put("/{page_name}")
async def update_page_content(
    page_name: str,
    content_data: Dict[str, Any],
    email: str = Depends(verify_token)
):
    """
    Update content for a specific page (protected endpoint) - NOUVEAU FORMAT FLEXIBLE
    Accepte n'importe quelle structure de contenu
    """
    try:
        # Si le format contient "content", l'extraire
        if "content" in content_data:
            content_to_save = content_data["content"]
        else:
            content_to_save = content_data
        
        # Ajouter le slug et la date de mise à jour
        content_to_save["slug"] = page_name
        content_to_save["updatedAt"] = datetime.utcnow().isoformat()
        
        # Mise à jour dans la base de données
        result = await db.content.update_one(
            {"slug": page_name},
            {"$set": content_to_save},
            upsert=True
        )
        
        logger.info(f"Content updated for page {page_name} by {email} - {result.modified_count} docs modified")
        
        return {
            "success": True,
            "message": f"Contenu de {page_name} mis à jour avec succès",
            "page": page_name
        }
    except Exception as e:
        logger.error(f"Error updating content for {page_name}: {str(e)}")
        logger.exception(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de la mise à jour: {str(e)}"
        )

async def initialize_default_content():
    """
    Initialize default content structure for all pages
    """
    pages = [
        "home", "pricing", "ayapay", "it-services", "contact",
        "terms", "privacy", "blog", "callback-popup"
    ]
    
    default_content = []
    for page in pages:
        content = get_default_page_structure(page)
        await db.content.insert_one(content)
        # Remove _id for response
        content_response = {k: v for k, v in content.items() if k != '_id'}
        default_content.append(content_response)
    
    return default_content

def get_default_page_structure(page_name: str) -> dict:
    """
    Get default content structure for a page
    """
    
    # Common structure that can be extended per page
    default_structures = {
        "home": [
            {"id": "hero-title", "type": "title", "label": "Titre Principal", "value": "Solutions POS Nouvelle Génération", "order": 1},
            {"id": "hero-subtitle", "type": "text", "label": "Sous-titre", "value": "Transformez votre entreprise avec AyaPos", "order": 2},
            {"id": "hero-image", "type": "image", "label": "Image Hero", "value": "/images/hero-default.jpg", "order": 3}
        ],
        "pricing": [
            {"id": "pricing-title", "type": "title", "label": "Titre Tarification", "value": "Nos Tarifs", "order": 1},
            {"id": "pricing-subtitle", "type": "text", "label": "Sous-titre", "value": "Choisissez la solution adaptée à vos besoins", "order": 2}
        ],
        "callback-popup": [
            {"id": "popup-title", "type": "title", "label": "Titre Popup", "value": "Besoin d'aide ?", "order": 1},
            {"id": "popup-description", "type": "text", "label": "Description", "value": "Laissez-nous vos coordonnées, nous vous rappelons", "order": 2}
        ]
    }
    
    sections = default_structures.get(page_name, [
        {"id": "title", "type": "title", "label": "Titre", "value": f"Page {page_name}", "order": 1}
    ])
    
    return {
        "page": page_name,
        "sections": sections,
        "updatedAt": datetime.utcnow()
    }

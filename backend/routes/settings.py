from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/settings", tags=["Settings"])

class SiteSettings(BaseModel):
    popupEnabled: bool = True
    popupDelay: int = 5
    cookieConsentEnabled: bool = True
    maintenanceMode: bool = False
    analyticsEnabled: bool = False
    analyticsCode: Optional[str] = None
    metaTitle: Optional[str] = None
    metaDescription: Optional[str] = None
    metaKeywords: Optional[str] = None

@router.get("/")
async def get_settings():
    try:
        settings = await db.settings.find_one({}, {"_id": 0})
        if not settings:
            settings = {
                "popupEnabled": True,
                "popupDelay": 5,
                "cookieConsentEnabled": True,
                "maintenanceMode": False
            }
        return {"success": True, "settings": settings}
    except Exception as e:
        logger.error(f"Error fetching settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des paramètres")

@router.put("/")
async def update_settings(settings: SiteSettings, email: str = Depends(verify_token)):
    try:
        settings_dict = settings.dict()
        settings_dict["updatedAt"] = datetime.utcnow()
        
        await db.settings.delete_many({})
        await db.settings.insert_one(settings_dict)
        
        logger.info(f"Settings updated by {email}")
        return {"success": True, "message": "Paramètres mis à jour avec succès"}
    except Exception as e:
        logger.error(f"Error updating settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

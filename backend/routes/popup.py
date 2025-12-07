from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/api/popup", tags=["popup"])

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

class PopupConfig(BaseModel):
    enabled: bool
    title: str
    description: str
    image: Optional[str] = None
    button_text: str = "Contactez-nous"
    contact_email: str = "emrah@ayapos.com"
    whatsapp_number: Optional[str] = None
    show_on_pages: list = ["home"]

@router.get("/config")
async def get_popup_config():
    """Get popup configuration"""
    try:
        config = await db.popup_config.find_one({}, {"_id": 0})
        if not config:
            # Default config
            config = {
                "enabled": False,
                "title": "Offre Spéciale",
                "description": "Découvrez nos promotions exclusives !",
                "image": None,
                "button_text": "Contactez-nous",
                "contact_email": "emrah@ayapos.com",
                "whatsapp_number": None,
                "show_on_pages": ["home"]
            }
        return {"success": True, "config": config}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/config")
async def update_popup_config(config: PopupConfig):
    """Update popup configuration"""
    try:
        config_dict = config.dict()
        config_dict["updatedAt"] = datetime.utcnow()
        
        await db.popup_config.delete_many({})
        await db.popup_config.insert_one(config_dict)
        
        return {"success": True, "message": "Popup configuration updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

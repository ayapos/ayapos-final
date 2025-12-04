from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/company", tags=["Company Info"])

class SocialMedia(BaseModel):
    facebook: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    instagram: Optional[str] = None
    youtube: Optional[str] = None

class CompanyInfo(BaseModel):
    name: str
    slogan: Optional[str] = None
    description: Optional[str] = None
    email: EmailStr
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    postalCode: Optional[str] = None
    country: Optional[str] = None
    openingHours: Optional[str] = None
    logo: Optional[str] = None
    favicon: Optional[str] = None
    socialMedia: Optional[SocialMedia] = None

@router.get("/")
async def get_company_info():
    try:
        info = await db.company_info.find_one({}, {"_id": 0})
        if not info:
            info = {
                "name": "AyaPos",
                "email": "contact@ayapos.com",
                "phone": "+41 XX XXX XX XX"
            }
        return {"success": True, "info": info}
    except Exception as e:
        logger.error(f"Error fetching company info: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des informations")

@router.put("/")
async def update_company_info(info: CompanyInfo, email: str = Depends(verify_token)):
    try:
        info_dict = info.dict()
        info_dict["updatedAt"] = datetime.utcnow()
        
        await db.company_info.delete_many({})
        await db.company_info.insert_one(info_dict)
        
        logger.info(f"Company info updated by {email}")
        return {"success": True, "message": "Informations mises à jour avec succès"}
    except Exception as e:
        logger.error(f"Error updating company info: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/hero", tags=["Hero/Carousel"])

class HeroSlide(BaseModel):
    id: Optional[str] = None
    title: str
    subtitle: Optional[str] = None
    description: Optional[str] = None
    image: str
    buttonText: Optional[str] = None
    buttonLink: Optional[str] = None
    active: bool = True
    order: int = 0

@router.get("/")
async def get_all_slides():
    try:
        slides = await db.hero_slides.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "slides": slides}
    except Exception as e:
        logger.error(f"Error fetching slides: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/")
async def create_slide(slide: HeroSlide, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        slide_dict = slide.dict()
        slide_dict["id"] = str(uuid4())
        slide_dict["createdAt"] = datetime.utcnow()
        await db.hero_slides.insert_one(slide_dict)
        return {"success": True, "message": "Slide créé", "id": slide_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating slide: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/{slide_id}")
async def update_slide(slide_id: str, slide: HeroSlide, email: str = Depends(verify_token)):
    try:
        slide_dict = slide.dict(exclude={"id"})
        slide_dict["updatedAt"] = datetime.utcnow()
        result = await db.hero_slides.update_one({"id": slide_id}, {"$set": slide_dict})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Slide non trouvé")
        return {"success": True, "message": "Slide mis à jour"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating slide: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.delete("/{slide_id}")
async def delete_slide(slide_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.hero_slides.delete_one({"id": slide_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Slide non trouvé")
        return {"success": True, "message": "Slide supprimé"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting slide: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

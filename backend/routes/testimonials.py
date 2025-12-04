from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/testimonials", tags=["Testimonials"])

class Testimonial(BaseModel):
    id: Optional[str] = None
    name: str
    company: str
    position: Optional[str] = None
    rating: int = 5
    comment: str
    photo: Optional[str] = None
    featured: bool = False
    order: int = 0

@router.get("/")
async def get_all_testimonials():
    try:
        testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "testimonials": testimonials}
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des témoignages")

@router.post("/")
async def create_testimonial(testimonial: Testimonial, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        test_dict = testimonial.dict()
        test_dict["id"] = str(uuid4())
        test_dict["createdAt"] = datetime.utcnow()
        
        await db.testimonials.insert_one(test_dict)
        logger.info(f"Testimonial created by {email}")
        
        return {"success": True, "message": "Témoignage créé avec succès", "id": test_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création")

@router.put("/{testimonial_id}")
async def update_testimonial(testimonial_id: str, testimonial: Testimonial, email: str = Depends(verify_token)):
    try:
        test_dict = testimonial.dict(exclude={"id"})
        test_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": test_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Témoignage non trouvé")
        
        return {"success": True, "message": "Témoignage mis à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

@router.delete("/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.testimonials.delete_one({"id": testimonial_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Témoignage non trouvé")
        
        return {"success": True, "message": "Témoignage supprimé avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression")

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/faq", tags=["FAQ"])

class FAQItem(BaseModel):
    id: Optional[str] = None
    question: str
    answer: str
    category: Optional[str] = "Général"
    order: int = 0
    active: bool = True

@router.get("/")
async def get_all_faq():
    try:
        faq = await db.faq.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "faq": faq}
    except Exception as e:
        logger.error(f"Error fetching FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération de la FAQ")

@router.post("/")
async def create_faq(faq: FAQItem, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        faq_dict = faq.dict()
        faq_dict["id"] = str(uuid4())
        faq_dict["createdAt"] = datetime.utcnow()
        
        await db.faq.insert_one(faq_dict)
        logger.info(f"FAQ created by {email}")
        
        return {"success": True, "message": "FAQ créée avec succès", "id": faq_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création")

@router.put("/{faq_id}")
async def update_faq(faq_id: str, faq: FAQItem, email: str = Depends(verify_token)):
    try:
        faq_dict = faq.dict(exclude={"id"})
        faq_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.faq.update_one(
            {"id": faq_id},
            {"$set": faq_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="FAQ non trouvée")
        
        return {"success": True, "message": "FAQ mise à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

@router.delete("/{faq_id}")
async def delete_faq(faq_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.faq.delete_one({"id": faq_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="FAQ non trouvée")
        
        return {"success": True, "message": "FAQ supprimée avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting FAQ: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression")

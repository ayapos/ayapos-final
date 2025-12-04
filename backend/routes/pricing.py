from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/pricing", tags=["Pricing Management"])

class PricingFeature(BaseModel):
    text: str
    included: bool = True

class PricingPlan(BaseModel):
    id: Optional[str] = None
    name: str
    price: float
    currency: str = "CHF"
    period: str = "mois"
    description: str
    features: List[PricingFeature]
    badge: Optional[str] = None
    buttonText: str = "Choisir ce plan"
    highlighted: bool = False
    image: Optional[str] = None
    order: int = 0

@router.get("/")
async def get_all_plans():
    try:
        plans = await db.pricing_plans.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "plans": plans}
    except Exception as e:
        logger.error(f"Error fetching pricing plans: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des plans")

@router.post("/")
async def create_plan(plan: PricingPlan, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        plan_dict = plan.dict()
        plan_dict["id"] = str(uuid4())
        plan_dict["createdAt"] = datetime.utcnow()
        plan_dict["updatedAt"] = datetime.utcnow()
        
        await db.pricing_plans.insert_one(plan_dict)
        logger.info(f"Pricing plan created by {email}")
        
        return {"success": True, "message": "Plan créé avec succès", "id": plan_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating pricing plan: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création du plan")

@router.put("/{plan_id}")
async def update_plan(plan_id: str, plan: PricingPlan, email: str = Depends(verify_token)):
    try:
        plan_dict = plan.dict(exclude={"id"})
        plan_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.pricing_plans.update_one(
            {"id": plan_id},
            {"$set": plan_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Plan non trouvé")
        
        logger.info(f"Pricing plan {plan_id} updated by {email}")
        return {"success": True, "message": "Plan mis à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating pricing plan: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour du plan")

@router.delete("/{plan_id}")
async def delete_plan(plan_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.pricing_plans.delete_one({"id": plan_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Plan non trouvé")
        
        logger.info(f"Pricing plan {plan_id} deleted by {email}")
        return {"success": True, "message": "Plan supprimé avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting pricing plan: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression du plan")

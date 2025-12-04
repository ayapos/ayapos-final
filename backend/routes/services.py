from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/services", tags=["Services"])

class Service(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    icon: Optional[str] = None
    price: Optional[float] = None
    priceType: Optional[str] = "Sur devis"
    category: Optional[str] = None
    features: Optional[List[str]] = []
    image: Optional[str] = None
    active: bool = True
    order: int = 0

@router.get("/")
async def get_all_services():
    try:
        services = await db.services.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "services": services}
    except Exception as e:
        logger.error(f"Error fetching services: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des services")

@router.post("/")
async def create_service(service: Service, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        svc_dict = service.dict()
        svc_dict["id"] = str(uuid4())
        svc_dict["createdAt"] = datetime.utcnow()
        
        await db.services.insert_one(svc_dict)
        logger.info(f"Service created by {email}")
        
        return {"success": True, "message": "Service créé avec succès", "id": svc_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating service: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création")

@router.put("/{service_id}")
async def update_service(service_id: str, service: Service, email: str = Depends(verify_token)):
    try:
        svc_dict = service.dict(exclude={"id"})
        svc_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.services.update_one(
            {"id": service_id},
            {"$set": svc_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Service non trouvé")
        
        return {"success": True, "message": "Service mis à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating service: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

@router.delete("/{service_id}")
async def delete_service(service_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.services.delete_one({"id": service_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Service non trouvé")
        
        return {"success": True, "message": "Service supprimé avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting service: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression")

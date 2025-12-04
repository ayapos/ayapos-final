from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/leads", tags=["Leads Management"])

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

@router.get("/")
async def get_all_leads(email: str = Depends(verify_token)):
    try:
        # Get contacts
        contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
        
        # Get callbacks
        callbacks = await db.callbacks.find({}, {"_id": 0}).to_list(1000)
        
        # Combine and sort by date
        all_leads = []
        
        for contact in contacts:
            all_leads.append({
                **contact,
                "type": "contact",
                "source": "Formulaire Contact"
            })
        
        for callback in callbacks:
            all_leads.append({
                **callback,
                "type": "callback",
                "source": "Popup Rappel"
            })
        
        # Sort by createdAt
        all_leads.sort(key=lambda x: x.get('createdAt', datetime.min), reverse=True)
        
        return {"success": True, "leads": all_leads, "total": len(all_leads)}
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des leads")

@router.put("/{lead_id}")
async def update_lead(lead_id: str, lead_update: LeadUpdate, email: str = Depends(verify_token)):
    try:
        update_dict = lead_update.dict(exclude_none=True)
        update_dict["updatedAt"] = datetime.utcnow()
        
        # Try to update in contacts collection
        result = await db.contacts.update_one(
            {"id": lead_id},
            {"$set": update_dict}
        )
        
        # If not found, try callbacks collection
        if result.matched_count == 0:
            result = await db.callbacks.update_one(
                {"id": lead_id},
                {"$set": update_dict}
            )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Lead non trouvé")
        
        logger.info(f"Lead {lead_id} updated by {email}")
        return {"success": True, "message": "Lead mis à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

@router.delete("/{lead_id}")
async def delete_lead(lead_id: str, email: str = Depends(verify_token)):
    try:
        # Try to delete from contacts
        result = await db.contacts.delete_one({"id": lead_id})
        
        # If not found, try callbacks
        if result.deleted_count == 0:
            result = await db.callbacks.delete_one({"id": lead_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Lead non trouvé")
        
        logger.info(f"Lead {lead_id} deleted by {email}")
        return {"success": True, "message": "Lead supprimé avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression")

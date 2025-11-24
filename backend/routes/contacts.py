from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
import logging
from bson import ObjectId

from models import (
    ContactCreate,
    ContactResponse,
    ContactUpdate,
    SuccessResponse,
    ContactStatus
)
from database import get_database
from utils.email_service import send_contact_notification

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contacts", tags=["contacts"])

@router.post("/", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(contact: ContactCreate):
    """
    Create a new contact submission from the website form.
    """
    try:
        db = get_database()
        
        # Prepare contact document
        contact_dict = contact.dict()
        contact_dict.update({
            "status": ContactStatus.NEW.value,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow(),
            "notes": ""
        })
        
        # Insert into database
        result = await db.contacts.insert_one(contact_dict)
        contact_id = str(result.inserted_id)
        
        logger.info(f"New contact created: {contact_id} from {contact.email}")
        
        # Send email notification (non-blocking)
        try:
            await send_contact_notification(contact_dict, contact_id)
        except Exception as e:
            logger.error(f"Failed to send email notification: {e}")
            # Don't fail the request if email fails
        
        return SuccessResponse(
            success=True,
            message="Votre demande a été reçue avec succès. Nous vous contacterons bientôt!",
            id=contact_id
        )
    
    except Exception as e:
        logger.error(f"Error creating contact: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Une erreur s'est produite lors de l'enregistrement de votre demande."
        )

@router.get("/", response_model=List[ContactResponse])
async def get_all_contacts(skip: int = 0, limit: int = 100, status_filter: str = None):
    """
    Get all contact submissions (for admin use).
    """
    try:
        db = get_database()
        
        # Build query
        query = {}
        if status_filter:
            query["status"] = status_filter
        
        # Fetch contacts
        cursor = db.contacts.find(query).sort("createdAt", -1).skip(skip).limit(limit)
        contacts = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string
        result = []
        for contact in contacts:
            contact["id"] = str(contact.pop("_id"))
            result.append(ContactResponse(**contact))
        
        return result
    
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération des contacts."
        )

@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(contact_id: str):
    """
    Get a specific contact submission by ID.
    """
    try:
        db = get_database()
        
        # Validate ObjectId
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="ID de contact invalide."
            )
        
        # Fetch contact
        contact = await db.contacts.find_one({"_id": ObjectId(contact_id)})
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact non trouvé."
            )
        
        contact["id"] = str(contact.pop("_id"))
        return ContactResponse(**contact)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact {contact_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la récupération du contact."
        )

@router.patch("/{contact_id}", response_model=SuccessResponse)
async def update_contact(contact_id: str, update: ContactUpdate):
    """
    Update a contact's status or notes (for admin use).
    """
    try:
        db = get_database()
        
        # Validate ObjectId
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="ID de contact invalide."
            )
        
        # Prepare update data
        update_data = {k: v for k, v in update.dict().items() if v is not None}
        if update_data:
            update_data["updatedAt"] = datetime.utcnow()
        
        # Update contact
        result = await db.contacts.update_one(
            {"_id": ObjectId(contact_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact non trouvé."
            )
        
        return SuccessResponse(
            success=True,
            message="Contact mis à jour avec succès.",
            id=contact_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact {contact_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la mise à jour du contact."
        )

@router.delete("/{contact_id}", response_model=SuccessResponse)
async def delete_contact(contact_id: str):
    """
    Delete a contact submission (for admin use).
    """
    try:
        db = get_database()
        
        # Validate ObjectId
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="ID de contact invalide."
            )
        
        # Delete contact
        result = await db.contacts.delete_one({"_id": ObjectId(contact_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact non trouvé."
            )
        
        return SuccessResponse(
            success=True,
            message="Contact supprimé avec succès.",
            id=contact_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact {contact_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la suppression du contact."
        )

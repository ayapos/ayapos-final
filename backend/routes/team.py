from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/team", tags=["Team"])

class TeamMember(BaseModel):
    id: Optional[str] = None
    name: str
    position: str
    bio: Optional[str] = None
    photo: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    social: Optional[Dict[str, str]] = {}
    order: int = 0

@router.get("/")
async def get_team():
    try:
        team = await db.team.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "members": team}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/")
async def create_member(member: TeamMember, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        member_dict = member.dict()
        member_dict["id"] = str(uuid4())
        member_dict["createdAt"] = datetime.utcnow()
        await db.team.insert_one(member_dict)
        return {"success": True, "message": "Membre ajouté", "id": member_dict["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/{member_id}")
async def update_member(member_id: str, member: TeamMember, email: str = Depends(verify_token)):
    try:
        member_dict = member.dict(exclude={"id"})
        member_dict["updatedAt"] = datetime.utcnow()
        result = await db.team.update_one({"id": member_id}, {"$set": member_dict})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Membre non trouvé")
        return {"success": True, "message": "Membre mis à jour"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.delete("/{member_id}")
async def delete_member(member_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.team.delete_one({"id": member_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Membre non trouvé")
        return {"success": True, "message": "Membre supprimé"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

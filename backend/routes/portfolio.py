from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])

class PortfolioProject(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    category: str
    image: Optional[str] = None
    images: Optional[List[str]] = []
    client: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None
    technologies: Optional[List[str]] = []
    featured: bool = False
    order: int = 0

@router.get("/")
async def get_all_projects():
    try:
        projects = await db.portfolio.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "projects": projects}
    except Exception as e:
        logger.error(f"Error fetching portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération du portfolio")

@router.post("/")
async def create_project(project: PortfolioProject, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        proj_dict = project.dict()
        proj_dict["id"] = str(uuid4())
        proj_dict["createdAt"] = datetime.utcnow()
        
        await db.portfolio.insert_one(proj_dict)
        logger.info(f"Portfolio project created by {email}")
        
        return {"success": True, "message": "Projet créé avec succès", "id": proj_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création")

@router.put("/{project_id}")
async def update_project(project_id: str, project: PortfolioProject, email: str = Depends(verify_token)):
    try:
        proj_dict = project.dict(exclude={"id"})
        proj_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.portfolio.update_one(
            {"id": project_id},
            {"$set": proj_dict}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Projet non trouvé")
        
        return {"success": True, "message": "Projet mis à jour avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour")

@router.delete("/{project_id}")
async def delete_project(project_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.portfolio.delete_one({"id": project_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Projet non trouvé")
        
        return {"success": True, "message": "Projet supprimé avec succès"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting project: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression")

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/navigation", tags=["Navigation"])

class MenuItem(BaseModel):
    label: str
    url: str
    icon: Optional[str] = None
    external: bool = False

class NavItem(BaseModel):
    id: Optional[str] = None
    label: str
    url: str
    type: str = "link"
    icon: Optional[str] = None
    dropdown: Optional[List[MenuItem]] = []
    order: int = 0
    active: bool = True

@router.get("/menu")
async def get_menu():
    try:
        items = await db.navigation.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "menu": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/menu")
async def create_menu_item(item: NavItem, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        item_dict = item.dict()
        item_dict["id"] = str(uuid4())
        await db.navigation.insert_one(item_dict)
        return {"success": True, "message": "Menu ajouté", "id": item_dict["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/menu/{item_id}")
async def update_menu_item(item_id: str, item: NavItem, email: str = Depends(verify_token)):
    try:
        item_dict = item.dict(exclude={"id"})
        result = await db.navigation.update_one({"id": item_id}, {"$set": item_dict})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Item non trouvé")
        return {"success": True, "message": "Menu mis à jour"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.delete("/menu/{item_id}")
async def delete_menu_item(item_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.navigation.delete_one({"id": item_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Item non trouvé")
        return {"success": True, "message": "Menu supprimé"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

class FooterColumn(BaseModel):
    title: str
    links: List[MenuItem]

class FooterData(BaseModel):
    columns: List[FooterColumn]
    copyright: str
    socialLinks: Optional[Dict] = {}

@router.get("/footer")
async def get_footer():
    try:
        footer = await db.footer.find_one({}, {"_id": 0})
        if not footer:
            footer = {"columns": [], "copyright": "© 2024 AyaPos. Tous droits réservés.", "socialLinks": {}}
        return {"success": True, "footer": footer}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/footer")
async def update_footer(footer: FooterData, email: str = Depends(verify_token)):
    try:
        footer_dict = footer.dict()
        footer_dict["updatedAt"] = datetime.utcnow()
        await db.footer.delete_many({})
        await db.footer.insert_one(footer_dict)
        return {"success": True, "message": "Footer mis à jour"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

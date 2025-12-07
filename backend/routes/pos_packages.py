from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

router = APIRouter()

# Database connection
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

class POSPackage(BaseModel):
    id: str
    title: str
    icon: str
    best: str
    price: str
    description: str
    features: List[str]
    order: int
    badge: Optional[str] = None

class POSPackageUpdate(BaseModel):
    title: Optional[str] = None
    icon: Optional[str] = None
    best: Optional[str] = None
    price: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    order: Optional[int] = None
    badge: Optional[str] = None

@router.get("/packages")
async def get_pos_packages():
    """Get all POS packages sorted by order"""
    try:
        packages = await db.pos_packages.find({}, {"_id": 0}).sort("order", 1).to_list(100)
        return {"success": True, "packages": packages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/packages/{package_id}")
async def get_pos_package(package_id: str):
    """Get a specific POS package"""
    try:
        package = await db.pos_packages.find_one({"id": package_id}, {"_id": 0})
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")
        return {"success": True, "package": package}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/packages")
async def create_pos_package(package: POSPackage):
    """Create a new POS package"""
    try:
        # Check if package with same ID exists
        existing = await db.pos_packages.find_one({"id": package.id})
        if existing:
            raise HTTPException(status_code=400, detail="Package with this ID already exists")
        
        package_dict = package.dict()
        package_dict["createdAt"] = datetime.utcnow()
        package_dict["updatedAt"] = datetime.utcnow()
        
        await db.pos_packages.insert_one(package_dict)
        return {"success": True, "message": "Package created successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/packages/{package_id}")
async def update_pos_package(package_id: str, updates: POSPackageUpdate):
    """Update a POS package"""
    try:
        update_data = {k: v for k, v in updates.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No updates provided")
        
        update_data["updatedAt"] = datetime.utcnow()
        
        result = await db.pos_packages.update_one(
            {"id": package_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        
        return {"success": True, "message": "Package updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/packages/{package_id}")
async def delete_pos_package(package_id: str):
    """Delete a POS package"""
    try:
        result = await db.pos_packages.delete_one({"id": package_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        
        return {"success": True, "message": "Package deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

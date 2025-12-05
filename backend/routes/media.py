from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api/media", tags=["media"])

# Connexion MongoDB
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def get_db():
    """Obtenir la connexion à la base de données"""
    client = AsyncIOMotorClient(MONGO_URL)
    return client.test_database

@router.get("/images")
async def get_all_images():
    """Récupérer toutes les images de la bibliothèque"""
    try:
        db = await get_db()
        # Récupérer toutes les images uploadées
        images_cursor = db.uploads.find({}).sort("uploadedAt", -1)
        images = await images_cursor.to_list(length=1000)
        
        # Convertir ObjectId en string
        for img in images:
            img['_id'] = str(img['_id'])
        
        return {
            "success": True,
            "images": images
        }
    except Exception as e:
        print(f"Erreur get_all_images: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/images/{image_id}")
async def delete_image(image_id: str, db=Depends(get_database)):
    """Supprimer une image de la bibliothèque"""
    try:
        # Récupérer l'image
        image = await db.uploads.find_one({"_id": ObjectId(image_id)})
        
        if not image:
            raise HTTPException(status_code=404, detail="Image non trouvée")
        
        # Supprimer le fichier physique
        file_path = image.get('path', '')
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Erreur suppression fichier: {e}")
        
        # Supprimer de la base de données
        await db.uploads.delete_one({"_id": ObjectId(image_id)})
        
        return {
            "success": True,
            "message": "Image supprimée avec succès"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Erreur delete_image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_media_stats(db=Depends(get_database)):
    """Statistiques de la bibliothèque média"""
    try:
        total_images = await db.uploads.count_documents({})
        
        # Calculer la taille totale
        images = await db.uploads.find({}, {"size": 1}).to_list(length=None)
        total_size = sum(img.get('size', 0) for img in images)
        
        return {
            "success": True,
            "stats": {
                "total_images": total_images,
                "total_size_mb": round(total_size / (1024 * 1024), 2)
            }
        }
    except Exception as e:
        print(f"Erreur get_media_stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

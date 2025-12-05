from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from typing import List
import os
import logging
import uuid
from pathlib import Path
import shutil
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/upload", tags=["File Upload"])

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def get_db():
    """Get database connection"""
    client = AsyncIOMotorClient(MONGO_URL)
    return client.test_database

# Upload directory
UPLOAD_DIR = Path("/app/frontend/public/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_image(filename: str, file_size: int) -> None:
    """Validate image file"""
    ext = Path(filename).suffix.lower()
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Type de fichier non autorisé. Extensions autorisées: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Fichier trop volumineux. Taille max: 5MB"
        )

@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    email: str = Depends(verify_token)
):
    """
    Upload an image file (protected endpoint)
    """
    try:
        # Read file content to get size
        contents = await file.read()
        file_size = len(contents)
        
        # Validate file
        validate_image(file.filename, file_size)
        
        # Generate unique filename
        file_ext = Path(file.filename).suffix.lower()
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Return URL path (relative to public folder)
        file_url = f"/uploads/{unique_filename}"
        
        # Save metadata to MongoDB
        db = await get_db()
        upload_doc = {
            "filename": file.filename,
            "unique_filename": unique_filename,
            "url": file_url,
            "path": str(file_path),
            "size": file_size,
            "uploadedBy": email,
            "uploadedAt": datetime.now(timezone.utc).isoformat()
        }
        await db.uploads.insert_one(upload_doc)
        
        logger.info(f"File uploaded: {unique_filename} by {email}")
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "success": True,
                "message": "Image téléchargée avec succès",
                "url": file_url,
                "filename": unique_filename
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors du téléchargement du fichier"
        )

@router.post("")
async def upload_image_simple(
    file: UploadFile = File(...),
    email: str = Depends(verify_token)
):
    """
    Upload an image file - endpoint sans suffix (protected)
    """
    try:
        # Read file content to get size
        contents = await file.read()
        file_size = len(contents)
        
        # Validate file
        validate_image(file.filename, file_size)
        
        # Generate unique filename
        file_ext = Path(file.filename).suffix.lower()
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Return URL path (relative to public folder)
        file_url = f"/uploads/{unique_filename}"
        
        # Save metadata to MongoDB
        db = await get_db()
        upload_doc = {
            "filename": file.filename,
            "unique_filename": unique_filename,
            "url": file_url,
            "path": str(file_path),
            "size": file_size,
            "uploadedBy": email,
            "uploadedAt": datetime.now(timezone.utc).isoformat()
        }
        await db.uploads.insert_one(upload_doc)
        
        logger.info(f"File uploaded: {unique_filename} by {email}")
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "success": True,
                "message": "Image téléchargée avec succès",
                "url": file_url,
                "filename": unique_filename
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors du téléchargement du fichier"
        )

@router.post("/images")
async def upload_multiple_images(
    files: List[UploadFile] = File(...),
    email: str = Depends(verify_token)
):
    """
    Upload multiple image files (protected endpoint)
    """
    if len(files) > 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum 10 fichiers à la fois"
        )
    
    uploaded_files = []
    errors = []
    
    for file in files:
        try:
            # Read file content
            contents = await file.read()
            file_size = len(contents)
            
            # Validate file
            validate_image(file.filename, file_size)
            
            # Generate unique filename
            file_ext = Path(file.filename).suffix.lower()
            unique_filename = f"{uuid.uuid4()}{file_ext}"
            file_path = UPLOAD_DIR / unique_filename
            
            # Save file
            with open(file_path, "wb") as f:
                f.write(contents)
            
            file_url = f"/uploads/{unique_filename}"
            uploaded_files.append({
                "original_name": file.filename,
                "filename": unique_filename,
                "url": file_url
            })
            
        except Exception as e:
            errors.append({
                "filename": file.filename,
                "error": str(e)
            })
    
    logger.info(f"{len(uploaded_files)} files uploaded by {email}")
    
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "success": True,
            "message": f"{len(uploaded_files)} fichier(s) téléchargé(s)",
            "uploaded": uploaded_files,
            "errors": errors
        }
    )

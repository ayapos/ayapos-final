from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/products", tags=["Products"])

class ProductSpec(BaseModel):
    name: str
    value: str

class Product(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    description: str
    price: Optional[float] = None
    currency: str = "CHF"
    image: Optional[str] = None
    images: Optional[List[str]] = []
    specifications: Optional[List[ProductSpec]] = []
    features: Optional[List[str]] = []
    inStock: bool = True
    featured: bool = False
    order: int = 0

@router.get("/")
async def get_all_products():
    try:
        products = await db.products.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "products": products}
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/")
async def create_product(product: Product, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        prod_dict = product.dict()
        prod_dict["id"] = str(uuid4())
        prod_dict["createdAt"] = datetime.utcnow()
        await db.products.insert_one(prod_dict)
        return {"success": True, "message": "Produit créé", "id": prod_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating product: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/{product_id}")
async def update_product(product_id: str, product: Product, email: str = Depends(verify_token)):
    try:
        prod_dict = product.dict(exclude={"id"})
        prod_dict["updatedAt"] = datetime.utcnow()
        result = await db.products.update_one({"id": product_id}, {"$set": prod_dict})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Produit non trouvé")
        return {"success": True, "message": "Produit mis à jour"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating product: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.delete("/{product_id}")
async def delete_product(product_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.products.delete_one({"id": product_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Produit non trouvé")
        return {"success": True, "message": "Produit supprimé"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting product: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import logging
from database import db
from routes.auth import verify_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/blog", tags=["Blog"])

class BlogPost(BaseModel):
    id: Optional[str] = None
    title: str
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    author: str
    category: str
    tags: Optional[List[str]] = []
    image: Optional[str] = None
    published: bool = False
    publishedAt: Optional[datetime] = None
    featured: bool = False
    order: int = 0

@router.get("/posts")
async def get_all_posts():
    try:
        # Charger depuis la collection 'blog'
        posts = await db.blog.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "posts": posts}
    except Exception as e:
        logger.error(f"Error fetching posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/posts")
async def create_post(post: BlogPost, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        import re
        post_dict = post.dict()
        post_dict["id"] = str(uuid4())
        if not post_dict.get("slug"):
            post_dict["slug"] = re.sub(r'[^a-z0-9]+', '-', post_dict["title"].lower()).strip('-')
        post_dict["createdAt"] = datetime.utcnow()
        if post_dict["published"] and not post_dict.get("publishedAt"):
            post_dict["publishedAt"] = datetime.utcnow()
        await db.blog_posts.insert_one(post_dict)
        return {"success": True, "message": "Article créé", "id": post_dict["id"]}
    except Exception as e:
        logger.error(f"Error creating post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.put("/posts/{post_id}")
async def update_post(post_id: str, post: BlogPost, email: str = Depends(verify_token)):
    try:
        post_dict = post.dict(exclude={"id"})
        post_dict["updatedAt"] = datetime.utcnow()
        result = await db.blog_posts.update_one({"id": post_id}, {"$set": post_dict})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        return {"success": True, "message": "Article mis à jour"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.get("/{slug}")
async def get_post_by_slug(slug: str):
    try:
        post = await db.blog.find_one({"slug": slug}, {"_id": 0})
        if not post:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        return {"success": True, "post": post}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

@router.delete("/posts/{post_id}")
async def delete_post(post_id: str, email: str = Depends(verify_token)):
    try:
        result = await db.blog_posts.delete_one({"id": post_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Article non trouvé")
        return {"success": True, "message": "Article supprimé"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting post: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur")

class BlogCategory(BaseModel):
    id: Optional[str] = None
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    order: int = 0

@router.get("/categories")
async def get_categories():
    try:
        cats = await db.blog_categories.find({}, {"_id": 0}).to_list(1000)
        return {"success": True, "categories": cats}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

@router.post("/categories")
async def create_category(category: BlogCategory, email: str = Depends(verify_token)):
    try:
        from uuid import uuid4
        import re
        cat_dict = category.dict()
        cat_dict["id"] = str(uuid4())
        if not cat_dict.get("slug"):
            cat_dict["slug"] = re.sub(r'[^a-z0-9]+', '-', cat_dict["name"].lower()).strip('-')
        await db.blog_categories.insert_one(cat_dict)
        return {"success": True, "message": "Catégorie créée", "id": cat_dict["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur")

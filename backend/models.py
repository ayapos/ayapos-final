from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class BusinessType(str, Enum):
    RESTAURANT = "restaurant"
    CAFE = "cafe"
    FAST_FOOD = "fast-food"
    BAKERY = "bakery"
    HOTEL = "hotel"
    MARKET = "market"
    RETAIL = "retail"
    OTHER = "other"

class ContactStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CONVERTED = "converted"
    ARCHIVED = "archived"

class ContactCreate(BaseModel):
    businessName: str = Field(..., min_length=2, max_length=200)
    businessType: BusinessType
    phone: str = Field(..., min_length=5, max_length=20)
    email: EmailStr
    city: str = Field(..., min_length=2, max_length=100)
    message: Optional[str] = Field(None, max_length=1000)
    language: str = Field(default="fr", pattern="^(fr|en|de)$")

class ContactResponse(BaseModel):
    id: str
    businessName: str
    businessType: str
    phone: str
    email: str
    city: str
    message: Optional[str]
    language: str
    status: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class ContactUpdate(BaseModel):
    status: Optional[ContactStatus] = None
    notes: Optional[str] = None

class SuccessResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

#!/usr/bin/env python3
"""
Script pour ajouter les champs d'images manquants dans les pages
"""
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# 1. Gestion Livraison - 3 images
delivery_images = {
    "section_images": {
        "mobile_app": "https://images.unsplash.com/photo-1598769398698-bab7f1b4cadd?w=1200&h=600&fit=crop",
        "tracking": "https://images.unsplash.com/photo-1728044849321?w=800&h=600&fit=crop",
        "payment": "https://images.unsplash.com/photo-1593929976216-f746e488aa45?w=800&h=600&fit=crop"
    }
}

# 2. Rapports Mobile - 4 images
mobile_reports_images = {
    "section_images": {
        "hero_side": "https://images.unsplash.com/photo-1759752394755-1241472b589d?w=800&h=600&fit=crop",
        "dashboard": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        "analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "reporting": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
    }
}

# 3. Gestion Stock - 5 images
stock_management_images = {
    "section_images": {
        "hero_side": "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=800&h=600&fit=crop",
        "inventory": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
        "analytics": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
        "management": "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop",
        "dashboard": "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=600&h=400&fit=crop"
    }
}

print("🔄 Mise à jour des pages avec les images...")

# Update Gestion Livraison
result = db.content.update_one(
    {"slug": "delivery-management"},
    {"$set": delivery_images}
)
print(f"✅ Gestion Livraison: {result.modified_count} documents mis à jour")

# Update Rapports Mobile
result = db.content.update_one(
    {"slug": "mobile-reports"},
    {"$set": mobile_reports_images}
)
print(f"✅ Rapports Mobile: {result.modified_count} documents mis à jour")

# Update Gestion Stock
result = db.content.update_one(
    {"slug": "stock-management"},
    {"$set": stock_management_images}
)
print(f"✅ Gestion Stock: {result.modified_count} documents mis à jour")

print("\n🎉 Toutes les images ont été ajoutées avec succès!")
print("\nVérification...")

# Vérifier
for slug in ["delivery-management", "mobile-reports", "stock-management"]:
    doc = db.content.find_one({"slug": slug}, {"_id": 0, "section_images": 1})
    if doc and "section_images" in doc:
        print(f"\n✅ {slug}: {len(doc['section_images'])} images")
        for key in doc['section_images'].keys():
            print(f"   - {key}")

#!/usr/bin/env python3
"""
Ajouter des images pour tous les terminaux
"""
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# Images pour chaque terminal
terminal_images = {
    "terminal-a77": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    "terminal-a920": "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&h=400&fit=crop",
    "terminal-q80": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop",
    "tap-to-pay": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
    "pos-tablet": "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop",
    "pos-web": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    "pos-mobile": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop"
}

print("🔄 Ajout des images pour les terminaux...")

for terminal_id, image_url in terminal_images.items():
    result = db.products.update_one(
        {"id": terminal_id},
        {"$set": {"image": image_url}}
    )
    
    if result.matched_count > 0:
        print(f"✅ {terminal_id}: Image ajoutée")
    else:
        print(f"⚠️ {terminal_id}: Non trouvé")

print("\n🎉 Images ajoutées!")

# Vérification
print("\nVérification:")
terminals = list(db.products.find(
    {"category": {"$in": ["Payment", "POS"]}},
    {"_id": 0, "id": 1, "name": 1, "image": 1}
))

for t in terminals:
    has_image = "✅" if t.get('image') else "❌"
    img_preview = t.get('image', 'Pas d image')[:50]
    print(f"{has_image} {t['name']}: {img_preview}...")

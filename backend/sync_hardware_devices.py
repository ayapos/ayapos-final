import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_hardware():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    hardware_content = {
        "slug": "hardware-devices",
        "page_title": "Matériel et Périphériques - AyaPos",
        "meta_description": "Catalogue complet de matériel POS, kiosks, imprimantes et accessoires",
        "hero": {
            "title": "Matériel et Périphériques",
            "subtitle": "Solutions matérielles professionnelles",
            "description": "Tout le matériel dont vous avez besoin pour votre restaurant",
            "image": "https://images.unsplash.com/photo-1739989934256-99e15bee9906?w=800&q=80"
        },
        "categories": [
            {"id": "all", "name": "Tous"},
            {"id": "pos", "name": "Systèmes POS"},
            {"id": "kiosk", "name": "Bornes"},
            {"id": "printers", "name": "Imprimantes"},
            {"id": "accessories", "name": "Accessoires"}
        ],
        "devices": [
            {"category": "pos", "name": "Sunmi D3 Pro Android POS", "screen": "15.6\"", "image": "https://images.unsplash.com/photo-1739989934256-99e15bee9906?w=400&h=300&fit=crop"},
            {"category": "pos", "name": "Sunmi D3 Mini Android POS", "screen": "10.1\"", "image": "https://images.unsplash.com/photo-1726607288637-a646ddd3814a?w=400&h=300&fit=crop"},
            {"category": "kiosk", "name": "Wintec AnyPOS 300 Kiosk", "screen": "15.6\"", "image": "https://images.unsplash.com/photo-1556742208-999815fca738?w=400&h=300&fit=crop"},
            {"category": "printers", "name": "Imprimante Thermique", "screen": "", "image": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop"}
        ],
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION HARDWARE DEVICES")
    print("=" * 70)
    
    result = await db.content.update_one({"slug": "hardware-devices"}, {"$set": hardware_content}, upsert=True)
    
    if result.upserted_id:
        print("\n✅ CRÉÉ: Page Hardware Devices")
    else:
        print("\n✅ MIS À JOUR: Page Hardware Devices")
    
    print(f"   🖼️  {len(hardware_content['devices'])} appareils configurés")
    print("\n" + "=" * 70)
    print("🎉 Synchronisation terminée")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_hardware())

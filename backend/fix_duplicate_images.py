"""
Script pour remplacer les images en doublon par des images appropriées
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

# Mapping des remplacements d'images
IMAGE_REPLACEMENTS = {
    # Self-Order Kiosk - Image d'écran tactile de commande
    'photo-1556742049-0cfed4f6a45d': {
        'contexts': ['self-order', 'kiosk'],
        'new_image': 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?w=800&q=80'
    },
    # Payment Terminal - Terminal de paiement moderne
    'photo-1556742502-ec7c0e9f34b1': {
        'contexts': ['ayapay', 'payment', 'terminal'],
        'new_image': 'https://images.unsplash.com/photo-1608286022625-bc07f7a21154?w=800&q=80'
    },
    # QR Menu - QR code sur table
    'photo-1512941937669-90a1b58e7e9c': {
        'contexts': ['qr', 'menu'],
        'new_image': 'https://images.unsplash.com/photo-1625038624658-01a222d8fb8e?w=800&q=80'
    },
}

# Images spécifiques pour Mobile App
MOBILE_APP_IMAGE = 'https://images.unsplash.com/photo-1661246625079-b6a5c6802c46?w=800&q=80'

async def replace_images():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    print("=" * 70)
    print("🔄 REMPLACEMENT DES IMAGES EN DOUBLON")
    print("=" * 70)
    
    # Récupérer tous les documents
    documents = await db.content.find({}).to_list(None)
    
    updated_count = 0
    
    for doc in documents:
        slug = doc.get('slug', 'unknown')
        modified = False
        print(f"\n🔍 Vérification: {slug}")
        
        # Fonction pour remplacer les images récursivement
        def replace_images_recursive(obj, parent_key=''):
            nonlocal modified
            
            if isinstance(obj, dict):
                # Vérifier si c'est un objet avec un champ 'image' ou 'id'
                if 'image' in obj and isinstance(obj['image'], str):
                    old_image = obj['image']
                    
                    # Cas spécial pour Mobile App
                    if 'id' in obj and obj['id'] == 'mobile-app':
                        if 'photo-1512941937669' in old_image or 'photo-1661246625079' not in old_image:
                            obj['image'] = MOBILE_APP_IMAGE
                            modified = True
                            print(f"  ✅ Mobile App: {old_image[:50]} → Image smartphone app")
                    
                    # Cas spécial pour QR Menu
                    elif 'id' in obj and obj['id'] == 'qr-menu':
                        if 'photo-1512941937669' in old_image or 'photo-1625038624658' not in old_image:
                            obj['image'] = IMAGE_REPLACEMENTS['photo-1512941937669-90a1b58e7e9c']['new_image']
                            modified = True
                            print(f"  ✅ QR Menu: {old_image[:50]} → Image QR code")
                    
                    # Remplacement général basé sur le slug
                    else:
                        for old_photo_id, replacement in IMAGE_REPLACEMENTS.items():
                            if old_photo_id in old_image:
                                # Vérifier le contexte
                                should_replace = False
                                
                                if 'digital' in slug and 'qr' in obj.get('id', '').lower():
                                    # QR Menu dans digital
                                    obj['image'] = IMAGE_REPLACEMENTS['photo-1512941937669-90a1b58e7e9c']['new_image']
                                    should_replace = True
                                elif any(ctx in slug.lower() or ctx in parent_key.lower() for ctx in replacement['contexts']):
                                    obj['image'] = replacement['new_image']
                                    should_replace = True
                                
                                if should_replace:
                                    modified = True
                                    print(f"  ✅ Remplacé: {old_image[:50]} → {obj['image'][:50]}")
                
                # Parcourir récursivement
                for key, value in obj.items():
                    if isinstance(value, (dict, list)):
                        replace_images_recursive(value, key)
            
            elif isinstance(obj, list):
                for item in obj:
                    replace_images_recursive(item, parent_key)
        
        # Appliquer les remplacements
        replace_images_recursive(doc)
        
        if modified:
            doc_id = doc.pop('_id')
            await db.content.update_one(
                {'_id': doc_id},
                {'$set': doc}
            )
            updated_count += 1
            print(f"  💾 Document {slug} mis à jour")
    
    print(f"\n{'=' * 70}")
    print(f"✅ {updated_count} documents mis à jour")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(replace_images())

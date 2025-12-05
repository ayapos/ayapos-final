"""
Script pour changer toutes les devises de EUR (€) en CHF dans MongoDB
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def update_currency():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    print("=" * 70)
    print("🔄 CHANGEMENT DE DEVISE : € → CHF")
    print("=" * 70)
    
    # Récupérer tous les documents de la collection content
    documents = await db.content.find({}).to_list(None)
    
    updated_count = 0
    
    for doc in documents:
        slug = doc.get('slug', 'unknown')
        modified = False
        
        # Fonction pour remplacer € par CHF dans un objet récursivement
        def replace_currency(obj):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    if isinstance(value, str):
                        if '€' in value:
                            obj[key] = value.replace('€', 'CHF')
                            return True
                        elif 'EUR' in value:
                            obj[key] = value.replace('EUR', 'CHF')
                            return True
                        elif 'euro' in value.lower():
                            obj[key] = value.replace('euro', 'franc suisse').replace('Euro', 'Franc suisse')
                            return True
                    elif isinstance(value, (dict, list)):
                        if replace_currency(value):
                            return True
            elif isinstance(obj, list):
                for item in obj:
                    if replace_currency(item):
                        return True
            return False
        
        # Chercher spécifiquement les champs currency
        def update_currency_field(obj):
            if isinstance(obj, dict):
                if 'currency' in obj and obj['currency'] == '€':
                    obj['currency'] = 'CHF'
                    return True
                for value in obj.values():
                    if isinstance(value, (dict, list)):
                        if update_currency_field(value):
                            return True
            elif isinstance(obj, list):
                for item in obj:
                    if update_currency_field(item):
                        return True
            return False
        
        # Appliquer les remplacements
        if replace_currency(doc) or update_currency_field(doc):
            modified = True
        
        if modified:
            # Retirer _id pour la mise à jour
            doc_id = doc.pop('_id')
            await db.content.update_one(
                {'_id': doc_id},
                {'$set': doc}
            )
            updated_count += 1
            print(f"✅ Mis à jour: {slug}")
    
    print(f"\n✅ {updated_count} documents mis à jour")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(update_currency())

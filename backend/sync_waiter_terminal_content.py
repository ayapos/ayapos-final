"""
Script pour synchroniser le contenu de Terminal Serveur
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_waiter_terminal():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    waiter_terminal_content = {
        "slug": "waiter-terminal",
        "page_title": "Terminal Serveur Mobile - AyaPos",
        "meta_description": "Terminal mobile pour serveurs avec prise de commande rapide et synchronisation temps réel",
        "hero": {
            "title": "Terminal Serveur Mobile",
            "subtitle": "Optimisez le service de vos serveurs",
            "description": "Terminal mobile professionnel pour la prise de commande rapide et efficace",
            "image": "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80",
            "cta_primary": "Demander une démo",
            "cta_secondary": "Voir les tarifs"
        },
        "benefits": [
            {
                "id": "benefit-1",
                "title": "Prise de commande rapide et intuitive",
                "description": "Interface optimisée pour la prise de commande en situation de service. Ajout instantané des plats, modifications faciles, et envoi direct en cuisine.",
                "image": "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80"
            },
            {
                "id": "benefit-2",
                "title": "Synchronisation en temps réel",
                "description": "Toutes les informations sont synchronisées instantanément entre les terminaux serveurs, la caisse et la cuisine. Plus d'erreurs de communication.",
                "image": "https://images.unsplash.com/photo-1629248242732-592ecc9cc00f?w=800&q=80"
            },
            {
                "id": "benefit-3",
                "title": "Gestion des tables et plan de salle",
                "description": "Visualisez l'état de toutes vos tables en temps réel. Transférez les commandes, divisez les additions, fusionnez les tables facilement.",
                "image": "https://images.unsplash.com/photo-1728044849280?w=800&q=80"
            }
        ],
        "features": [
            {
                "icon": "Smartphone",
                "title": "Terminal mobile léger",
                "description": "Tablette ou smartphone pour chaque serveur"
            },
            {
                "icon": "Zap",
                "title": "Prise de commande rapide",
                "description": "Interface intuitive et réactive"
            },
            {
                "icon": "Wifi",
                "title": "Synchronisation temps réel",
                "description": "Communication instantanée avec la cuisine"
            },
            {
                "icon": "Users",
                "title": "Gestion des tables",
                "description": "Plan de salle interactif et dynamique"
            },
            {
                "icon": "CheckCircle",
                "title": "Split d'addition",
                "description": "Division facile pour groupes"
            },
            {
                "icon": "Bell",
                "title": "Notifications",
                "description": "Alertes pour commandes prêtes"
            }
        ],
        "pricing": {
            "monthly": "CHF 39",
            "description": "Par terminal serveur et par mois",
            "features": [
                "Prise de commande illimitée",
                "Synchronisation temps réel",
                "Gestion des tables",
                "Split d'addition",
                "Support technique",
                "Mises à jour incluses"
            ]
        },
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION TERMINAL SERVEUR")
    print("=" * 70)
    
    try:
        result = await db.content.update_one(
            {"slug": "waiter-terminal"},
            {"$set": waiter_terminal_content},
            upsert=True
        )
        
        if result.upserted_id:
            print("\n✅ CRÉÉ: Page Terminal Serveur")
        else:
            print("\n✅ MIS À JOUR: Page Terminal Serveur")
        
        print(f"   🖼️  Images configurées:")
        print(f"      • Hero: {waiter_terminal_content['hero']['image'][:60]}")
        for i, benefit in enumerate(waiter_terminal_content['benefits'], 1):
            print(f"      • Benefit #{i}: {benefit['title'][:40]}")
            print(f"        Image: {benefit['image'][:60]}")
        
        print(f"   ✨ {len(waiter_terminal_content['features'])} fonctionnalités")
        
        # Vérifier
        saved = await db.content.find_one({"slug": "waiter-terminal"}, {"_id": 0})
        if saved and 'benefits' in saved:
            print(f"\n✅ Vérification: {len(saved['benefits'])} benefits avec images dans MongoDB")
        
    except Exception as e:
        print(f"\n❌ ERREUR: {str(e)}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "=" * 70)
    print("🎉 Synchronisation terminée")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_waiter_terminal())

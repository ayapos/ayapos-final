"""
Script pour synchroniser le contenu de la page Order System
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_order_system():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    order_system_content = {
        "slug": "order-system",
        "page_title": "Système de Commande en Ligne",
        "meta_description": "Système de gestion des commandes centralisé avec intégration plateformes de livraison",
        "hero": {
            "title": "Système de Commande Centralisé",
            "subtitle": "Gérez toutes vos commandes sur un seul écran",
            "description": "Centralisez la gestion de toutes vos commandes: sur place, à emporter, livraison, et commandes en ligne",
            "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
            "cta_primary": "Demander une démo",
            "cta_secondary": "Voir les tarifs"
        },
        "benefits": [
            {
                "id": "benefit-1",
                "title": "Gérez toutes vos commandes sur un seul écran",
                "description": "Centralisez la gestion de toutes vos commandes: sur place, à emporter, livraison, et commandes en ligne depuis les plateformes de livraison.",
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
            },
            {
                "id": "benefit-2",
                "title": "Intégrations avec les plateformes de livraison",
                "description": "Connectez-vous automatiquement avec Uber Eats, Deliveroo, Just Eat et autres plateformes. Toutes vos commandes apparaissent sur le même écran.",
                "image": "https://images.unsplash.com/photo-1609951734391?w=800&q=80"
            },
            {
                "id": "benefit-3",
                "title": "Optimisez la préparation et réduisez les erreurs",
                "description": "Système de tickets cuisine (KDS) pour une préparation optimale. Notifications automatiques et suivi en temps réel de chaque commande.",
                "image": "https://images.unsplash.com/photo-1728044849280?w=800&q=80"
            }
        ],
        "features": [
            {
                "icon": "Package",
                "title": "Gestion centralisée",
                "description": "Toutes vos commandes au même endroit"
            },
            {
                "icon": "Zap",
                "title": "Traitement rapide",
                "description": "Optimisez le temps de préparation"
            },
            {
                "icon": "Clock",
                "title": "Suivi en temps réel",
                "description": "État de chaque commande visible"
            },
            {
                "icon": "BarChart3",
                "title": "Rapports détaillés",
                "description": "Analytics et statistiques complètes"
            },
            {
                "icon": "Smartphone",
                "title": "Commandes en ligne",
                "description": "Intégration plateformes de livraison"
            },
            {
                "icon": "Wifi",
                "title": "Synchronisation cloud",
                "description": "Accès depuis n'importe où"
            }
        ],
        "stats": [
            {
                "number": "500+",
                "label": "Restaurants"
            },
            {
                "number": "99%",
                "label": "Satisfaction"
            },
            {
                "number": "24/7",
                "label": "Support"
            }
        ],
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION SYSTÈME DE COMMANDE")
    print("=" * 70)
    
    try:
        result = await db.content.update_one(
            {"slug": "order-system"},
            {"$set": order_system_content},
            upsert=True
        )
        
        if result.upserted_id:
            print("\n✅ CRÉÉ: Page Order System")
        else:
            print("\n✅ MIS À JOUR: Page Order System")
        
        print(f"   🖼️  Images configurées:")
        print(f"      • Hero: {order_system_content['hero']['image'][:60]}")
        for i, benefit in enumerate(order_system_content['benefits'], 1):
            print(f"      • Benefit #{i}: {benefit['title'][:40]}")
            print(f"        Image: {benefit['image'][:60]}")
        
        print(f"   ✨ {len(order_system_content['features'])} fonctionnalités")
        
        # Vérifier
        saved = await db.content.find_one({"slug": "order-system"}, {"_id": 0})
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
    asyncio.run(sync_order_system())

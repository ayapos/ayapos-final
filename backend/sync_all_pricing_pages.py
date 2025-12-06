import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_all_pricing():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    pricing_pages = [
        {
            "slug": "pricing",
            "page_title": "Tarifs - AyaPos",
            "hero": {
                "title": "Tarifs Transparents",
                "subtitle": "Choisissez le plan qui correspond à vos besoins",
                "description": "Pas de frais cachés, pas d'engagement long terme"
            },
            "plans": [
                {
                    "name": "Starter",
                    "price": "99",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour les petits restaurants",
                    "features": ["POS de base", "1 terminal", "Support email", "Rapports mensuels"],
                    "highlight": False
                },
                {
                    "name": "Business",
                    "price": "249",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour les restaurants en croissance",
                    "features": ["POS complet", "3 terminaux", "Support prioritaire", "Rapports temps réel", "Intégrations"],
                    "highlight": True,
                    "badge": "Recommandé"
                },
                {
                    "name": "Enterprise",
                    "price": "Sur mesure",
                    "currency": "",
                    "period": "",
                    "description": "Pour les grandes chaînes",
                    "features": ["POS illimité", "Terminaux illimités", "Support dédié 24/7", "Personnalisation", "Formation"],
                    "highlight": False
                }
            ]
        },
        {
            "slug": "kiosk-pricing",
            "page_title": "Tarifs Borne de Commande - AyaPos",
            "hero": {
                "title": "Tarifs Self-Order Kiosk",
                "subtitle": "Investissement rentable dès le premier mois",
                "description": "Augmentez vos ventes de 25% avec nos bornes"
            },
            "plans": [
                {
                    "name": "Location",
                    "price": "149",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Location avec maintenance",
                    "features": ["Borne 21.5\"", "Installation incluse", "Maintenance", "Support 24/7", "Mises à jour"],
                    "highlight": True
                },
                {
                    "name": "Achat",
                    "price": "3990",
                    "currency": "CHF ",
                    "period": "une fois",
                    "description": "Achat avec garantie 2 ans",
                    "features": ["Borne 21.5\"", "Installation incluse", "Garantie 2 ans", "Support", "Mises à jour 1 an"],
                    "highlight": False
                }
            ]
        },
        {
            "slug": "order-system-pricing",
            "page_title": "Tarifs Système de Commande - AyaPos",
            "hero": {
                "title": "Tarifs Système de Commande",
                "subtitle": "Gérez toutes vos commandes efficacement",
                "description": "Solution complète pour restaurant moderne"
            },
            "plans": [
                {
                    "name": "Essentiel",
                    "price": "79",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour débuter",
                    "features": ["Gestion commandes", "KDS basique", "1 écran cuisine", "Support email"],
                    "highlight": False
                },
                {
                    "name": "Pro",
                    "price": "159",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour restaurants actifs",
                    "features": ["Gestion avancée", "KDS complet", "3 écrans", "Intégrations livraison", "Support prioritaire"],
                    "highlight": True
                }
            ]
        },
        {
            "slug": "waiter-terminal-pricing",
            "page_title": "Tarifs Terminal Serveur - AyaPos",
            "hero": {
                "title": "Tarifs Terminal Serveur",
                "subtitle": "Équipez vos serveurs d'outils modernes",
                "description": "Tablette professionnelle pour chaque serveur"
            },
            "plans": [
                {
                    "name": "Par Terminal",
                    "price": "39",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Location tablette incluse",
                    "features": ["Tablette Android", "Application complète", "Synchronisation", "Support", "Maintenance"],
                    "highlight": True
                }
            ]
        },
        {
            "slug": "delivery-service-pricing",
            "page_title": "Tarifs Gestion Livraison - AyaPos",
            "hero": {
                "title": "Tarifs Gestion Livraison",
                "subtitle": "Optimisez vos livraisons",
                "description": "Intégration avec toutes les plateformes"
            },
            "plans": [
                {
                    "name": "Starter",
                    "price": "59",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour petits volumes",
                    "features": ["1 plateforme", "Jusqu'à 100 commandes/mois", "Support email"],
                    "highlight": False
                },
                {
                    "name": "Business",
                    "price": "129",
                    "currency": "CHF ",
                    "period": "mois",
                    "description": "Pour volumes moyens",
                    "features": ["3 plateformes", "Commandes illimitées", "Optimisation routes", "Support prioritaire"],
                    "highlight": True
                }
            ]
        }
    ]
    
    print("="*70)
    print("🚀 SYNCHRONISATION DE TOUTES LES PAGES PRICING")
    print("="*70)
    
    for page in pricing_pages:
        page["updatedAt"] = datetime.now(timezone.utc).isoformat()
        result = await db.content.update_one(
            {"slug": page["slug"]},
            {"$set": page},
            upsert=True
        )
        
        status = "CRÉÉ" if result.upserted_id else "MIS À JOUR"
        print(f"\n✅ {status}: {page['slug']}")
        print(f"   💰 {len(page['plans'])} plan(s) tarifaire(s)")
    
    print("\n" + "="*70)
    print("🎉 Toutes les pages pricing synchronisées !")
    print("="*70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_all_pricing())

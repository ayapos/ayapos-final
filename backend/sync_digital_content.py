"""
Script pour synchroniser le contenu complet de la page Solutions Digitales
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_digital_content():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    # Contenu complet de la page Solutions Digitales
    digital_content = {
        "slug": "digital",
        "page_title": "Solutions Digitales - AyaPos",
        "meta_description": "Solutions digitales innovantes pour restaurants : Self-Order Kiosk, Digital Menuboard, QR Menu et Mobile App",
        "hero": {
            "title": "Solutions Digitales",
            "subtitle": "Solutions Digitales Innovantes",
            "description": "Transformez l'expérience de vos clients avec nos solutions digitales de pointe",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
            "cta_primary": "Demander une démo",
            "cta_secondary": "Voir les tarifs"
        },
        "solutions": [
            {
                "id": "self-order-kiosk",
                "icon": "ShoppingBag",
                "title": "Self-Order Kiosk",
                "tagline": "Commande autonome et rapide",
                "description": "Permettez à vos clients de commander et de payer sans attendre. Réduisez les files d'attente et augmentez vos ventes.",
                "image": "https://images.unsplash.com/photo-1556742400-b5a5f5d92bb4?w=800&q=80",
                "features": [
                    "Interface tactile intuitive",
                    "Paiement intégré",
                    "Personnalisation complète",
                    "Multilingue",
                    "Upselling automatisé",
                    "Intégration POS"
                ],
                "benefits": [
                    "Réduction du temps d'attente de 60%",
                    "Augmentation du panier moyen de 25%",
                    "Réduction des erreurs de commande"
                ]
            },
            {
                "id": "digital-menuboard",
                "icon": "Monitor",
                "title": "Digital Menuboard",
                "tagline": "Affichage dynamique et moderne",
                "description": "Présentez vos menus, promotions et vidéos sur des écrans digitaux. Changez votre contenu en temps réel depuis n'importe où.",
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
                "features": [
                    "Écrans HD haute qualité",
                    "Gestion cloud",
                    "Templates pré-conçus",
                    "Planification de contenu",
                    "Animations et vidéos",
                    "Synchronisation multi-écrans"
                ],
                "benefits": [
                    "Augmentation des ventes de 30%",
                    "Mise à jour instantanée",
                    "Réduction des coûts d'impression"
                ]
            },
            {
                "id": "qr-menu",
                "icon": "QrCode",
                "title": "QR Menu Digital",
                "tagline": "Menu sans contact moderne",
                "description": "Un menu digital accessible via QR code. Vos clients scannent et consultent votre menu sur leur smartphone.",
                "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
                "features": [
                    "Scan QR code simple",
                    "Design responsive",
                    "Photos HD des plats",
                    "Filtres allergènes",
                    "Mise à jour instantanée",
                    "Multilingue"
                ],
                "benefits": [
                    "Solution sans contact",
                    "Coût réduit",
                    "Écologique et moderne"
                ]
            },
            {
                "id": "mobile-app",
                "icon": "Smartphone",
                "title": "Mobile App",
                "tagline": "Application mobile sur mesure",
                "description": "Votre propre application de commande et fidélisation. Engagez vos clients et augmentez vos ventes.",
                "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
                "features": [
                    "Commande en ligne",
                    "Programme de fidélité",
                    "Notifications push",
                    "Paiement intégré",
                    "Suivi de commande",
                    "Personnalisation"
                ],
                "benefits": [
                    "Augmentation de la fidélité",
                    "Canal de vente supplémentaire",
                    "Données clients précieuses"
                ]
            }
        ],
        "cta": {
            "title": "Prêt à digitaliser votre restaurant ?",
            "subtitle": "Rejoignez des centaines de restaurants qui ont fait le choix du digital",
            "button_text": "Demander une démo gratuite",
            "button_secondary": "Voir les tarifs"
        },
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION DU CONTENU SOLUTIONS DIGITALES")
    print("=" * 70)
    
    try:
        result = await db.content.update_one(
            {"slug": "digital"},
            {"$set": digital_content},
            upsert=True
        )
        
        if result.upserted_id:
            print("\n✅ CRÉÉ: Page Solutions Digitales")
        else:
            print("\n✅ MIS À JOUR: Page Solutions Digitales")
        
        print(f"   📊 {len(digital_content['solutions'])} solutions configurées:")
        for solution in digital_content['solutions']:
            print(f"      • {solution['title']} - {solution['tagline']}")
            print(f"        → {len(solution['features'])} fonctionnalités")
            print(f"        → {len(solution['benefits'])} bénéfices")
            print(f"        → Image: {solution['image'][:50]}...")
        
        # Vérifier que les données sont bien enregistrées
        saved_content = await db.content.find_one({"slug": "digital"}, {"_id": 0})
        if saved_content and 'solutions' in saved_content:
            print(f"\n✅ Vérification: {len(saved_content['solutions'])} solutions dans la base de données")
            print(f"   Images présentes:")
            for sol in saved_content['solutions']:
                print(f"   ✓ {sol['title']}: {sol.get('image', 'PAS D IMAGE')[:60]}")
        
    except Exception as e:
        print(f"\n❌ ERREUR lors de la synchronisation")
        print(f"   ⚠️  {str(e)}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "=" * 70)
    print("🎉 Synchronisation terminée")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_digital_content())

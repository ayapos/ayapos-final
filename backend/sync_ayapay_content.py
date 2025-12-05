"""
Script pour synchroniser le contenu complet de la page AyaPay avec les terminaux réels
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_ayapay_content():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    # Contenu complet de la page AyaPay avec les vrais terminaux
    ayapay_content = {
        "slug": "ayapay",
        "page_title": "AyaPay - Solutions de Paiement Professionnelles",
        "meta_description": "Terminaux de paiement nouvelle génération : SmartPOS A77, A920, Desk POS Q80 et Tap to Pay. Acceptez tous les moyens de paiement.",
        "hero": {
            "title": "AyaPay - Solutions de paiement professionnelles",
            "subtitle": "Des terminaux de paiement nouvelle génération pour votre entreprise",
            "description": "Acceptez tous les moyens de paiement avec nos terminaux certifiés : Visa, Mastercard, American Express, paiements sans contact NFC, Apple Pay et Google Pay.",
            "image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
            "cta_primary": "Demander un devis",
            "cta_secondary": "Voir les tarifs"
        },
        "features": [
            {
                "icon": "CreditCard",
                "title": "Acceptation universelle",
                "description": "Visa, Mastercard, American Express, Maestro et plus"
            },
            {
                "icon": "Zap",
                "title": "Paiements instantanés",
                "description": "Transactions ultra-rapides en moins de 2 secondes"
            },
            {
                "icon": "Wifi",
                "title": "Connexion flexible",
                "description": "WiFi, 4G, Ethernet - restez toujours connecté"
            },
            {
                "icon": "Shield",
                "title": "Sécurité maximale",
                "description": "Certifié PCI-DSS avec chiffrement de bout en bout"
            },
            {
                "icon": "Smartphone",
                "title": "Reçus digitaux",
                "description": "Envoi automatique par email ou SMS"
            },
            {
                "icon": "Check",
                "title": "Intégration complète",
                "description": "Compatible avec tous nos systèmes POS"
            }
        ],
        "terminals": [
            {
                "id": "a77",
                "name": "SmartPOS A77",
                "tagline": "Compact et léger",
                "description": "Terminal portable avec écran tactile 5\" et connexion 4G. Parfait pour les paiements mobiles.",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
                "features": [
                    "Écran tactile 5\"",
                    "Connexion 4G/WiFi",
                    "Batterie longue durée",
                    "NFC sans contact",
                    "Scanner QR code",
                    "Imprimante thermique"
                ]
            },
            {
                "id": "a920",
                "name": "SmartPOS A920",
                "tagline": "Smart et rapide",
                "description": "Terminal intelligent avec grand écran 5.5\" et imprimante intégrée. Idéal pour les restaurants.",
                "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
                "features": [
                    "Grand écran tactile 5.5\"",
                    "Processeur puissant",
                    "Imprimante intégrée",
                    "Caméra arrière",
                    "4G/WiFi/Bluetooth",
                    "Android OS"
                ]
            },
            {
                "id": "q80",
                "name": "Desk POS Q80",
                "tagline": "Fixe et pratique",
                "description": "Terminal de comptoir avec support stable. Solution professionnelle pour points de vente fixes.",
                "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&q=80",
                "features": [
                    "Écran tactile 8\"",
                    "Support stable",
                    "Connexion Ethernet",
                    "Imprimante haute vitesse",
                    "Scanner code-barres",
                    "Design professionnel"
                ]
            },
            {
                "id": "softpos",
                "name": "Tap to Pay on iPhone",
                "tagline": "Paiement sans terminal",
                "description": "Transformez votre iPhone en terminal de paiement. Aucun matériel supplémentaire nécessaire.",
                "image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&q=80",
                "features": [
                    "Sans matériel supplémentaire",
                    "Application MyPayments",
                    "Paiements sans contact",
                    "Sécurité maximale",
                    "Configuration rapide",
                    "Compatible iPhone XS+"
                ]
            }
        ],
        "pricing_plans": [
            {
                "name": "Starter",
                "price": "29",
                "currency": "CHF ",
                "period": "mois",
                "description": "Pour les petites entreprises",
                "features": [
                    "Terminal SmartPOS A77",
                    "Frais de transaction 1.5%",
                    "Support email",
                    "Reçus digitaux",
                    "Rapports mensuels"
                ],
                "highlight": False
            },
            {
                "name": "Business",
                "price": "79",
                "currency": "€",
                "period": "mois",
                "description": "Pour les entreprises en croissance",
                "features": [
                    "Terminal SmartPOS A920",
                    "Frais de transaction 1.2%",
                    "Support prioritaire",
                    "Reçus digitaux et imprimés",
                    "Rapports en temps réel",
                    "Intégration POS complète"
                ],
                "highlight": True,
                "badge": "Recommandé"
            },
            {
                "name": "Enterprise",
                "price": "Sur mesure",
                "currency": "",
                "period": "",
                "description": "Pour les grandes entreprises",
                "features": [
                    "Tous les terminaux",
                    "Frais négociables",
                    "Support dédié 24/7",
                    "Fonctionnalités avancées",
                    "Intégration personnalisée",
                    "Formation sur site"
                ],
                "highlight": False
            }
        ],
        "faq": [
            {
                "question": "Quels sont les frais de transaction ?",
                "answer": "Les frais varient selon votre plan : Starter (1.5%), Business (1.2%), Enterprise (négociables). Aucun frais caché."
            },
            {
                "question": "Quel terminal choisir pour mon activité ?",
                "answer": "SmartPOS A77 pour la mobilité, A920 pour les restaurants, Desk POS Q80 pour les points de vente fixes, et Tap to Pay pour une solution 100% mobile sans matériel."
            },
            {
                "question": "Y a-t-il un engagement ?",
                "answer": "Non, nos contrats sont sans engagement. Vous pouvez résilier à tout moment sans frais."
            },
            {
                "question": "Le terminal fonctionne-t-il sans internet ?",
                "answer": "Les terminaux peuvent stocker les transactions hors ligne et les synchroniser automatiquement une fois la connexion rétablie."
            }
        ],
        "cta": {
            "title": "Prêt à moderniser vos paiements ?",
            "subtitle": "Rejoignez plus de 5000 commerces qui nous font confiance",
            "button_text": "Demander un devis gratuit",
            "button_secondary": "Voir une démo"
        },
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION DU CONTENU AYAPAY")
    print("=" * 70)
    
    try:
        result = await db.content.update_one(
            {"slug": "ayapay"},
            {"$set": ayapay_content},
            upsert=True
        )
        
        if result.upserted_id:
            print("\n✅ CRÉÉ: Page AyaPay")
        else:
            print("\n✅ MIS À JOUR: Page AyaPay")
        
        print(f"   📊 {len(ayapay_content['terminals'])} terminaux configurés:")
        for terminal in ayapay_content['terminals']:
            print(f"      • {terminal['name']} ({terminal['tagline']})")
        
        print(f"   💰 {len(ayapay_content['pricing_plans'])} plans tarifaires")
        print(f"   ❓ {len(ayapay_content['faq'])} FAQ")
        
        # Vérifier que les données sont bien enregistrées
        saved_content = await db.content.find_one({"slug": "ayapay"}, {"_id": 0})
        if saved_content and 'terminals' in saved_content:
            print(f"\n✅ Vérification: {len(saved_content['terminals'])} terminaux dans la base de données")
        
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
    asyncio.run(sync_ayapay_content())

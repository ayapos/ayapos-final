"""
Synchronisation COMPLÈTE de toutes les pages avec leur contenu intégral
Extrait tout le contenu des pages statiques pour les rendre éditables via l'admin
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_complete_content():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    # Structure COMPLÈTE pour chaque page
    pages_data = {
        "ayapay": {
            "slug": "ayapay",
            "page_title": "AyaPay - Solutions de Paiement Professionnelles",
            "meta_description": "Terminaux de paiement nouvelle génération pour accepter tous les moyens de paiement",
            "hero": {
                "title": "AyaPay - Terminaux de Paiement",
                "subtitle": "Acceptez tous les moyens de paiement avec nos terminaux nouvelle génération",
                "description": "Solutions de paiement complètes pour votre commerce : Visa, Mastercard, American Express, paiements sans contact et plus encore.",
                "image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
                "cta_primary": "Demander un devis",
                "cta_secondary": "En savoir plus"
            },
            "features": [
                {
                    "icon": "CreditCard",
                    "title": "Tous les modes de paiement",
                    "description": "Visa, Mastercard, Amex, Maestro, sans contact NFC, Apple Pay, Google Pay"
                },
                {
                    "icon": "Zap",
                    "title": "Transactions ultra-rapides",
                    "description": "Traitement en moins de 2 secondes pour une expérience client fluide"
                },
                {
                    "icon": "Shield",
                    "title": "Sécurité maximale",
                    "description": "Certifié PCI-DSS niveau 1, chiffrement de bout en bout, protection anti-fraude"
                },
                {
                    "icon": "Wifi",
                    "title": "Connectivité flexible",
                    "description": "WiFi, 4G/5G, Ethernet - connexion stable garantie"
                },
                {
                    "icon": "Smartphone",
                    "title": "Reçus digitaux",
                    "description": "Envoi automatique par email ou SMS, historique complet"
                },
                {
                    "icon": "BarChart3",
                    "title": "Rapports détaillés",
                    "description": "Statistiques en temps réel, analyses de ventes, rapports personnalisés"
                }
            ],
            "terminals": [
                {
                    "name": "Terminal Fixe Pro",
                    "description": "Terminal de comptoir robuste avec écran tactile",
                    "image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&q=80",
                    "features": ["Écran 7 pouces", "Imprimante intégrée", "Lecteur NFC", "4G inclus"]
                },
                {
                    "name": "Terminal Mobile",
                    "description": "Terminal portable pour encaisser partout",
                    "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
                    "features": ["Autonomie 8h", "WiFi + 4G", "Compact", "Recharge rapide"]
                },
                {
                    "name": "Terminal Tout-en-un",
                    "description": "Solution complète avec caisse et terminal intégré",
                    "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&q=80",
                    "features": ["Écran double", "Imprimante thermique", "Scanner code-barres", "Balance intégrée"]
                }
            ],
            "pricing_plans": [
                {
                    "name": "Starter",
                    "price": "29",
                    "currency": "€",
                    "period": "mois",
                    "description": "Pour les petits commerces",
                    "features": [
                        "1 terminal inclus",
                        "Taux: 1.5% par transaction",
                        "Virements sous 48h",
                        "Support email",
                        "Rapports basiques"
                    ],
                    "highlight": False
                },
                {
                    "name": "Business",
                    "price": "79",
                    "currency": "€",
                    "period": "mois",
                    "description": "Pour les commerces en croissance",
                    "features": [
                        "3 terminaux inclus",
                        "Taux: 1.2% par transaction",
                        "Virements sous 24h",
                        "Support prioritaire 24/7",
                        "Rapports avancés",
                        "API d'intégration"
                    ],
                    "highlight": true,
                    "badge": "Recommandé"
                },
                {
                    "name": "Enterprise",
                    "price": "Sur mesure",
                    "currency": "",
                    "period": "",
                    "description": "Pour les grandes entreprises",
                    "features": [
                        "Terminaux illimités",
                        "Taux: à partir de 0.9%",
                        "Virements instantanés",
                        "Gestionnaire de compte dédié",
                        "Rapports personnalisés",
                        "Intégration ERP",
                        "Formation sur site"
                    ],
                    "highlight": False
                }
            ],
            "benefits": [
                {
                    "title": "Installation rapide",
                    "description": "Notre équipe vous installe et configure tout en moins d'une heure",
                    "image": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80"
                },
                {
                    "title": "Formation incluse",
                    "description": "Formation complète de vos équipes sur l'utilisation des terminaux",
                    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                },
                {
                    "title": "Support 24/7",
                    "description": "Équipe de support disponible à tout moment par téléphone, email ou chat",
                    "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                }
            ],
            "faq": [
                {
                    "question": "Quels sont les frais de transaction ?",
                    "answer": "Les frais varient selon votre plan : Starter (1.5%), Business (1.2%), Enterprise (0.9% et moins). Aucun frais caché."
                },
                {
                    "question": "Combien de temps pour recevoir mes fonds ?",
                    "answer": "Selon votre plan : 48h (Starter), 24h (Business), instantané (Enterprise)."
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
            "updatedAt": datetime.utcnow().isoformat()
        }
    }
    
    print("=" * 70)
    print("🚀 SYNCHRONISATION COMPLÈTE DU CONTENU")
    print("=" * 70)
    
    for slug, content in pages_data.items():
        try:
            result = await db.content.update_one(
                {"slug": slug},
                {"$set": content},
                upsert=True
            )
            
            sections_count = len(content.get('features', [])) + len(content.get('terminals', [])) + len(content.get('pricing_plans', []))
            
            if result.upserted_id:
                print(f"\n✅ CRÉÉ: {slug.upper()}")
            else:
                print(f"\n✅ MIS À JOUR: {slug.upper()}")
            
            print(f"   📊 Sections: {sections_count} éléments éditables")
            print(f"   🎯 Hero: {content['hero']['title']}")
            
        except Exception as e:
            print(f"\n❌ ERREUR: {slug.upper()}")
            print(f"   ⚠️  {str(e)}")
    
    print("\n" + "=" * 70)
    print(f"🎉 Synchronisation terminée - {len(pages_data)} page(s) traitée(s)")
    print("=" * 70)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_complete_content())

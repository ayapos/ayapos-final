"""
Script de synchronisation complète pour toutes les pages restantes
Extrait le contenu hardcodé et le synchronise dans MongoDB
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_all_pages():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    # Contenu complet de toutes les pages
    pages_content = {
        "contact": {
            "slug": "contact",
            "page_title": "Contactez-Nous - AyaPos",
            "hero_title": "📞 Contactez-Nous",
            "hero_subtitle": "Notre équipe est là pour répondre à toutes vos questions et vous accompagner dans votre projet",
            "hero_image": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=80",
            "features": [
                {
                    "icon": "Phone",
                    "title": "Support Téléphonique",
                    "description": "Disponible du lundi au vendredi de 9h à 18h"
                },
                {
                    "icon": "Mail",
                    "title": "Email",
                    "description": "Réponse sous 24h ouvrées"
                },
                {
                    "icon": "MapPin",
                    "title": "Nos Bureaux",
                    "description": "Visitez-nous à Istanbul, Turquie"
                },
                {
                    "icon": "Clock",
                    "title": "Horaires",
                    "description": "Lun-Ven: 9h-18h, Sam: 10h-16h"
                }
            ],
            "sections": {
                "contact_info": {
                    "title": "Informations de Contact",
                    "items": [
                        {
                            "icon": "📞",
                            "title": "Téléphone",
                            "description": "+90 212 XXX XX XX"
                        },
                        {
                            "icon": "📧",
                            "title": "Email",
                            "description": "info@ayapos.com"
                        },
                        {
                            "icon": "📍",
                            "title": "Adresse",
                            "description": "Istanbul, Turquie"
                        }
                    ]
                }
            },
            "cta_title": "Prêt à démarrer ?",
            "cta_subtitle": "Demandez votre devis gratuit maintenant",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "about": {
            "slug": "about",
            "page_title": "À Propos de AyaPos - Leader des Solutions POS",
            "hero_title": "👥 À Propos d'AyaPos",
            "hero_subtitle": "Leader des solutions POS pour restaurants et commerces depuis 2015",
            "hero_image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            "features": [
                {
                    "icon": "Target",
                    "title": "Innovation Continue",
                    "description": "Nous investissons constamment dans la R&D pour offrir les meilleures solutions du marché"
                },
                {
                    "icon": "Users",
                    "title": "Service Client Excellence",
                    "description": "Support 24/7 en français et formation complète de vos équipes"
                },
                {
                    "icon": "Shield",
                    "title": "Qualité Garantie",
                    "description": "Matériel professionnel certifié et logiciels testés en conditions réelles"
                },
                {
                    "icon": "Zap",
                    "title": "Efficacité Maximale",
                    "description": "Solutions optimisées pour augmenter votre productivité et vos revenus"
                }
            ],
            "benefits": [
                {
                    "title": "5000+ Clients Satisfaits",
                    "description": "Des milliers d'entreprises nous font confiance à travers le monde",
                    "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                },
                {
                    "title": "15+ Années d'Expérience",
                    "description": "Une expertise reconnue dans le domaine du POS et des paiements",
                    "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
                },
                {
                    "title": "Équipe de 50+ Experts",
                    "description": "Des professionnels passionnés à votre service",
                    "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80"
                }
            ],
            "sections": {
                "stats": {
                    "title": "AyaPos en Chiffres",
                    "items": [
                        {
                            "icon": "📊",
                            "title": "5000+",
                            "description": "Clients actifs"
                        },
                        {
                            "icon": "🎯",
                            "title": "15+",
                            "description": "Années d'expérience"
                        },
                        {
                            "icon": "👥",
                            "title": "50+",
                            "description": "Experts dédiés"
                        },
                        {
                            "icon": "⭐",
                            "title": "99%",
                            "description": "Satisfaction client"
                        }
                    ]
                },
                "values": {
                    "title": "Nos Valeurs",
                    "items": [
                        {
                            "icon": "🎯",
                            "title": "Innovation",
                            "description": "Nous développons des solutions technologiques de pointe"
                        },
                        {
                            "icon": "🤝",
                            "title": "Partenariat",
                            "description": "Votre succès est notre priorité"
                        },
                        {
                            "icon": "🔒",
                            "title": "Sécurité",
                            "description": "Protection maximale de vos données"
                        },
                        {
                            "icon": "⚡",
                            "title": "Performance",
                            "description": "Des solutions rapides et fiables"
                        }
                    ]
                }
            },
            "cta_title": "Rejoignez les leaders du marché",
            "cta_subtitle": "Découvrez pourquoi des milliers d'entreprises nous font confiance",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "pricing": {
            "slug": "pricing",
            "page_title": "Tarifs - Solutions POS AyaPos",
            "hero_title": "💰 Tarifs Transparents",
            "hero_subtitle": "Choisissez le plan qui correspond à vos besoins. Pas de frais cachés, tout est clair.",
            "hero_image": "https://images.unsplash.com/photo-1554224311-beee460c201f?w=1200&q=80",
            "features": [
                {
                    "icon": "Check",
                    "title": "Essai Gratuit 14 Jours",
                    "description": "Testez toutes les fonctionnalités sans engagement"
                },
                {
                    "icon": "Shield",
                    "title": "Garantie Satisfait ou Remboursé",
                    "description": "30 jours pour changer d'avis"
                },
                {
                    "icon": "Users",
                    "title": "Support Inclus",
                    "description": "Assistance technique et formation incluses"
                },
                {
                    "icon": "CreditCard",
                    "title": "Sans Engagement",
                    "description": "Résiliez à tout moment sans frais"
                }
            ],
            "sections": {
                "features_comparison": {
                    "title": "Comparaison des Fonctionnalités",
                    "items": [
                        {
                            "icon": "✅",
                            "title": "Toutes les fonctionnalités essentielles",
                            "description": "Inclus dans tous les plans"
                        },
                        {
                            "icon": "💳",
                            "title": "Terminal de paiement",
                            "description": "Option disponible"
                        },
                        {
                            "icon": "📊",
                            "title": "Rapports avancés",
                            "description": "Plans Pro et Enterprise"
                        },
                        {
                            "icon": "🔗",
                            "title": "Intégrations API",
                            "description": "Plan Enterprise uniquement"
                        }
                    ]
                }
            },
            "benefits": [
                {
                    "title": "Installation Rapide",
                    "description": "Configuration en moins d'une heure avec notre équipe",
                    "image": "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&q=80"
                },
                {
                    "title": "Formation Complète",
                    "description": "Formation de vos équipes incluse dans tous les plans",
                    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                },
                {
                    "title": "Support Dédié",
                    "description": "Une équipe d'experts disponible pour vous aider",
                    "image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800&q=80"
                }
            ],
            "cta_title": "Prêt à commencer ?",
            "cta_subtitle": "Essayez gratuitement pendant 14 jours",
            "updatedAt": datetime.utcnow().isoformat()
        }
    }
    
    print("🔄 Synchronisation complète de toutes les pages...")
    print("=" * 60)
    
    for slug, content in pages_content.items():
        try:
            result = await db.content.update_one(
                {"slug": slug},
                {"$set": content},
                upsert=True
            )
            if result.upserted_id:
                print(f"✅ CRÉÉ: {slug:20} → Nouveau contenu ajouté")
            else:
                print(f"✅ MIS À JOUR: {slug:20} → Contenu restauré")
        except Exception as e:
            print(f"❌ ERREUR: {slug:20} → {str(e)}")
    
    print("=" * 60)
    print("🎉 Synchronisation terminée avec succès!")
    print(f"📊 Total: {len(pages_content)} pages synchronisées")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_all_pages())

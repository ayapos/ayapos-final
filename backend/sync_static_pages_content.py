"""
Script de synchronisation du contenu des pages statiques vers MongoDB
Ce script extrait le contenu hardcodé des anciennes pages et le met dans la DB
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')

async def sync_content():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.test_database
    
    # Pages à synchroniser avec leur contenu
    pages_content = {
        "ayapay": {
            "slug": "ayapay",
            "page_title": "AyaPay - Solutions de Paiement Professionnelles",
            "hero_title": "💳 Solutions de Paiement AyaPay",
            "hero_subtitle": "Acceptez tous les moyens de paiement avec nos terminaux nouvelle génération",
            "hero_image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
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
            "benefits": [
                {
                    "title": "Terminaux Modernes",
                    "description": "Des appareils élégants et performants pour votre commerce",
                    "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                },
                {
                    "title": "Support 24/7",
                    "description": "Une équipe dédiée disponible à tout moment",
                    "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
                },
                {
                    "title": "Tarifs Transparents",
                    "description": "Pas de frais cachés, tout est clair dès le départ",
                    "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80"
                }
            ],
            "cta_title": "Prêt à moderniser vos paiements ?",
            "cta_subtitle": "Contactez-nous pour un devis personnalisé",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "digital": {
            "slug": "digital",
            "page_title": "Solutions Digitales Innovantes",
            "hero_title": "💡 Solutions Digitales Innovantes",
            "hero_subtitle": "Transformez votre entreprise avec nos solutions digitales sur mesure",
            "hero_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
            "features": [
                {
                    "icon": "Smartphone",
                    "title": "Applications Mobiles",
                    "description": "Applications natives iOS et Android performantes"
                },
                {
                    "icon": "Globe",
                    "title": "Sites Web Responsifs",
                    "description": "Sites web modernes et optimisés pour tous les appareils"
                },
                {
                    "icon": "Cloud",
                    "title": "Solutions Cloud",
                    "description": "Infrastructure cloud sécurisée et scalable"
                },
                {
                    "icon": "Shield",
                    "title": "Sécurité Avancée",
                    "description": "Protection maximale de vos données et systèmes"
                }
            ],
            "benefits": [
                {
                    "title": "Innovation Continue",
                    "description": "Technologies de pointe pour rester compétitif",
                    "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                },
                {
                    "title": "Support Technique",
                    "description": "Équipe d'experts disponible 24/7",
                    "image": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
                },
                {
                    "title": "ROI Mesurable",
                    "description": "Résultats concrets et mesurables pour votre entreprise",
                    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                }
            ],
            "cta_title": "Prêt pour la transformation digitale ?",
            "cta_subtitle": "Discutons de votre projet",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "kiosk-pricing": {
            "slug": "kiosk-pricing",
            "page_title": "Tarifs Kiosque de Commande",
            "hero_title": "💰 Tarifs Kiosque de Commande",
            "hero_subtitle": "Des solutions de kiosque adaptées à votre budget",
            "hero_image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1200&q=80",
            "features": [
                {
                    "icon": "DollarSign",
                    "title": "Tarification Simple",
                    "description": "Pas de frais cachés, tout est transparent"
                },
                {
                    "icon": "Package",
                    "title": "Installation Incluse",
                    "description": "Notre équipe s'occupe de tout"
                },
                {
                    "icon": "Users",
                    "title": "Formation Gratuite",
                    "description": "Formation complète de votre personnel"
                },
                {
                    "icon": "Settings",
                    "title": "Maintenance 24/7",
                    "description": "Support technique disponible en permanence"
                }
            ],
            "cta_title": "Besoin d'un devis personnalisé ?",
            "cta_subtitle": "Contactez-nous pour discuter de vos besoins",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "order-system-pricing": {
            "slug": "order-system-pricing",
            "page_title": "Tarifs Système de Commande",
            "hero_title": "💰 Tarifs Système de Commande",
            "hero_subtitle": "Solutions de commande en ligne adaptées à votre activité",
            "hero_image": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80",
            "features": [
                {
                    "icon": "ShoppingCart",
                    "title": "Sans Commission",
                    "description": "Gardez 100% de vos revenus"
                },
                {
                    "icon": "Smartphone",
                    "title": "Application Mobile",
                    "description": "iOS et Android inclus"
                },
                {
                    "icon": "Globe",
                    "title": "Site Web",
                    "description": "Site de commande personnalisé"
                },
                {
                    "icon": "BarChart3",
                    "title": "Rapports Détaillés",
                    "description": "Analyses et statistiques en temps réel"
                }
            ],
            "cta_title": "Prêt à lancer votre système de commande ?",
            "cta_subtitle": "Demandez une démonstration gratuite",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "waiter-terminal-pricing": {
            "slug": "waiter-terminal-pricing",
            "page_title": "Tarifs Terminal Serveur",
            "hero_title": "💰 Tarifs Terminal Serveur",
            "hero_subtitle": "Équipez vos serveurs avec les meilleurs outils",
            "hero_image": "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1200&q=80",
            "features": [
                {
                    "icon": "Smartphone",
                    "title": "Terminal Mobile",
                    "description": "Prise de commande partout dans votre établissement"
                },
                {
                    "icon": "Zap",
                    "title": "Synchronisation Instantanée",
                    "description": "Mise à jour en temps réel avec la cuisine"
                },
                {
                    "icon": "Package",
                    "title": "Matériel Inclus",
                    "description": "Tablettes et accessoires fournis"
                },
                {
                    "icon": "Users",
                    "title": "Formation Incluse",
                    "description": "Formation complète de vos équipes"
                }
            ],
            "cta_title": "Modernisez le service en salle",
            "cta_subtitle": "Contactez-nous pour un devis",
            "updatedAt": datetime.utcnow().isoformat()
        },
        
        "delivery-service-pricing": {
            "slug": "delivery-service-pricing",
            "page_title": "Tarifs Service de Livraison",
            "hero_title": "💰 Tarifs Service de Livraison",
            "hero_subtitle": "Gérez vos livraisons efficacement",
            "hero_image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
            "features": [
                {
                    "icon": "Truck",
                    "title": "Gestion des Livreurs",
                    "description": "Suivez vos équipes en temps réel"
                },
                {
                    "icon": "MapPin",
                    "title": "Optimisation d'Itinéraire",
                    "description": "Livraisons plus rapides et efficaces"
                },
                {
                    "icon": "Smartphone",
                    "title": "Application Livreur",
                    "description": "Interface mobile intuitive"
                },
                {
                    "icon": "BarChart3",
                    "title": "Statistiques Détaillées",
                    "description": "Analyses de performance complètes"
                }
            ],
            "cta_title": "Optimisez vos livraisons",
            "cta_subtitle": "Demandez une démonstration",
            "updatedAt": datetime.utcnow().isoformat()
        }
    }
    
    print("🔄 Début de la synchronisation du contenu...")
    
    for slug, content in pages_content.items():
        try:
            result = await db.content.update_one(
                {"slug": slug},
                {"$set": content},
                upsert=True
            )
            if result.upserted_id:
                print(f"✅ Créé: {slug}")
            else:
                print(f"✅ Mis à jour: {slug}")
        except Exception as e:
            print(f"❌ Erreur pour {slug}: {str(e)}")
    
    print("\n🎉 Synchronisation terminée!")
    client.close()

if __name__ == "__main__":
    asyncio.run(sync_content())

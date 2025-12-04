"""
SCRIPT COMPLET - Synchronisation de TOUTES les pages du site avec la base de données
Ce script extrait le contenu de toutes les pages et le rend éditable dans l'admin
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()
mongo_url = os.getenv('MONGO_URL')

# ============================================
# TOUTES LES PAGES À SYNCHRONISER
# ============================================

ALL_PAGES_CONTENT = {
    # PAGE D'ACCUEIL
    "home": {
        "slug": "home",
        "page_title": "AyaPos - Solutions POS et Paiement Professionnelles",
        "hero_title": "🚀 Transformez Votre Business avec AyaPos",
        "hero_subtitle": "Solutions complètes de point de vente, terminaux de paiement et gestion pour restaurants et commerces",
        "hero_image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
        "features": [],
        "benefits": [],
        "cta_title": "PRÊT À DÉMARRER ?",
        "cta_subtitle": "Contactez-nous pour une démonstration gratuite"
    },
    
    # AYAPAY
    "ayapay": {
        "slug": "ayapay",
        "page_title": "AyaPay - Terminaux de Paiement Professionnels",
        "hero_title": "💳 Solutions de Paiement AyaPay",
        "hero_subtitle": "Acceptez tous les moyens de paiement avec nos terminaux nouvelle génération",
        "hero_image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
        "features": [
            {"icon": "CreditCard", "title": "Acceptation universelle", "description": "Visa, Mastercard, American Express, Maestro et plus"},
            {"icon": "Zap", "title": "Paiements instantanés", "description": "Transactions ultra-rapides en moins de 2 secondes"},
            {"icon": "Wifi", "title": "Connexion flexible", "description": "WiFi, 4G, Ethernet - restez toujours connecté"},
            {"icon": "Shield", "title": "Sécurité maximale", "description": "Certifié PCI-DSS avec chiffrement de bout en bout"},
            {"icon": "Smartphone", "title": "Reçus digitaux", "description": "Envoi automatique par email ou SMS"},
            {"icon": "Check", "title": "Intégration complète", "description": "Compatible avec tous nos systèmes POS"}
        ],
        "benefits": [
            {
                "title": "Terminaux Mobiles",
                "description": "Acceptez les paiements n'importe où avec nos terminaux portables 4G",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
            },
            {
                "title": "Terminaux Fixes",
                "description": "Solutions professionnelles pour points de vente permanents",
                "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&q=80"
            },
            {
                "title": "Tap to Pay",
                "description": "Transformez votre smartphone en terminal de paiement",
                "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80"
            }
        ],
        "cta_title": "PRÊT À ACCEPTER TOUS LES PAIEMENTS ?",
        "cta_subtitle": "Obtenez votre terminal de paiement en 48h"
    },
    
    # POS SYSTEMS
    "pos": {
        "slug": "pos",
        "page_title": "Systèmes POS - Point de Vente Professionnel",
        "hero_title": "💻 Systèmes POS Professionnels",
        "hero_subtitle": "Choisissez le système de caisse qui correspond à vos besoins",
        "hero_image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "features": [
            {"icon": "Monitor", "title": "Interface moderne", "description": "Design intuitif et facile à utiliser"},
            {"icon": "Cloud", "title": "Cloud natif", "description": "Accès depuis n'importe où, synchronisation temps réel"},
            {"icon": "Wifi", "title": "Mode hors ligne", "description": "Continuez à vendre même sans internet"},
            {"icon": "Users", "title": "Multi-utilisateurs", "description": "Gestion illimitée des employés et permissions"}
        ],
        "cta_title": "BESOIN D'AIDE POUR CHOISIR ?",
        "cta_subtitle": "Contactez notre équipe pour une consultation personnalisée"
    },
    
    # WAITER TERMINAL
    "waiter-terminal": {
        "slug": "waiter-terminal",
        "page_title": "Terminal Serveur - Commande Mobile pour Restaurants",
        "hero_title": "📱 Terminal Serveur Mobile",
        "hero_subtitle": "Prenez les commandes directement à table avec notre application mobile professionnelle",
        "hero_image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
        "features": [
            {"icon": "Smartphone", "title": "Application mobile", "description": "Compatible Android et iOS"},
            {"icon": "Zap", "title": "Commande instantanée", "description": "Envoi direct en cuisine"},
            {"icon": "Users", "title": "Gestion des tables", "description": "Visualisation des tables en temps réel"},
            {"icon": "Check", "title": "Modification facile", "description": "Ajout ou retrait d'articles simple"}
        ],
        "benefits": [
            {
                "title": "Service plus rapide",
                "description": "Réduisez le temps de prise de commande de 40%",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
            },
            {
                "title": "Moins d'erreurs",
                "description": "Éliminez les erreurs de transcription",
                "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&q=80"
            },
            {
                "title": "Meilleure expérience",
                "description": "Vos clients apprécient le service personnalisé",
                "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80"
            }
        ],
        "cta_title": "MODERNISEZ VOTRE SERVICE EN SALLE",
        "cta_subtitle": "Essai gratuit 30 jours - Sans engagement"
    },
    
    # ORDER SYSTEM
    "order-system": {
        "slug": "order-system",
        "page_title": "Système de Commande en Ligne",
        "hero_title": "🛒 Système de Commande en Ligne",
        "hero_subtitle": "Gérez toutes vos commandes en ligne depuis une seule plateforme",
        "hero_image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80",
        "features": [
            {"icon": "Globe", "title": "Multi-canaux", "description": "Site web, app mobile, réseaux sociaux"},
            {"icon": "Truck", "title": "Gestion livraison", "description": "Suivi des livreurs en temps réel"},
            {"icon": "Clock", "title": "Planification", "description": "Commandes programmées à l'avance"},
            {"icon": "Bell", "title": "Notifications", "description": "Alertes SMS et email automatiques"}
        ],
        "cta_title": "BOOSTEZ VOS VENTES EN LIGNE",
        "cta_subtitle": "Augmentez votre chiffre d'affaires de 35% en moyenne"
    },
    
    # MOBILE ORDER APP
    "mobile-order-app": {
        "slug": "mobile-order-app",
        "page_title": "Application Mobile de Commande",
        "hero_title": "📱 Application Mobile de Commande",
        "hero_subtitle": "Votre propre app mobile pour commander et fidéliser vos clients",
        "hero_image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        "features": [
            {"icon": "Smartphone", "title": "iOS & Android", "description": "Applications natives haute performance"},
            {"icon": "Gift", "title": "Programme fidélité", "description": "Points, récompenses, offres personnalisées"},
            {"icon": "CreditCard", "title": "Paiement intégré", "description": "Apple Pay, Google Pay, cartes enregistrées"},
            {"icon": "MapPin", "title": "Géolocalisation", "description": "Trouvez le restaurant le plus proche"}
        ],
        "cta_title": "LANCEZ VOTRE APPLICATION MOBILE",
        "cta_subtitle": "Votre app prête en 15 jours"
    },
    
    # ROBOT WAITER
    "robot-waiter": {
        "slug": "robot-waiter",
        "page_title": "Robot Serveur Autonome",
        "hero_title": "🤖 Robot Serveur Autonome",
        "hero_subtitle": "Révolutionnez votre service avec nos robots serveurs intelligents",
        "hero_image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        "features": [
            {"icon": "Cpu", "title": "Navigation autonome", "description": "Évite les obstacles automatiquement"},
            {"icon": "Battery", "title": "Autonomie 12h", "description": "Fonctionne toute la journée"},
            {"icon": "Volume2", "title": "Interaction vocale", "description": "Communique avec les clients"},
            {"icon": "Shield", "title": "Sécurité totale", "description": "Certifié pour usage en salle"}
        ],
        "cta_title": "LE FUTUR DU SERVICE EN SALLE",
        "cta_subtitle": "Demandez une démonstration dans votre restaurant"
    },
    
    # DELIVERY MANAGEMENT
    "delivery-management": {
        "slug": "delivery-management",
        "page_title": "Gestion de Livraison",
        "hero_title": "🚗 Gestion de Livraison Intelligente",
        "hero_subtitle": "Optimisez vos livraisons avec notre système de gestion complet",
        "hero_image": "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
        "features": [
            {"icon": "Map", "title": "Suivi temps réel", "description": "Localisez vos livreurs sur une carte"},
            {"icon": "Route", "title": "Optimisation itinéraires", "description": "Routes les plus rapides calculées automatiquement"},
            {"icon": "Users", "title": "Gestion équipe", "description": "Assignation automatique des commandes"},
            {"icon": "BarChart", "title": "Statistiques", "description": "Analysez les performances de livraison"}
        ],
        "cta_title": "OPTIMISEZ VOS LIVRAISONS",
        "cta_subtitle": "Réduisez vos coûts de 30%"
    },
    
    # WEB PORTAL
    "web-portal": {
        "slug": "web-portal",
        "page_title": "Portail Web de Gestion",
        "hero_title": "🌐 Portail Web de Gestion",
        "hero_subtitle": "Gérez votre business de n'importe où avec notre portail cloud",
        "hero_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "features": [
            {"icon": "BarChart3", "title": "Tableaux de bord", "description": "Visualisez vos KPIs en temps réel"},
            {"icon": "FileText", "title": "Rapports détaillés", "description": "Exportez vos données en PDF/Excel"},
            {"icon": "Users", "title": "Multi-établissements", "description": "Gérez plusieurs points de vente"},
            {"icon": "Lock", "title": "Sécurisé", "description": "Accès crypté avec authentification 2FA"}
        ],
        "cta_title": "PILOTEZ VOTRE BUSINESS EN LIGNE",
        "cta_subtitle": "Accès gratuit avec tous nos systèmes POS"
    },
    
    # MOBILE REPORTS
    "mobile-reports": {
        "slug": "mobile-reports",
        "page_title": "Rapports Mobile",
        "hero_title": "📊 Application Rapports Mobile",
        "hero_subtitle": "Consultez vos statistiques en déplacement sur votre smartphone",
        "hero_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "features": [
            {"icon": "TrendingUp", "title": "Ventes en direct", "description": "Chiffre d'affaires mis à jour en temps réel"},
            {"icon": "PieChart", "title": "Analyses visuelles", "description": "Graphiques et tableaux interactifs"},
            {"icon": "Bell", "title": "Alertes personnalisées", "description": "Notifications pour événements importants"},
            {"icon": "Download", "title": "Export données", "description": "Partagez vos rapports par email"}
        ],
        "cta_title": "VOS CHIFFRES DANS VOTRE POCHE",
        "cta_subtitle": "Téléchargez l'app gratuitement"
    },
    
    # STOCK MANAGEMENT
    "stock-management": {
        "slug": "stock-management",
        "page_title": "Gestion des Stocks",
        "hero_title": "📦 Gestion des Stocks Intelligente",
        "hero_subtitle": "Contrôlez vos stocks et approvisionnements en temps réel",
        "hero_image": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
        "features": [
            {"icon": "Package", "title": "Suivi inventaire", "description": "Stock en temps réel par produit"},
            {"icon": "AlertTriangle", "title": "Alertes rupture", "description": "Notifications automatiques de réapprovisionnement"},
            {"icon": "TrendingDown", "title": "Analyse pertes", "description": "Identifiez le gaspillage et les pertes"},
            {"icon": "FileText", "title": "Bons de commande", "description": "Générez automatiquement vos commandes fournisseurs"}
        ],
        "cta_title": "MAÎTRISEZ VOS STOCKS",
        "cta_subtitle": "Réduisez le gaspillage de 25%"
    },
    
    # CENTRALIZED MANAGEMENT
    "centralized-management": {
        "slug": "centralized-management",
        "page_title": "Gestion Centralisée Multi-Sites",
        "hero_title": "🏢 Gestion Centralisée Multi-Sites",
        "hero_subtitle": "Gérez tous vos établissements depuis une seule interface",
        "hero_image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        "features": [
            {"icon": "Building", "title": "Multi-établissements", "description": "Nombre illimité de points de vente"},
            {"icon": "Users", "title": "Gestion centralisée", "description": "Menus, prix, promotions synchronisés"},
            {"icon": "BarChart", "title": "Consolidation données", "description": "Rapports groupés par zone ou région"},
            {"icon": "Settings", "title": "Contrôle à distance", "description": "Modifiez les paramètres de tous vos sites"}
        ],
        "cta_title": "SIMPLIFIEZ LA GESTION DE VOTRE CHAÎNE",
        "cta_subtitle": "Solution adaptée aux franchises et groupes"
    },
    
    # HARDWARE DEVICES
    "hardware-devices": {
        "slug": "hardware-devices",
        "page_title": "Matériel et Périphériques",
        "hero_title": "🖨️ Matériel et Périphériques",
        "hero_subtitle": "Tout le matériel professionnel compatible avec nos solutions",
        "hero_image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "features": [
            {"icon": "Printer", "title": "Imprimantes tickets", "description": "Thermiques 80mm haute vitesse"},
            {"icon": "Scan", "title": "Lecteurs code-barres", "description": "Sans fil et filaires"},
            {"icon": "Scale", "title": "Balances", "description": "Connectées et certifiées"},
            {"icon": "Monitor", "title": "Écrans tactiles", "description": "De 10 à 27 pouces"}
        ],
        "cta_title": "ÉQUIPEZ-VOUS EN MATÉRIEL PRO",
        "cta_subtitle": "Livraison et installation incluses"
    },
    
    # DIGITAL SOLUTIONS
    "digital": {
        "slug": "digital",
        "page_title": "Solutions Digitales",
        "hero_title": "💡 Solutions Digitales Innovantes",
        "hero_subtitle": "Transformez votre restaurant avec nos outils digitaux",
        "hero_image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        "features": [
            {"icon": "Smartphone", "title": "Menu digital", "description": "QR code et tablettes"},
            {"icon": "Monitor", "title": "Affichage dynamique", "description": "Écrans pour menus et promotions"},
            {"icon": "Wifi", "title": "WiFi marketing", "description": "Collectez les données clients"},
            {"icon": "Star", "title": "Avis en ligne", "description": "Gestion de votre e-réputation"}
        ],
        "cta_title": "DIGITALISEZ VOTRE RESTAURANT",
        "cta_subtitle": "Pack complet à partir de 99€/mois"
    },
    
    # PRICING
    "pricing": {
        "slug": "pricing",
        "page_title": "Tarifs - Plans et Abonnements",
        "hero_title": "💰 Nos Tarifs Transparents",
        "hero_subtitle": "Choisissez la formule adaptée à votre activité",
        "hero_image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        "cta_title": "BESOIN D'UN DEVIS PERSONNALISÉ ?",
        "cta_subtitle": "Contactez notre équipe commerciale"
    },
    
    # ABOUT
    "about": {
        "slug": "about",
        "page_title": "À Propos - AyaPos",
        "hero_title": "👥 À Propos d'AyaPos",
        "hero_subtitle": "Leader des solutions POS pour restaurants et commerces depuis 2015",
        "hero_image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        "sections": {
            "mission": {
                "title": "Notre Mission",
                "items": [
                    {
                        "icon": "🎯",
                        "title": "Innovation",
                        "description": "Développer les technologies les plus avancées pour nos clients"
                    },
                    {
                        "icon": "💼",
                        "title": "Accompagnement",
                        "description": "Soutenir la croissance de nos partenaires"
                    },
                    {
                        "icon": "🌍",
                        "title": "Expansion",
                        "description": "Présents dans 15 pays à travers le monde"
                    }
                ]
            },
            "values": {
                "title": "Nos Valeurs",
                "items": [
                    {"icon": "✨", "title": "Excellence", "description": "Qualité irréprochable de nos produits"},
                    {"icon": "🤝", "title": "Partenariat", "description": "Relations durables avec nos clients"},
                    {"icon": "🚀", "title": "Innovation", "description": "Technologies de pointe"}
                ]
            }
        },
        "cta_title": "REJOIGNEZ-NOUS",
        "cta_subtitle": "Plus de 10,000 restaurants nous font confiance"
    },
    
    # CONTACT
    "contact": {
        "slug": "contact",
        "page_title": "Contactez-Nous",
        "hero_title": "📞 Contactez-Nous",
        "hero_subtitle": "Notre équipe est à votre écoute pour répondre à toutes vos questions",
        "hero_image": "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80",
        "sections": {
            "contact_info": {
                "title": "Coordonnées",
                "items": [
                    {"icon": "📧", "title": "Email", "description": "contact@ayapos.com"},
                    {"icon": "📱", "title": "Téléphone", "description": "+33 1 23 45 67 89"},
                    {"icon": "📍", "title": "Adresse", "description": "123 Avenue des Champs-Élysées, 75008 Paris"}
                ]
            }
        },
        "cta_title": "BESOIN D'UNE DÉMONSTRATION ?",
        "cta_subtitle": "Prenez rendez-vous avec un expert"
    },
    
    # IT SERVICES
    "it-services": {
        "slug": "it-services",
        "page_title": "Services IT",
        "hero_title": "💻 Services IT Professionnels",
        "hero_subtitle": "Support technique et maintenance pour votre infrastructure",
        "hero_image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        "features": [
            {"icon": "Headphones", "title": "Support 24/7", "description": "Assistance technique disponible en permanence"},
            {"icon": "Tool", "title": "Maintenance", "description": "Mise à jour et entretien régulier"},
            {"icon": "Cloud", "title": "Hébergement", "description": "Infrastructure cloud sécurisée"},
            {"icon": "Shield", "title": "Sécurité", "description": "Protection avancée contre les cybermenaces"}
        ],
        "cta_title": "SÉCURISEZ VOTRE INFRASTRUCTURE",
        "cta_subtitle": "Audit gratuit de votre système"
    },
    
    # BLOG
    "blog": {
        "slug": "blog",
        "page_title": "Blog - Actualités et Conseils",
        "hero_title": "📝 Blog AyaPos",
        "hero_subtitle": "Actualités, conseils et tendances du secteur de la restauration",
        "hero_image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        "cta_title": "RESTEZ INFORMÉ",
        "cta_subtitle": "Abonnez-vous à notre newsletter"
    },
    
    # TERMS & CONDITIONS
    "terms-conditions": {
        "slug": "terms-conditions",
        "page_title": "Conditions Générales d'Utilisation",
        "hero_title": "📋 Conditions Générales d'Utilisation",
        "hero_subtitle": "Dernière mise à jour : Décembre 2024",
        "sections": {
            "article_1": {
                "title": "Article 1 - Objet",
                "items": [
                    {
                        "icon": "📄",
                        "title": "Objet des CGU",
                        "description": "Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation des services proposés par AyaPos, ainsi que les droits et obligations des parties dans ce cadre."
                    }
                ]
            },
            "article_2": {
                "title": "Article 2 - Mentions Légales",
                "items": [
                    {
                        "icon": "🏢",
                        "title": "Éditeur",
                        "description": "AyaPos SAS - Capital social : 100,000€ - RCS Paris 123 456 789 - Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France"
                    },
                    {
                        "icon": "📧",
                        "title": "Contact",
                        "description": "Email : contact@ayapos.com - Téléphone : +33 1 23 45 67 89"
                    }
                ]
            },
            "article_3": {
                "title": "Article 3 - Accès aux Services",
                "items": [
                    {
                        "icon": "🔐",
                        "title": "Conditions d'accès",
                        "description": "L'accès aux services AyaPos est réservé aux professionnels. Une inscription et la création d'un compte sont nécessaires pour utiliser nos solutions."
                    }
                ]
            },
            "article_4": {
                "title": "Article 4 - Propriété Intellectuelle",
                "items": [
                    {
                        "icon": "©️",
                        "title": "Droits d'auteur",
                        "description": "L'ensemble des contenus présents sur le site AyaPos (textes, images, logos, logiciels) sont protégés par les lois relatives à la propriété intellectuelle."
                    }
                ]
            }
        }
    },
    
    # PRIVACY POLICY
    "privacy-policy": {
        "slug": "privacy-policy",
        "page_title": "Politique de Confidentialité",
        "hero_title": "🔒 Politique de Confidentialité",
        "hero_subtitle": "Protection de vos données personnelles - RGPD",
        "sections": {
            "collecte": {
                "title": "Collecte des Données",
                "items": [
                    {
                        "icon": "📊",
                        "title": "Données collectées",
                        "description": "Nous collectons les données suivantes : nom, prénom, email, téléphone, adresse de l'établissement, données de transaction (uniquement pour la facturation)."
                    },
                    {
                        "icon": "🎯",
                        "title": "Finalité",
                        "description": "Ces données sont utilisées pour la gestion de votre compte, la fourniture des services, le support client et la facturation."
                    }
                ]
            },
            "protection": {
                "title": "Protection et Sécurité",
                "items": [
                    {
                        "icon": "🔐",
                        "title": "Sécurisation",
                        "description": "Vos données sont hébergées sur des serveurs sécurisés avec chiffrement SSL/TLS. Nous appliquons les meilleures pratiques de sécurité informatique."
                    },
                    {
                        "icon": "⏱️",
                        "title": "Conservation",
                        "description": "Vos données sont conservées pendant la durée de votre contrat, puis archivées conformément aux obligations légales (5 ans pour les données comptables)."
                    }
                ]
            },
            "droits": {
                "title": "Vos Droits RGPD",
                "items": [
                    {
                        "icon": "✅",
                        "title": "Droit d'accès",
                        "description": "Vous pouvez demander l'accès à vos données personnelles à tout moment."
                    },
                    {
                        "icon": "✏️",
                        "title": "Droit de rectification",
                        "description": "Vous pouvez corriger vos données si elles sont inexactes."
                    },
                    {
                        "icon": "🗑️",
                        "title": "Droit à l'effacement",
                        "description": "Vous pouvez demander la suppression de vos données (sous réserve des obligations légales de conservation)."
                    },
                    {
                        "icon": "📥",
                        "title": "Droit à la portabilité",
                        "description": "Vous pouvez récupérer vos données dans un format structuré et lisible par machine."
                    }
                ]
            },
            "contact_rgpd": {
                "title": "Contact DPO",
                "items": [
                    {
                        "icon": "👤",
                        "title": "Délégué à la Protection des Données",
                        "description": "Pour toute question concernant vos données personnelles : dpo@ayapos.com"
                    }
                ]
            }
        }
    }
}


async def sync_all_pages():
    """Synchronise TOUTES les pages dans la base de données"""
    client = AsyncIOMotorClient(mongo_url)
    db = client['test_database']
    
    print("=" * 80)
    print("🚀 SYNCHRONISATION COMPLÈTE DE TOUTES LES PAGES DU SITE")
    print("=" * 80)
    print()
    
    total_pages = len(ALL_PAGES_CONTENT)
    synced = 0
    
    for page_slug, content in ALL_PAGES_CONTENT.items():
        try:
            result = await db.content.update_one(
                {"slug": page_slug},
                {"$set": content},
                upsert=True
            )
            
            if result.upserted_id:
                status = "✅ CRÉÉ"
            else:
                status = "✅ MIS À JOUR"
            
            # Compter les éléments
            features_count = len(content.get('features', []))
            benefits_count = len(content.get('benefits', []))
            sections_count = len(content.get('sections', {}))
            
            print(f"{status} | {page_slug:30} | Features: {features_count} | Benefits: {benefits_count} | Sections: {sections_count}")
            synced += 1
            
        except Exception as e:
            print(f"❌ ERREUR | {page_slug}: {str(e)}")
    
    print()
    print("=" * 80)
    print(f"✨ SYNCHRONISATION TERMINÉE : {synced}/{total_pages} pages synchronisées")
    print("=" * 80)
    print()
    print("📊 RÉSUMÉ:")
    print(f"   • {total_pages} pages du site sont maintenant éditables dans l'admin")
    print(f"   • Hero (titre + sous-titre + image) pour chaque page")
    print(f"   • Fonctionnalités et bénéfices avec images")
    print(f"   • Sections personnalisées")
    print(f"   • Call-to-Action personnalisables")
    print()
    print("🎉 VOUS POUVEZ MAINTENANT TOUT MODIFIER DEPUIS L'ADMIN !")
    print("=" * 80)
    
    client.close()


if __name__ == "__main__":
    asyncio.run(sync_all_pages())

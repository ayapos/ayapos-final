"""
Script pour synchroniser le contenu codé en dur du site avec la base de données MongoDB
Ce script extrait le contenu réel des fichiers .jsx et le charge dans la base de données
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from uuid import uuid4

load_dotenv()
mongo_url = os.getenv('MONGO_URL')

# ============================================
# CONTENU DE RestaurantPOS.jsx
# ============================================

restaurant_pos_features = [
    {
        "icon": "Cloud",
        "title": "Système POS Cloud",
        "description": "Application POS basée sur le cloud pour les appareils Android. Téléchargez-la sur une tablette et essayez immédiatement."
    },
    {
        "icon": "Store",
        "title": "Pour Toutes les Entreprises",
        "description": "Restaurants, cafés, pâtisseries, cafés, hôtels, commerces de détail et toutes les chaînes d'entreprises."
    },
    {
        "icon": "Smartphone",
        "title": "Rapports Mobile et En Ligne",
        "description": "Accédez instantanément à toutes vos informations depuis un ordinateur, une tablette ou un smartphone."
    },
    {
        "icon": "Wifi",
        "title": "Fonctionnement Hors Ligne",
        "description": "Avec la fonction hors ligne, votre système POS continue de fonctionner sans interruption même si Internet est coupé."
    },
    {
        "icon": "Package",
        "title": "Suivi des Stocks",
        "description": "Suivez instantanément les stocks alimentaires et boissons ainsi que les stocks de matières premières liés aux recettes."
    },
    {
        "icon": "Users",
        "title": "Comptes Clients",
        "description": "Créez des comptes clients, fournisseurs, cartes de membre, personnel et créances, suivez les dettes."
    },
    {
        "icon": "BarChart3",
        "title": "Commande en Ligne",
        "description": "Suivez vos commandes en ligne grâce aux intégrations avec les plateformes de livraison."
    },
    {
        "icon": "Globe",
        "title": "Intégrations",
        "description": "Fonctionne avec caller ID, lecteurs de codes-barres, balances, imprimantes SLIP, et systèmes de e-facture."
    }
]

restaurant_pos_benefits = [
    {
        "title": "Commencez Immédiatement à Vendre",
        "description": "Avec l'interface visuelle conviviale du système POS AyaPos, définissez vos produits en quelques minutes et commencez à prendre des commandes.",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    },
    {
        "title": "Système Cloud et Fonctionnement Hors Ligne",
        "description": "Le système POS restaurant est un programme basé sur le cloud nouvelle génération. Il offre également un puissant support de fonctionnement hors ligne.",
        "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
    },
    {
        "title": "Système POS Compétent et Avancé",
        "description": "Le système POS restaurant dispose de nombreuses fonctionnalités telles que la vente par code-barres, les commandes de table, les commandes à emporter.",
        "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80"
    }
]

restaurant_pos_faqs = [
    {
        "question": "Qu'est-ce que le système POS Restaurant AyaPos et comment fonctionne-t-il?",
        "answer": "Le système POS AyaPos est un système de point de vente basé sur le cloud conçu spécialement pour les restaurants. Il est utilisé pour prendre les commandes des clients, effectuer des ventes par code-barres, gérer les tables et les additions, suivre les stocks et surveiller les performances commerciales."
    },
    {
        "question": "Quels sont les avantages du programme d'additions restaurant AyaPos?",
        "answer": "Le système POS AyaPos est un programme d'additions restaurant rapide et fiable avec une interface visuelle conviviale. Vous pouvez facilement définir vos produits et commencer à prendre des commandes sans formation."
    },
    {
        "question": "Le programme d'additions restaurant AyaPos dispose-t-il d'une intégration de commande en ligne?",
        "answer": "Oui, avec le programme d'additions restaurant AyaPos, vous pouvez prendre des commandes à emporter des clients qui appellent par téléphone et des applications de commande mobile, et les gérer facilement."
    },
    {
        "question": "Pour quels types d'entreprises le système d'additions restaurant AyaPos est-il adapté?",
        "answer": "Le système d'additions restaurant AyaPos est idéal pour les restaurants, cafés, bars, chaînes de restauration rapide et entreprises similaires. Il offre des solutions personnalisables et évolutives pour tous types d'entreprises."
    },
    {
        "question": "Quel est le modèle de tarification du système d'additions restaurant AyaPos?",
        "answer": "Les prix du système d'additions restaurant AyaPos peuvent varier en fonction des besoins et de la taille de l'entreprise. La tarification des logiciels est généralement proposée via un modèle d'abonnement mensuel ou annuel."
    },
    {
        "question": "Comment puis-je acheter le système POS Restaurant AyaPos?",
        "answer": "Pour acheter ou essayer le système POS restaurant AyaPos, vous pouvez remplir le formulaire de contact ou appeler directement notre centre d'appels."
    }
]

restaurant_pos_testimonials = [
    {
        "name": "Pierre Martin",
        "business": "Restaurant Le Bistro",
        "city": "Paris",
        "text": "Nous utilisons AyaPos depuis 2 ans dans nos 3 restaurants. La gestion centralisée et les rapports en temps réel nous font gagner beaucoup de temps.",
        "rating": 5
    },
    {
        "name": "Sophie Dubois",
        "business": "Café Parisien",
        "city": "Lyon",
        "text": "Le système est intuitif et le support client est exceptionnel. Les terminaux de paiement sont ultra-rapides.",
        "rating": 5
    },
    {
        "name": "Marc Laurent",
        "business": "Brasserie du Centre",
        "city": "Marseille",
        "text": "AyaPos a transformé notre façon de travailler. L'intégration avec les commandes en ligne est parfaite.",
        "rating": 5
    }
]

# Plans de tarification Restaurant POS
restaurant_pos_pricing = [
    {
        "id": "pos-mobile-restaurant",
        "name": "POS Mobile",
        "tagline": "Mobile, portable",
        "price": 349,
        "description": "Vendeurs mobiles, équipes de terrain, commerçants, zones d'événements",
        "category": "POS",
        "features": [
            "Utilisateurs illimités",
            "Android OS",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes de table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "App de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-web-restaurant",
        "name": "POS Web",
        "tagline": "Démarrage rapide, votre propre appareil",
        "price": 525,
        "discount": 20,
        "description": "Nouvelles entreprises, petits cafés et kiosques",
        "category": "POS",
        "features": [
            "Utilisateurs illimités",
            "Basé sur le Web",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes de table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "App de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-tablet-restaurant",
        "name": "POS Tablet",
        "tagline": "Compact, économique",
        "price": 699,
        "description": "Petits restaurants, chaînes de cafés, pâtisseries boutiques",
        "category": "POS",
        "recommended": True,
        "features": [
            "Utilisateurs illimités",
            "Android OS",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes de table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "App de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-premium-restaurant",
        "name": "POS Premium",
        "tagline": "Contrôle total, puissance maximale",
        "price": 1049,
        "description": "Chaînes de restaurants, centres commerciaux, entreprises à fort volume",
        "category": "POS",
        "features": [
            "Utilisateurs illimités",
            "Android / Windows",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes de table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "App de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    }
]

# ============================================
# CONTENU DE AyaPay.jsx
# ============================================

ayapay_features = [
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
]

ayapay_terminals = [
    {
        "id": "terminal-a77",
        "name": "SmartPOS A77",
        "tagline": "Compact et léger",
        "description": "Terminal portable avec écran tactile 5\" et connexion 4G. Parfait pour les paiements mobiles.",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
        "category": "Payment",
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
        "id": "terminal-a920",
        "name": "SmartPOS A920",
        "tagline": "Smart et rapide",
        "description": "Terminal intelligent avec grand écran 5.5\" et imprimante intégrée. Idéal pour les restaurants.",
        "image": "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&q=80",
        "category": "Payment",
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
        "id": "terminal-q80",
        "name": "Desk POS Q80",
        "tagline": "Fixe et pratique",
        "description": "Terminal de comptoir avec support stable. Solution professionnelle pour points de vente fixes.",
        "image": "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80",
        "category": "Payment",
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
        "id": "terminal-softpos",
        "name": "Tap to Pay on iPhone",
        "tagline": "Paiement sans terminal",
        "description": "Transformez votre iPhone en terminal de paiement. Aucun matériel supplémentaire nécessaire.",
        "image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&q=80",
        "category": "Payment",
        "features": [
            "Sans matériel supplémentaire",
            "Application MyPayments",
            "Paiements sans contact",
            "Sécurité maximale",
            "Configuration rapide",
            "Compatible iPhone XS+"
        ]
    }
]

ayapay_pricing_tiers = [
    {
        "id": "ayapay-starter",
        "name": "Starter",
        "price": 29,
        "description": "Pour les petites entreprises",
        "category": "Payment",
        "features": [
            "Terminal SmartPOS A77",
            "Frais de transaction 1.5%",
            "Support email",
            "Reçus digitaux",
            "Rapports mensuels"
        ]
    },
    {
        "id": "ayapay-business",
        "name": "Business",
        "price": 79,
        "description": "Pour les entreprises en croissance",
        "category": "Payment",
        "recommended": True,
        "features": [
            "Terminal SmartPOS A920",
            "Frais de transaction 1.2%",
            "Support prioritaire",
            "Reçus digitaux et imprimés",
            "Rapports en temps réel",
            "Intégration POS complète"
        ]
    },
    {
        "id": "ayapay-enterprise",
        "name": "Enterprise",
        "price": 0,  # Sur mesure
        "price_label": "Sur mesure",
        "description": "Pour les grandes entreprises",
        "category": "Payment",
        "features": [
            "Tous les terminaux",
            "Frais négociables",
            "Support dédié 24/7",
            "Fonctionnalités avancées",
            "Intégration personnalisée",
            "Formation sur site"
        ]
    }
]

# ============================================
# CONTENU DE POSSystems.jsx (mockData.js)
# ============================================

pos_systems_packages = [
    {
        "id": "pos-premium",
        "name": "Premium POS",
        "tagline": "Contrôle total, puissance maximale",
        "description": "Pour les chaînes de restaurants, centres commerciaux et entreprises à fort volume",
        "price": 1049,
        "category": "POS",
        "image": "https://images.unsplash.com/photo-1693632376342-96ccd26632f1?w=800&h=400&fit=crop",
        "recommended": True,
        "features": [
            "Utilisateurs illimités",
            "Android / Windows",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes par table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "Application de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-tablet",
        "name": "Tablet POS",
        "tagline": "Compact et économique",
        "description": "Pour les petits restaurants, chaînes de cafés et pâtisseries boutiques",
        "price": 699,
        "category": "POS",
        "image": "https://images.unsplash.com/photo-1747930117871-df71e977ac0c?w=800&h=400&fit=crop",
        "features": [
            "Utilisateurs illimités",
            "Android OS",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes par table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "Application de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-web",
        "name": "Web POS",
        "tagline": "Démarrage rapide, votre propre appareil",
        "description": "Pour les nouvelles entreprises, cafés et kiosques",
        "price": 525,
        "discount": 20,
        "category": "POS",
        "image": "https://images.unsplash.com/photo-1718279602896-6df6c34f61e5?w=800&h=400&fit=crop",
        "features": [
            "Utilisateurs illimités",
            "Basé sur le Web",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes par table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "Application de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    },
    {
        "id": "pos-mobile",
        "name": "Mobile POS",
        "tagline": "Mobile et portable",
        "description": "Pour les ventes sur le terrain, vendeurs ambulants et événements",
        "price": 349,
        "category": "POS",
        "image": "https://images.unsplash.com/photo-1726065235203-4368c41c6f19?w=800&h=400&fit=crop",
        "features": [
            "Utilisateurs illimités",
            "Android OS",
            "Fonctionnement hors ligne",
            "Vente rapide par code-barres",
            "Suivi des commandes par table",
            "Gestion des comptes clients",
            "Portail de gestion en ligne",
            "Application de rapport mobile",
            "Gestion multi-menus",
            "Connexion multi-imprimantes",
            "Support écran cuisine (KDS)"
        ]
    }
]


async def sync_all_content():
    """Synchronise tout le contenu codé en dur avec la base de données"""
    client = AsyncIOMotorClient(mongo_url)
    db = client['test_database']
    
    print("🚀 Début de la synchronisation du contenu...")
    print("=" * 60)
    
    # 1. NETTOYER ET REPEUPLER LA COLLECTION PRODUCTS
    print("\n📦 Synchronisation des PRODUITS...")
    await db.products.delete_many({})
    
    all_products = []
    all_products.extend(ayapay_terminals)
    all_products.extend(ayapay_pricing_tiers)
    all_products.extend(pos_systems_packages)
    
    for product in all_products:
        product_doc = {
            "id": product["id"],
            "name": product["name"],
            "tagline": product.get("tagline", ""),
            "description": product.get("description", ""),
            "price": product.get("price", 0),
            "category": product.get("category", ""),
            "image": product.get("image", ""),
            "features": product.get("features", []),
            "recommended": product.get("recommended", False),
            "discount": product.get("discount", 0),
            "price_label": product.get("price_label", "")
        }
        await db.products.insert_one(product_doc)
    
    print(f"   ✅ {len(all_products)} produits synchronisés")
    
    # 2. SYNCHRONISER LES FAQ
    print("\n❓ Synchronisation des FAQ...")
    await db.faq.delete_many({"category": "restaurant-pos"})
    
    for faq in restaurant_pos_faqs:
        faq_doc = {
            "id": str(uuid4()),
            "question": faq["question"],
            "answer": faq["answer"],
            "category": "restaurant-pos",
            "order": restaurant_pos_faqs.index(faq)
        }
        await db.faq.insert_one(faq_doc)
    
    print(f"   ✅ {len(restaurant_pos_faqs)} FAQs synchronisées")
    
    # 3. SYNCHRONISER LES TESTIMONIALS
    print("\n💬 Synchronisation des TÉMOIGNAGES...")
    await db.testimonials.delete_many({})
    
    for testimonial in restaurant_pos_testimonials:
        testimonial_doc = {
            "id": str(uuid4()),
            "name": testimonial["name"],
            "business": testimonial["business"],
            "city": testimonial["city"],
            "text": testimonial["text"],
            "rating": testimonial["rating"]
        }
        await db.testimonials.insert_one(testimonial_doc)
    
    print(f"   ✅ {len(restaurant_pos_testimonials)} témoignages synchronisés")
    
    # 4. CRÉER/METTRE À JOUR LE CONTENU DE PAGE RESTAURANT-POS
    print("\n📄 Synchronisation du CONTENU DE PAGE restaurant-pos...")
    
    # Créer ou mettre à jour le document de contenu pour la page restaurant-pos
    restaurant_pos_content = {
        "slug": "restaurant-pos",
        "page_title": "Système POS Restaurant Complet",
        "hero_title": "🍽️ Système POS Restaurant Complet",
        "hero_subtitle": "Solution tout-en-un pour gérer votre restaurant avec efficacité",
        "hero_image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "features": restaurant_pos_features,
        "benefits": restaurant_pos_benefits,
        "sections": {
            "table_management": {
                "title": "Gérez les commandes, additions et tables!",
                "items": [
                    {
                        "title": "Déplacer ou Fusionner les Tables",
                        "description": "Avec le système POS restaurant, déplacez les additions en bloc ou par articles, et fusionnez-les sur la table.",
                        "icon": "🔄"
                    },
                    {
                        "title": "Diviser, Annuler ou Rembourser les Commandes",
                        "description": "Sélectionnez les produits et offrez, annulez ou remboursez facilement. Divisez les additions en un seul clic.",
                        "icon": "✂️"
                    },
                    {
                        "title": "Intégration EFT-POS, Facture, e-Facture",
                        "description": "Grâce aux intégrations financières du système, prenez le paiement des appareils EFT-POS et imprimez les reçus fiscaux.",
                        "icon": "💳"
                    }
                ]
            },
            "online_orders": {
                "title": "Gérez vos commandes en ligne sur un seul écran!",
                "items": [
                    {
                        "title": "Gérer les Commandes en Ligne et à Emporter",
                        "description": "Prenez des commandes à emporter des clients qui appellent par téléphone et des applications de commande en ligne.",
                        "icon": "📦"
                    },
                    {
                        "title": "Informer Vos Clients",
                        "description": "Gérez vos commandes en ligne et à emporter sur un seul écran, minimisez les erreurs et suivez facilement les détails et statuts des commandes.",
                        "icon": "📱"
                    },
                    {
                        "title": "Obtenez l'Application Livreur",
                        "description": "Gérez plus efficacement vos commandes en ligne en utilisant le système POS et l'application livreur ensemble.",
                        "icon": "🚗"
                    }
                ]
            },
            "reports": {
                "title": "Rapports avancés et analyses",
                "items": [
                    {
                        "title": "Analysez et Rapportez Vos Ventes",
                        "description": "Accédez à tous les rapports de fin de journée, caisse, ventes de produits, additions, encaissements à tout moment.",
                        "icon": "📊"
                    },
                    {
                        "title": "Mouvements de Caisse et Comptes Clients",
                        "description": "Visualisez toutes vos transactions de caisse instantanément, examinez les additions, suivez les créances et dettes des comptes clients.",
                        "icon": "💰"
                    },
                    {
                        "title": "Gestion des Stocks et Suivi du Personnel",
                        "description": "Suivez vos mouvements de stock en temps réel, vérifiez périodiquement vos stocks de produits et matières premières.",
                        "icon": "📦"
                    }
                ]
            }
        },
        "cta_title": "AYAPOS SYSTÈMES POS NOUVELLE GÉNÉRATION",
        "cta_subtitle": "Ayez toujours une longueur d'avance!"
    }
    
    await db.content.update_one(
        {"slug": "restaurant-pos"},
        {"$set": restaurant_pos_content},
        upsert=True
    )
    print("   ✅ Contenu de la page restaurant-pos synchronisé")
    
    # 5. CRÉER/METTRE À JOUR LE CONTENU DE PAGE AYAPAY
    print("\n📄 Synchronisation du CONTENU DE PAGE ayapay...")
    
    ayapay_content = {
        "slug": "ayapay",
        "page_title": "AyaPay - Terminaux de Paiement",
        "hero_title": "Solutions de paiement professionnelles AyaPay",
        "hero_subtitle": "Acceptez tous les moyens de paiement avec nos terminaux nouvelle génération",
        "hero_image": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
        "features": ayapay_features,
        "sections": {
            "why_ayapay": {
                "title": "Pourquoi choisir AyaPay ?",
                "subtitle": "Des terminaux de paiement conçus pour votre réussite"
            },
            "terminals": {
                "title": "Nos Terminaux de Paiement",
                "subtitle": "Choisissez le terminal adapté à votre activité"
            },
            "pricing": {
                "title": "Tarifs transparents",
                "subtitle": "Aucun frais caché, aucun engagement long terme"
            }
        },
        "cta_title": "Prêt à accepter tous les paiements ?",
        "cta_subtitle": "Obtenez votre terminal de paiement en 48h"
    }
    
    await db.content.update_one(
        {"slug": "ayapay"},
        {"$set": ayapay_content},
        upsert=True
    )
    print("   ✅ Contenu de la page ayapay synchronisé")
    
    # 6. CRÉER/METTRE À JOUR LE CONTENU DE PAGE POS-SYSTEMS
    print("\n📄 Synchronisation du CONTENU DE PAGE pos-systems...")
    
    pos_systems_content = {
        "slug": "pos-systems",
        "page_title": "Systèmes POS",
        "hero_title": "Systèmes POS Professionnels",
        "hero_subtitle": "Choisissez le système de caisse qui correspond à vos besoins",
        "sections": {
            "comparison": {
                "title": "Quel système POS vous convient ?",
                "subtitle": "Comparez nos solutions pour trouver celle qui correspond à vos besoins",
                "items": [
                    {
                        "title": "Mobile POS",
                        "icon": "📱",
                        "best": "Ventes mobiles",
                        "features": ["Portable", "Léger", "Sans fil"]
                    },
                    {
                        "title": "Web POS",
                        "icon": "💻",
                        "best": "Démarrage rapide",
                        "features": ["Basé sur le cloud", "Aucune installation", "Multi-appareil"]
                    },
                    {
                        "title": "Tablet POS",
                        "icon": "⌨️",
                        "best": "PME",
                        "features": ["Compact", "Économique", "Facile à utiliser"]
                    },
                    {
                        "title": "Premium POS",
                        "icon": "🚀",
                        "best": "Grandes entreprises",
                        "features": ["Puissant", "Multi-branches", "Fonctionnalités avancées"]
                    }
                ]
            }
        },
        "cta_title": "Besoin d'aide pour choisir ?",
        "cta_subtitle": "Contactez notre équipe pour une consultation personnalisée"
    }
    
    await db.content.update_one(
        {"slug": "pos-systems"},
        {"$set": pos_systems_content},
        upsert=True
    )
    print("   ✅ Contenu de la page pos-systems synchronisé")
    
    print("\n" + "=" * 60)
    print("✨ Synchronisation terminée avec succès!")
    print("=" * 60)
    
    # Afficher un résumé
    print("\n📊 RÉSUMÉ:")
    products_count = await db.products.count_documents({})
    faq_count = await db.faq.count_documents({})
    testimonials_count = await db.testimonials.count_documents({})
    content_count = await db.content.count_documents({})
    
    print(f"   • Produits: {products_count}")
    print(f"   • FAQs: {faq_count}")
    print(f"   • Témoignages: {testimonials_count}")
    print(f"   • Pages de contenu: {content_count}")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(sync_all_content())

"""
Script pour synchroniser le contenu de Self-Order Kiosk dans la base de données
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()
mongo_url = os.getenv('MONGO_URL')

# Contenu de la page Self-Order Kiosk
kiosk_content = {
    "slug": "self-order-kiosk",
    "page_title": "Self-Order Kiosk - Bornes de Commande Automatique",
    "hero_title": "🖥️ Self-Order Kiosk",
    "hero_subtitle": "Bornes de commande automatique pour augmenter vos ventes et réduire les files d'attente",
    "hero_image": "https://images.unsplash.com/photo-1556742400-b5a5f5d92bb4?w=800&q=80",
    
    "benefits": [
        {
            "title": "Augmentez vos ventes avec le Self-Order Kiosk",
            "description": "Les bornes de commande self-service augmentent le panier moyen de 25% grâce aux suggestions intelligentes de produits complémentaires.",
            "image": "https://images.unsplash.com/photo-1556742400-b5a5f5d92bb4?w=800&q=80"
        },
        {
            "title": "Réduisez les files d'attente et le temps d'attente",
            "description": "Les clients passent leurs commandes rapidement via l'interface tactile intuitive, réduisant les files d'attente de 60%.",
            "image": "https://images.unsplash.com/photo-1556741533-f6acd646dcec?w=800&q=80"
        },
        {
            "title": "Libérez votre personnel pour un meilleur service",
            "description": "Vos employés peuvent se concentrer sur la préparation des commandes et le service client plutôt que sur la prise de commandes.",
            "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
        }
    ],
    
    "features": [
        {
            "icon": "Smartphone",
            "title": "Interface tactile intuitive",
            "description": "Écran tactile HD facile à utiliser pour tous les âges"
        },
        {
            "icon": "Zap",
            "title": "Commande ultra-rapide",
            "description": "Processus de commande optimisé en moins de 60 secondes"
        },
        {
            "icon": "Users",
            "title": "Support multilingue",
            "description": "Interface disponible en 9 langues pour vos clients internationaux"
        },
        {
            "icon": "TrendingUp",
            "title": "Upselling intelligent",
            "description": "Suggestions automatiques de produits complémentaires"
        },
        {
            "icon": "Clock",
            "title": "Disponible 24/7",
            "description": "Service continu même pendant les heures de pointe"
        },
        {
            "icon": "ShoppingBag",
            "title": "Panier personnalisable",
            "description": "Modifications faciles et options de personnalisation"
        },
        {
            "icon": "DollarSign",
            "title": "Paiement intégré",
            "description": "Accepte toutes les cartes et paiements sans contact"
        },
        {
            "icon": "Globe",
            "title": "Design personnalisable",
            "description": "Interface adaptée à votre identité visuelle"
        }
    ],
    
    "sections": {
        "use_cases": {
            "title": "Cas d'Usage Idéaux",
            "items": [
                {
                    "icon": "🍔",
                    "title": "Restaurants Fast-Food",
                    "description": "Idéal pour les chaînes de restauration rapide avec fort volume"
                },
                {
                    "icon": "☕",
                    "title": "Cafés et Coffee Shops",
                    "description": "Parfait pour les commandes de boissons personnalisées"
                },
                {
                    "icon": "🍕",
                    "title": "Pizzerias",
                    "description": "Commande facile avec personnalisation des pizzas"
                },
                {
                    "icon": "🏪",
                    "title": "Food Courts",
                    "description": "Gestion multi-restaurants dans les centres commerciaux"
                },
                {
                    "icon": "🎬",
                    "title": "Cinémas",
                    "description": "Snacks et boissons sans attente"
                },
                {
                    "icon": "🏢",
                    "title": "Cantines d'Entreprise",
                    "description": "Service rapide pendant les pauses déjeuner"
                }
            ]
        },
        "technical_specs": {
            "title": "Spécifications Techniques",
            "items": [
                {
                    "icon": "📱",
                    "title": "Écran Tactile 21.5\" ou 27\"",
                    "description": "Haute résolution, réponse tactile ultra-précise"
                },
                {
                    "icon": "💳",
                    "title": "Terminal de Paiement Intégré",
                    "description": "Cartes bancaires, NFC, Apple Pay, Google Pay"
                },
                {
                    "icon": "🖨️",
                    "title": "Imprimante Tickets",
                    "description": "Impression rapide des reçus et tickets de commande"
                },
                {
                    "icon": "🔒",
                    "title": "Sécurité Renforcée",
                    "description": "Certification PCI-DSS, chiffrement des données"
                }
            ]
        }
    },
    
    "cta_title": "PRÊT À TRANSFORMER VOTRE SERVICE ?",
    "cta_subtitle": "Demandez une démonstration gratuite du Self-Order Kiosk"
}


async def sync_kiosk_content():
    """Synchronise le contenu Self-Order Kiosk dans la base de données"""
    client = AsyncIOMotorClient(mongo_url)
    db = client['test_database']
    
    print("🚀 Synchronisation du contenu Self-Order Kiosk...")
    print("=" * 60)
    
    try:
        # Mettre à jour ou créer le document
        result = await db.content.update_one(
            {"slug": "self-order-kiosk"},
            {"$set": kiosk_content},
            upsert=True
        )
        
        if result.upserted_id:
            print("✅ Nouveau contenu créé pour Self-Order Kiosk")
        else:
            print("✅ Contenu Self-Order Kiosk mis à jour")
        
        print("\n📊 RÉSUMÉ:")
        print(f"   • Hero: Titre + Sous-titre + 1 Image")
        print(f"   • Benefits: {len(kiosk_content['benefits'])} bénéfices avec 3 IMAGES")
        print(f"   • Features: {len(kiosk_content['features'])} fonctionnalités")
        print(f"   • Use Cases: {len(kiosk_content['sections']['use_cases']['items'])} cas d'usage")
        print(f"   • Specs Techniques: {len(kiosk_content['sections']['technical_specs']['items'])} spécifications")
        print(f"   • CTA: Titre + Sous-titre")
        
        print("\n✨ TOUTES LES PHOTOS DE LA PAGE SONT MAINTENANT ÉDITABLES DANS L'ADMIN !")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Erreur: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(sync_kiosk_content())

#!/usr/bin/env python3
"""
Script pour ajouter des benefits avec images à toutes les pages qui en manquent
"""
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['test_database']

# Pages à mettre à jour avec leurs benefits
pages_benefits = {
    'robot-waiter': [
        {
            'id': 'benefit-1',
            'title': 'Expérience client unique',
            'description': 'Offrez une expérience futuriste qui marquera vos clients. Le robot serveur crée un effet wow qui fidélise et génère du bouche-à-oreille positif.',
            'image': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Livraison sans contact',
            'description': 'Service totalement hygiénique et sans contact. Le robot se déplace de manière autonome entre les tables et la cuisine.',
            'image': 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Augmentez votre rentabilité',
            'description': 'Réduisez vos coûts opérationnels tout en améliorant la qualité de service. Le robot travaille en complément de votre équipe.',
            'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        },
        {
            'id': 'benefit-4',
            'title': 'Service efficace 24/7',
            'description': 'Autonomie de 12 heures, navigation intelligente, et capacité de transport optimale pour un service continu.',
            'image': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80'
        }
    ],
    'delivery-management': [
        {
            'id': 'benefit-1',
            'title': 'Suivi en temps réel',
            'description': 'Visualisez tous vos livreurs sur une carte interactive. Suivez chaque commande de la préparation à la livraison avec des mises à jour en temps réel.',
            'image': 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Optimisation automatique des itinéraires',
            'description': 'Notre algorithme calcule les routes les plus rapides en tenant compte du trafic, des zones de livraison et des priorités.',
            'image': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Gestion intelligente de l\'équipe',
            'description': 'Assignation automatique des commandes selon la disponibilité, la position et la charge de travail de chaque livreur.',
            'image': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
        }
    ],
    'self-order-kiosk': [
        {
            'id': 'benefit-1',
            'title': 'Réduisez les files d\'attente',
            'description': 'Les clients commandent directement sur les bornes, réduisant drastiquement le temps d\'attente et améliorant l\'expérience client.',
            'image': 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Augmentez le panier moyen',
            'description': 'Les suggestions intelligentes et les visuels attrayants encouragent les clients à commander davantage (+25% en moyenne).',
            'image': 'https://images.unsplash.com/photo-1571782742478-0816a4773a10?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Interface multilingue',
            'description': 'Servez une clientèle internationale avec des bornes disponibles en plusieurs langues et adaptées à tous.',
            'image': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
        }
    ],
    'web-portal': [
        {
            'id': 'benefit-1',
            'title': 'Tableau de bord centralisé',
            'description': 'Accédez à toutes vos données importantes sur un seul écran : ventes, stocks, statistiques en temps réel.',
            'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Accès de partout',
            'description': 'Gérez votre restaurant depuis n\'importe où avec une connexion internet. PC, tablette ou smartphone.',
            'image': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Rapports détaillés',
            'description': 'Générez des rapports personnalisés sur les ventes, le stock, les employés et bien plus encore.',
            'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        }
    ],
    'mobile-reports': [
        {
            'id': 'benefit-1',
            'title': 'Rapports en temps réel',
            'description': 'Consultez vos statistiques de vente, stock et performance à tout moment, directement depuis votre téléphone.',
            'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Notifications intelligentes',
            'description': 'Recevez des alertes pour les événements importants : rupture de stock, pic de ventes, anomalies.',
            'image': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Export et partage faciles',
            'description': 'Exportez vos rapports en PDF ou Excel et partagez-les avec votre équipe en un clic.',
            'image': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
        }
    ],
    'stock-management': [
        {
            'id': 'benefit-1',
            'title': 'Suivi des stocks en temps réel',
            'description': 'Visualisez instantanément vos niveaux de stock et recevez des alertes automatiques pour les ruptures.',
            'image': 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Gestion des fournisseurs',
            'description': 'Centralisez vos commandes fournisseurs, comparez les prix et suivez les livraisons.',
            'image': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Contrôle des coûts',
            'description': 'Analysez vos coûts alimentaires, réduisez le gaspillage et optimisez vos marges.',
            'image': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
        }
    ],
    'centralized-management': [
        {
            'id': 'benefit-1',
            'title': 'Multi-établissements',
            'description': 'Gérez tous vos restaurants depuis une seule interface. Vue d\'ensemble de la performance de chaque établissement.',
            'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Synchronisation automatique',
            'description': 'Tous les changements (menu, prix, promotions) sont automatiquement synchronisés sur tous vos points de vente.',
            'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Rapports consolidés',
            'description': 'Comparez les performances de vos établissements, identifiez les meilleures pratiques et optimisez globalement.',
            'image': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
        }
    ],
    'hardware-devices': [
        {
            'id': 'benefit-1',
            'title': 'Matériel professionnel',
            'description': 'Équipement restauration haut de gamme : caisses enregistreuses, imprimantes tickets, écrans cuisine, tiroirs-caisses.',
            'image': 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80'
        },
        {
            'id': 'benefit-2',
            'title': 'Installation et configuration',
            'description': 'Nos techniciens installent et configurent tous vos équipements pour un démarrage immédiat.',
            'image': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
        },
        {
            'id': 'benefit-3',
            'title': 'Support et maintenance',
            'description': 'SAV réactif, pièces de rechange disponibles et maintenance préventive pour garantir la continuité de votre service.',
            'image': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
        }
    ]
}

# Mise à jour de toutes les pages
for slug, benefits in pages_benefits.items():
    result = db.content.update_one(
        {'slug': slug},
        {
            '$set': {
                'benefits': benefits,
                'updatedAt': datetime.utcnow().isoformat()
            }
        },
        upsert=True
    )
    
    if result.matched_count > 0:
        print(f"✅ {slug}: {len(benefits)} benefits ajoutés (mis à jour)")
    elif result.upserted_id:
        print(f"✅ {slug}: {len(benefits)} benefits ajoutés (créé)")
    else:
        print(f"⚠️  {slug}: échec")

print(f"\n🎉 Terminé! {len(pages_benefits)} pages mises à jour")

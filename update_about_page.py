#!/usr/bin/env python3
"""
Mettre à jour la page À Propos avec les bonnes informations
"""
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# Nouveau contenu pour la page À Propos
about_content = {
    "slug": "about",
    "hero_title": "AyaPOS - Votre Partenaire Digital depuis 2018",
    "hero_subtitle": "Fondée en 2025 par une équipe passionnée avec 7 ans d'expérience dans le secteur de la restauration digitale",
    "story": """AyaPOS est née de la vision d'entrepreneurs ayant 7 ans d'expérience dans les solutions digitales pour la restauration. Fondée officiellement en 2025, notre équipe a déjà accompagné des centaines de restaurants dans leur transformation numérique.

Notre mission est simple : rendre la technologie accessible à tous les restaurateurs, des petits cafés aux grandes chaînes. Nous croyons que chaque établissement mérite des outils professionnels pour optimiser ses opérations.""",
    
    "mission": "Digitaliser et simplifier la gestion des restaurants en Suisse et en Europe grâce à des solutions innovantes, intuitives et abordables.",
    
    "vision": "Devenir le partenaire technologique de référence pour les restaurateurs, en offrant un écosystème complet : POS, paiements, gestion de stock, livraison et bien plus.",
    
    # Stats modifiés
    "stats": {
        "clients": "800+",
        "clients_label": "Clients satisfaits",
        "experience": "7",
        "experience_label": "Ans d'expérience dans le secteur",
        "team": "15+",
        "team_label": "Experts dédiés",
        "satisfaction": "99%",
        "satisfaction_label": "Taux de satisfaction"
    },
    
    # Timeline corrigée
    "timeline": [
        {
            "year": "2018",
            "title": "Les débuts",
            "description": "L'équipe commence à développer des solutions POS pour restaurants avec une vision claire : simplifier la gestion."
        },
        {
            "year": "2022",
            "title": "Expansion",
            "description": "Lancement de solutions complètes : bornes self-service, paiements sans contact, gestion de stock."
        },
        {
            "year": "2024",
            "title": "Innovation",
            "description": "Intégration de l'IA, robots serveurs, et analytics avancés. 500+ clients adoptent nos solutions."
        },
        {
            "year": "2025",
            "title": "Création officielle d'AyaPOS",
            "description": "Fondation de l'entreprise AyaPOS avec 7 ans d'expertise. 800+ clients et expansion européenne en cours."
        }
    ],
    
    "why_choose_us": [
        {
            "title": "Expertise Éprouvée",
            "description": "7 ans d'expérience dans les solutions digitales pour restaurants. Notre équipe connaît vos défis."
        },
        {
            "title": "Solutions Complètes",
            "description": "De la commande au paiement, en passant par la gestion de stock : tout est intégré."
        },
        {
            "title": "Support Réactif",
            "description": "Une équipe francophone disponible pour vous accompagner au quotidien."
        },
        {
            "title": "Innovation Continue",
            "description": "Mises à jour régulières, nouvelles fonctionnalités, adaptation aux tendances du marché."
        }
    ]
}

# Mettre à jour ou créer la page About
result = db.content.update_one(
    {"slug": "about"},
    {"$set": about_content},
    upsert=True
)

if result.modified_count > 0:
    print("✅ Page À Propos mise à jour")
elif result.upserted_id:
    print("✅ Page À Propos créée")
else:
    print("⚠️ Aucun changement")

print("\n📊 Nouvelles stats:")
print(f"  - {about_content['stats']['clients']} clients")
print(f"  - {about_content['stats']['experience']} ans d'expérience")
print(f"  - {about_content['stats']['team']} experts")
print(f"  - {about_content['stats']['satisfaction']} satisfaction")

print("\n📅 Timeline:")
for milestone in about_content['timeline']:
    print(f"  {milestone['year']}: {milestone['title']}")

print("\n🎉 Mise à jour terminée!")

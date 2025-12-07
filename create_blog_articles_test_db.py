#!/usr/bin/env python3
"""
Script pour créer des articles de blog complets dans test_database
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

ARTICLES = [
    {
        "slug": "tendances-pos-2025",
        "title": "Les 5 tendances des systèmes POS pour restaurants en 2025",
        "excerpt": "Découvrez les innovations technologiques qui transforment la gestion des restaurants : cloud, IA, paiements sans contact et bien plus encore.",
        "content": """# Les 5 tendances des systèmes POS pour restaurants en 2025

L'industrie de la restauration évolue rapidement, et les systèmes de point de vente (POS) ne font pas exception. En 2025, plusieurs tendances majeures redéfinissent la façon dont les restaurants gèrent leurs opérations.

## 1. Le Cloud Computing : L'avenir du POS

Les systèmes POS basés sur le cloud offrent une flexibilité inégalée. Accédez à vos données en temps réel depuis n'importe où, que vous soyez au restaurant ou en déplacement. Plus besoin de serveurs coûteux ou de maintenance complexe.

**Avantages clés:**
- Mises à jour automatiques
- Sauvegarde automatique des données
- Accès multi-sites
- Coûts réduits

## 2. Intelligence Artificielle et Prédictions

L'IA révolutionne la gestion des stocks et la prévision des ventes. Les systèmes modernes analysent vos données historiques pour:

- Prévoir les périodes d'affluence
- Optimiser les stocks
- Réduire le gaspillage alimentaire
- Suggérer des prix dynamiques

## 3. Paiements Sans Contact et Mobiles

85% des paiements seront sans contact d'ici fin 2025. Les clients attendent:

- NFC et Apple Pay/Google Pay
- QR codes pour paiement
- Portefeuilles numériques
- Paiements en table

## 4. Intégration Omnicanale

Les restaurants doivent gérer plusieurs canaux simultanément:

- Commandes sur place
- Click & collect
- Livraison à domicile
- Drive-through

Un bon système POS centralise tout pour une gestion fluide.

## 5. Analytics Avancés en Temps Réel

Les tableaux de bord modernes offrent des insights précieux:

- Analyse des ventes par produit
- Performance du personnel
- Taux de rotation des tables
- Marges bénéficiaires en direct

## Conclusion

Adopter ces technologies n'est plus optionnel. Les restaurants qui investissent dans des systèmes POS modernes augmentent leurs ventes de 30% en moyenne et réduisent leurs coûts opérationnels de 20%.

**AyaPos** intègre toutes ces fonctionnalités pour vous offrir une solution complète et évolutive.""",
        "author": "Équipe AyaPos",
        "date": "2025-01-15",
        "category": "Technologie",
        "imageUrl": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
        "featured": True
    },
    {
        "slug": "choisir-systeme-pos",
        "title": "Comment choisir le bon système POS pour votre restaurant ?",
        "excerpt": "Guide complet pour sélectionner le système POS parfait pour votre restaurant. Critères, pièges à éviter, questions à poser.",
        "content": """# Comment choisir le bon système POS pour votre restaurant ?

Choisir un système POS est une décision critique qui impactera votre restaurant pendant des années. Voici notre guide complet pour faire le bon choix.

## Les Critères Essentiels

### 1. Facilité d'utilisation
Votre personnel doit pouvoir utiliser le système après seulement **30 minutes de formation**. Un système complexe ralentit le service et frustre les employés.

**Ce qu'il faut vérifier:**
- Interface intuitive
- Navigation claire
- Formation rapide
- Support en français

### 2. Fonctionnalités Adaptées
Ne payez pas pour des fonctionnalités inutiles. Identifiez vos besoins réels:

**Restaurant rapide:**
- Prise de commande rapide
- Gestion des files d'attente
- Intégration livraison

**Restaurant gastronomique:**
- Gestion des réservations
- Service en table
- Cave à vin intégrée

**Café/Boulangerie:**
- Programme de fidélité
- Vente rapide
- Gestion des heures de pointe

### 3. Coût Total de Possession

Le prix d'achat n'est que la partie visible. Calculez:

- **Matériel:** Terminal, imprimante, tiroir-caisse
- **Logiciel:** Abonnement mensuel ou licence
- **Formation:** Temps et ressources
- **Maintenance:** Contrats de support
- **Mises à jour:** Gratuites ou payantes?

💡 **Budget réaliste:** CHF 2,000-5,000 initial + CHF 50-200/mois

### 4. Intégrations Nécessaires

Votre POS doit se connecter à vos outils existants:

- Comptabilité (Banana, Bexio)
- Livraison (Uber Eats, Just Eat)
- Réservations (TheFork, OpenTable)
- Paiement (Twint, PostFinance)

### 5. Fiabilité et Support

**Questions cruciales:**
- Support disponible 24/7?
- Temps de réponse moyen?
- Mode hors-ligne disponible?
- Sauvegardes automatiques?

## Les Pièges à Éviter

### ❌ Frais Cachés
Lisez attentivement les contrats. Méfiez-vous de:
- Frais par transaction
- Coûts de sortie
- Modules payants obligatoires

### ❌ Contrats Rigides
Évitez les engagements de 3-5 ans. Optez pour:
- Contrats mensuels
- Période d'essai gratuite
- Possibilité de changer de plan

### ❌ Matériel Propriétaire
Privilégiez les systèmes compatibles avec du matériel standard pour éviter la dépendance.

## Questions à Poser aux Fournisseurs

1. Quel est le temps d'installation? (Chez AyaPos: **48 heures**)
2. Combien de restaurants utilisent votre solution? (AyaPos: **800+ clients**)
3. Proposez-vous une démo gratuite?
4. Quel est le délai de réponse du support?
5. Y a-t-il des frais de sortie?
6. Les mises à jour sont-elles incluses?

## Checklist Finale

Avant de signer:
- ✅ Testez le système pendant au moins 7 jours
- ✅ Formez 2-3 employés pour avoir leur avis
- ✅ Vérifiez les avis clients en ligne
- ✅ Demandez des références clients
- ✅ Comparez au moins 3 solutions
- ✅ Lisez entièrement le contrat

## Pourquoi AyaPos?

- ⚡ Installation en **48h**
- 👥 **800+ restaurants** nous font confiance
- 🇨🇭 Support en français 24/7
- 💰 Prix transparent, pas de frais cachés
- 🔧 Essai gratuit de 30 jours

**Prêt à transformer votre restaurant?** Contactez-nous pour une démo personnalisée.""",
        "author": "Sophie Blanc",
        "date": "2025-01-12",
        "category": "Guides",
        "imageUrl": "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
        "featured": True
    },
    {
        "slug": "augmenter-ventes-restaurant",
        "title": "10 stratégies prouvées pour augmenter les ventes de votre restaurant",
        "excerpt": "Découvrez 10 techniques concrètes et efficaces pour booster votre chiffre d'affaires de 15-30% en 6 mois.",
        "content": """# 10 stratégies prouvées pour augmenter les ventes de votre restaurant

Augmenter les ventes n'est pas une question de chance, mais de stratégie. Voici 10 techniques testées qui fonctionnent vraiment.

## 1. Optimisez votre Menu (Impact: +15%)

Votre menu est votre outil de vente principal.

**Actions concrètes:**
- Limitez à 7-10 plats par catégorie
- Mettez en avant 3-4 plats vedettes
- Utilisez des descriptions appétissantes
- Évitez les symboles de devise (€, CHF)

💡 **Astuce:** Les clients regardent d'abord le coin supérieur droit. Placez-y vos plats les plus rentables.

## 2. Upselling et Cross-selling (+20% par ticket)

Formez votre équipe à suggérer:
- Entrée avec le plat principal
- Dessert après le plat
- Vin ou cocktail adapté

**Script efficace:**
"Pour accompagner votre steak, puis-je vous suggérer notre sauce au poivre maison?"

## 3. Programme de Fidélité (+25% de clients récurrents)

Les clients fidèles dépensent 67% de plus que les nouveaux.

**Idées de récompenses:**
- 10ème café gratuit
- Réduction d'anniversaire
- Points cumulables
- Accès prioritaire

**Outil recommandé:** AyaPos intègre un système de fidélité automatique.

## 4. Click & Collect et Livraison (+30% de revenus)

Ne laissez pas Uber Eats prendre 30% de commission.

**Solution:**
- Système de commande en ligne intégré
- Livraison par votre propre équipe
- Retrait en restaurant

## 5. Happy Hour et Offres Spéciales (+40% aux heures creuses)

Remplissez vos heures creuses:
- 15h-18h: Café + pâtisserie -30%
- Lundi-mardi: Menu du jour réduit
- Weekend: Brunch illimité

## 6. Présence sur les Réseaux Sociaux (+50% de nouveaux clients)

**Stratégie gagnante:**
- Instagram: Photos de plats (3x/semaine)
- Facebook: Événements et promos
- Google My Business: Avis et horaires à jour

**Investissement:** 2-3h/semaine ou CHF 300/mois pour un gestionnaire.

## 7. Partenariats Locaux (+15% de visibilité)

Collaborez avec:
- Hôtels voisins
- Entreprises locales (lunch corporate)
- Offices de tourisme
- Clubs sportifs

## 8. Événements Thématiques (+200% certains soirs)

Créez des événements récurrents:
- Soirée vin mensuelle
- Concert live le vendredi
- Brunch du dimanche
- Menu découverte chef

## 9. Analytics et Data (+10% d'efficacité)

Analysez vos données pour:
- Identifier les plats les plus rentables
- Réduire le gaspillage
- Optimiser les stocks
- Prévoir les affluences

**AyaPos** fournit des rapports détaillés en temps réel.

## 10. Expérience Client Exceptionnelle (×2 le bouche-à-oreille)

Un client satisfait en amène 3 autres.

**Points clés:**
- Temps d'attente < 15 min
- Personnel souriant et formé
- Propreté impeccable
- WiFi gratuit
- Paiement rapide

## Résultats Attendus

En appliquant ces 10 stratégies:

| Période | Augmentation |
|---------|--------------|
| Mois 1-2 | +10-15% |
| Mois 3-4 | +20-25% |
| Mois 5-6 | +25-30% |

## Première Étape

Commencez par **3 actions** cette semaine:
1. Optimisez votre menu
2. Lancez un programme de fidélité
3. Créez vos comptes réseaux sociaux

**Besoin d'aide?** L'équipe AyaPos vous accompagne dans votre transformation digitale.""",
        "author": "Thomas Mercier",
        "date": "2025-01-10",
        "category": "Stratégie",
        "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "featured": False
    },
    {
        "slug": "paiements-sans-contact-guide",
        "title": "Paiements sans contact : Le guide complet 2025",
        "excerpt": "85% des paiements seront sans contact d'ici fin 2025. Tout ce que vous devez savoir sur NFC, QR codes, wallets mobiles.",
        "content": """# Paiements sans contact : Le guide complet pour restaurateurs 2025

Le paiement sans contact n'est plus une option, c'est une nécessité. Voici tout ce que vous devez savoir.

## L'État du Marché

### Chiffres Clés 2025
- **85%** des paiements en Suisse sont sans contact
- **92%** des clients préfèrent payer sans contact
- **40%** plus rapide qu'un paiement par carte classique
- **0%** de fraude comparé aux cartes magnétiques

## Technologies de Paiement Sans Contact

### 1. NFC (Near Field Communication)

La technologie la plus populaire.

**Comment ça marche:**
1. Client approche sa carte/téléphone
2. Paiement validé en < 1 seconde
3. Reçu digital automatique

**Avantages:**
- Ultra rapide
- Sécurisé (tokenisation)
- Compatible avec toutes les cartes récentes
- Limite CHF 80 sans code PIN

### 2. Wallets Mobiles

Apple Pay, Google Pay, Samsung Pay, Twint

**Pourquoi c'est l'avenir:**
- 78% des Suisses ont un smartphone
- Authentification biométrique (Face ID, empreinte)
- Pas de limite de montant
- Fidélisation intégrée

### 3. QR Codes

Idéal pour paiement en table.

**Processus:**
1. Client scanne le QR code
2. Vérifie le montant
3. Valide le paiement
4. Reçu instantané

**Parfait pour:**
- Terrasses
- Food trucks
- Marchés
- Événements

## Avantages pour votre Restaurant

### 1. Service Plus Rapide

**Temps moyen par transaction:**
- Espèces: 45 secondes
- Carte avec PIN: 25 secondes
- Sans contact: **6 secondes**

Sur 100 clients/jour = **Économie de 65 minutes**

### 2. Rotation des Tables Améliorée

Tables libérées plus vite = Plus de couverts par service.

**Impact:**
Restaurant de 30 places:
- Avant: 60 couverts/midi
- Après: 75 couverts/midi (+25%)

### 3. Panier Moyen Augmenté

Les études montrent que les clients dépensent **23% de plus** en payant sans contact.

**Raison:** Moins de friction psychologique qu'avec des espèces.

## Conclusion

Le paiement sans contact n'est pas une option mais une nécessité en 2025. Les restaurants qui ne l'ont pas encore adopté perdent:
- 15% de clients potentiels
- 23% de revenus supplémentaires
- 65 minutes/jour de productivité

**Prêt à faire le saut?** Contactez AyaPos pour une démo gratuite.""",
        "author": "Julie Martin",
        "date": "2025-01-08",
        "category": "Paiements",
        "imageUrl": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "featured": False
    },
    {
        "slug": "erreurs-gestion-stock",
        "title": "Gestion de stock restaurant : 7 erreurs à éviter",
        "excerpt": "Ces erreurs de gestion de stock coûtent en moyenne CHF 15,000/an à un restaurant moyen. Voici comment les éviter.",
        "content": """# Gestion de stock restaurant : 7 erreurs à éviter absolument

La gestion de stock peut faire la différence entre un restaurant rentable et un qui perd de l'argent.

## Erreur #1: Pas d'Inventaire Régulier

### Le Problème
Vous ne savez pas précisément ce que vous avez en stock.

**Conséquences:**
- Sur-commande: CHF 3,000/an gaspillés
- Ruptures de stock: Clients déçus
- Perte de traçabilité
- Vols non détectés (5-8% du stock)

### La Solution
**Inventaire hebdomadaire** des produits frais
**Inventaire mensuel** des produits secs

**Avec AyaPos:**
- Scan de codes-barres
- Comptage assisté
- Écarts automatiques
- Rapports instantanés

**Temps gagné:** 75% (de 4h à 1h/semaine)

## Erreur #2: Méthode FIFO Non Respectée

### Le Problème
First In, First Out non appliqué = Produits périmés.

**Pertes moyennes:**
- Restaurant de 50 places: CHF 8,000/an
- Restaurant de 100 places: CHF 15,000/an

### La Solution
**Rangement stratégique:**
1. Nouveaux produits au fond
2. Anciens produits devant
3. Étiquettes de date visibles
4. Zones de stock clairement identifiées

## Erreur #3: Commandes "Au Feeling"

### Le Problème
Commander sans données = Sur-stock ou ruptures.

### La Solution
**Commandes basées sur les données:**
- Historique des ventes
- Saisonnalité
- Événements locaux
- Météo (impact: +30% par beau temps)

**AyaPos Analytics prédit:**
- Quantités optimales
- Moments de commande
- Fournisseurs les plus rentables

## Conclusion

La gestion de stock n'est pas glamour, mais c'est un levier majeur de rentabilité.

**Les restaurants qui optimisent leur stock:**
- Sont 40% plus rentables
- Ont 60% moins de gaspillage
- Passent 70% moins de temps en gestion

**Prêt à optimiser?** AyaPos propose un audit gratuit de votre gestion de stock.""",
        "author": "Marc Dubois",
        "date": "2025-01-05",
        "category": "Gestion",
        "imageUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        "featured": False
    },
    {
        "slug": "bornes-self-service",
        "title": "Bornes self-service : Pourquoi les installer dans votre restaurant ?",
        "excerpt": "Les bornes de commande automatique augmentent le panier moyen de 30% et réduisent les coûts de personnel. Découvrez pourquoi.",
        "content": """# Pourquoi installer des bornes self-service dans votre restaurant ?

Les bornes de commande automatique ne sont plus réservées aux fast-foods. Découvrez comment elles peuvent transformer votre restaurant.

## La Révolution Self-Service en Chiffres

### Données du Marché 2025
- **67%** des clients préfèrent commander via borne
- **30%** d'augmentation du panier moyen
- **40%** de réduction des temps d'attente
- **15%** de réduction des coûts de personnel

## Les Avantages Concrets

### 1. Augmentation du Panier Moyen (+30%)

**Pourquoi ça marche:**
- Pas de pression sociale
- Temps illimité pour décider
- Suggestions personnalisées
- Visuels appétissants

**Exemple réel:**
Restaurant McDonald's Paris:
- Avant bornes: Panier moyen CHF 8.50
- Après bornes: Panier moyen CHF 11.20
- **Augmentation: +32%**

### 2. Réduction des Erreurs de Commande (-85%)

**Problème classique:**
Client commande → Serveur note → Cuisine prépare
**Points de friction:** 3

**Avec borne:**
Client commande → Cuisine reçoit
**Points de friction:** 0

**Impact:**
- Satisfaction client: +25%
- Retours cuisine: -85%
- Gaspillage: -40%

### 3. Service Plus Rapide

**Temps moyen par client:**
- Caisse traditionnelle: 3-4 minutes
- Borne self-service: 90 secondes
- **Gain: 55%**

**Capacité multipliée:**
1 caisse = 15 clients/heure
2 bornes = 40 clients/heure

## Types de Bornes

### 1. Bornes Sur Pied

**Caractéristiques:**
- Écran tactile 21-27"
- Lecteur de carte intégré
- Imprimante tickets
- Hauteur ajustable

**Idéal pour:**
- Fast-food
- Cafétérias
- Restauration rapide

**Prix:** CHF 3,000-5,000/unité

### 2. Tablettes Murales

**Caractéristiques:**
- iPad Pro 12.9"
- Support mural sécurisé
- Paiement NFC

**Idéal pour:**
- Restaurants avec espace limité
- Food courts
- Bars

**Prix:** CHF 1,500-2,000/unité

## ROI et Rentabilité

### Investissement

**Pour un restaurant de 100 couverts:**
- 3 bornes sur pied: CHF 12,000
- Installation: CHF 1,500
- Formation: CHF 500
- **Total: CHF 14,000**

### Retour sur Investissement

**Gains mensuels:**
| Source | Montant |
|--------|---------|
| Augmentation panier (+30%) | CHF 6,000 |
| Économie personnel | CHF 5,000 |
| Réduction erreurs | CHF 1,000 |
| **TOTAL** | **CHF 12,000** |

**ROI:** Rentabilisé en 14 mois

## Conclusion

Les bornes self-service ne sont plus une option mais une nécessité pour rester compétitif.

**Les bénéfices sont clairs:**
- ✅ +30% de panier moyen
- ✅ -40% de temps d'attente
- ✅ -85% d'erreurs
- ✅ ROI < 14 mois

**Prêt à franchir le pas?**

AyaPos propose:
- Installation en 48h
- Formation incluse
- Support 24/7
- Essai gratuit 30 jours

**Contactez-nous pour une démo dans votre restaurant!**""",
        "author": "Laura Schneider",
        "date": "2025-01-03",
        "category": "Guides",
        "imageUrl": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
        "featured": True
    }
]

async def main():
    """Créer les articles de blog avec contenu complet dans test_database"""
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    print("🗑️  Suppression des anciens articles...")
    await db.blog.delete_many({})
    
    print(f"\n📝 Création de {len(ARTICLES)} articles complets...")
    
    for article in ARTICLES:
        # Convertir la date string en datetime
        article['date'] = datetime.strptime(article['date'], '%Y-%m-%d')
        article['readTime'] = f"{len(article['content'].split()) // 200} min"
        
        await db.blog.insert_one(article)
        status = "⭐" if article['featured'] else "  "
        print(f"{status} {article['title'][:60]}...")
    
    count = await db.blog.count_documents({})
    print(f"\n✅ {count} articles créés avec succès dans test_database!")
    
    # Vérifier les slugs
    articles = await db.blog.find({}, {"slug": 1, "title": 1, "_id": 0}).to_list(100)
    print("\n📋 Articles dans la base:")
    for art in articles:
        print(f"   - /{art['slug']}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(main())

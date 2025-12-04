# 📘 Guide d'Administration AyaPos - Version Complète

## 🔐 Accès au Panneau d'Administration

### Connexion
1. Cliquez sur le bouton **"Login"** en haut à droite du site
2. Ou accédez directement à : `https://votre-site.com/admin/login`
3. Utilisez vos identifiants :
   - **Email** : emrah@ayapos.com
   - **Mot de passe** : Arden2018@

---

## 📊 Sections Disponibles

Le nouveau panneau d'administration inclut **9 sections complètes** :

### 1. 📄 **Contenu Pages**
Gérez le contenu textuel de toutes les pages :
- 🏠 Accueil
- 💰 Tarifs  
- 💳 AyaPay
- 💻 Services IT
- 📧 Contact
- 📄 CGV
- 🔒 Confidentialité
- 🔔 Popup Rappel

### 2. 💰 **Tarifs (Pricing)**
Créez et gérez vos plans de tarification :
- Nom du plan (Basic, Premium, Enterprise)
- Prix, devise (CHF, EUR, USD) et période (mois/an)
- Liste des fonctionnalités incluses/exclues
- Badges personnalisés (Populaire, Recommandé)
- Plan mis en avant
- Images pour chaque plan

### 3. 🏢 **Entreprise (Informations)**
Gérez les informations de votre entreprise :
- Coordonnées (nom, email, téléphone)
- Adresse complète (ville, code postal, pays)
- Slogan et description
- Heures d'ouverture
- Logo et favicon
- Réseaux sociaux (Facebook, LinkedIn, Twitter, Instagram)

### 4. 👥 **Leads & Contacts**
Visualisez et gérez tous vos leads :
- Liste complète des contacts du formulaire
- Liste des demandes de rappel (popup)
- Filtres par statut (nouveau, contacté, converti, archivé)
- Changement de statut en un clic
- Export des données
- Suppression de leads

### 5. 💼 **Services**
Gérez votre catalogue de services :
- Nom et description du service
- Catégorie
- Prix ou "Sur devis"
- Icône et image
- Fonctionnalités incluses
- Statut actif/inactif

### 6. 💬 **Témoignages**
Ajoutez les avis de vos clients :
- Nom et entreprise du client
- Poste/fonction
- Note (1 à 5 étoiles)
- Commentaire
- Photo du client
- Témoignages mis en avant

### 7. 🎨 **Portfolio**
Présentez vos projets réalisés :
- Titre et description du projet
- Catégorie
- Client et date de réalisation
- Images (galerie)
- Technologies utilisées
- Lien vers le projet
- Projets mis en avant

### 8. ❓ **FAQ**
Créez votre base de connaissances :
- Question et réponse
- Catégories (Général, Technique, Tarifs, etc.)
- Ordre d'affichage
- Statut actif/inactif

### 9. ⚙️ **Paramètres**
Configurez le comportement du site :
- **Popup** : activer/désactiver, délai d'apparition
- **Cookies** : bandeau de consentement
- **Maintenance** : mode maintenance du site
- **SEO** : titre, description et mots-clés meta
- **Analytics** : code de suivi (Google Analytics, etc.)

### Édition de Contenu

#### Modifier un Texte
1. Sélectionnez la page dans la barre latérale gauche
2. Trouvez la section que vous souhaitez modifier
3. Modifiez le contenu directement dans le champ de texte
4. Cliquez sur **"Sauvegarder"** pour enregistrer vos modifications

#### Modifier une Image
1. Sélectionnez la page dans la barre latérale
2. Trouvez la section de type "Image"
3. Vous avez deux options :
   - **Option A** : Modifier le chemin de l'image manuellement (ex: `/images/nouvelle-image.jpg`)
   - **Option B** : Cliquer sur **"Télécharger une image"** pour uploader un nouveau fichier
4. Cliquez sur **"Sauvegarder"**

#### Ajouter une Nouvelle Section
1. Cliquez sur **"+ Ajouter Section"** en haut à droite
2. Remplissez les champs :
   - **Label** : Nom de la section (ex: "Nouveau titre", "Description produit")
   - **Type** : Choisissez entre Titre, Texte, Description, ou Image
   - **Contenu** : Entrez le contenu de la section
3. Cliquez sur **"Sauvegarder"**

#### Supprimer une Section
1. Trouvez la section que vous souhaitez supprimer
2. Cliquez sur le bouton **"Supprimer"** à droite de la section
3. Cliquez sur **"Sauvegarder"** pour confirmer

---

## 📸 Gestion des Images

### Upload d'Images
- Formats acceptés : JPG, JPEG, PNG, GIF, WEBP, SVG
- Taille maximale : 5 MB par image
- Les images uploadées sont automatiquement stockées dans `/uploads/`

### Bonnes Pratiques
- Utilisez des images optimisées pour le web
- Préférez des images de moins de 2 MB pour de meilleures performances
- Nommez vos images de manière descriptive avant l'upload

---

## 💡 Conseils d'Utilisation

### Sauvegarde
- **Important** : N'oubliez pas de cliquer sur "Sauvegarder" après chaque modification
- Un message de confirmation vert apparaîtra après une sauvegarde réussie
- Si vous voyez un message rouge, réessayez ou contactez le support

### Organisation
- Organisez vos sections par ordre logique
- Utilisez des labels clairs et descriptifs
- Maintenez une cohérence dans les types de contenu

### Types de Contenu
- **Titre** : Pour les titres principaux (H1, H2)
- **Texte** : Pour les paragraphes courts
- **Description** : Pour les contenus plus longs
- **Image** : Pour les photos et illustrations

---

## 🔓 Déconnexion

Pour vous déconnecter du panneau d'administration :
1. Cliquez sur le bouton **"Déconnexion"** en haut à droite
2. Vous serez redirigé vers la page de connexion

---

## ⚠️ Sécurité

- **Ne partagez jamais vos identifiants** d'administration
- **Déconnectez-vous** toujours après utilisation
- Les sessions expirent automatiquement après 8 heures d'inactivité
- L'accès au panneau est protégé par authentification JWT

---

## 🆘 Support

En cas de problème ou de question :
- Contactez votre développeur
- Ou envoyez un email à : emrah@ayapos.com

---

**Version** : 1.0  
**Dernière mise à jour** : Décembre 2024

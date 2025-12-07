# 📦 Installation Complète AyaPos - AVEC TOUTES LES IMAGES

## ⚠️ IMPORTANT - Lisez ceci d'abord!

Votre site a **3 parties**:
1. ✅ **Code source** (.jsx, .py) → Sur GitHub
2. ✅ **Base de données** (articles, configs) → mongodb_ayapos_backup.tar.gz (45KB)
3. ✅ **Images/Fichiers** (uploads) → frontend/public/uploads/ (38MB)

## 🎯 Solution: Backup COMPLET

J'ai créé **ayapos_complete_backup.tar.gz (38MB)** qui contient TOUT:
- Base de données MongoDB
- Toutes les images uploadées (76 fichiers)
- Scripts de restauration
- Instructions

## 🚀 Installation en Local - Méthode Complète

### Étape 1: Télécharger le code depuis GitHub

```bash
git clone https://github.com/ayapos/ayapos-final.git
cd ayapos-final
```

### Étape 2: Télécharger le backup complet

Téléchargez **ayapos_complete_backup.tar.gz** et placez-le dans le dossier du projet.

### Étape 3: Extraire tout

```bash
tar -xzf ayapos_complete_backup.tar.gz
```

Cela va créer:
- `mongodb_ayapos_backup.tar.gz` (base de données)
- `frontend/public/uploads/` (toutes vos images)
- Scripts de restauration

### Étape 4: Restaurer la base de données

```bash
# Extraire le backup MongoDB
tar -xzf mongodb_ayapos_backup.tar.gz

# Restaurer dans MongoDB (assurez-vous que MongoDB est installé et démarré)
mongorestore --db=test_database mongodb_backup/test_database/ --drop
```

### Étape 5: Vérifier les images

```bash
# Vérifier que les images sont là
ls frontend/public/uploads/
# Vous devriez voir 76+ fichiers d'images
```

### Étape 6: Configuration

**Backend (.env):**
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="ayazemrah87@gmail.com"
EMAIL_PASSWORD="[votre mot de passe app]"
EMAIL_FROM="ayazemrah87@gmail.com"
EMAIL_TO="emrah@ayapos.com"
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL="http://localhost:8001"
```

### Étape 7: Installer les dépendances

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
yarn install
```

### Étape 8: Lancer le site

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

Ouvrez: **http://localhost:3000**

## ✅ Ce qui sera restauré

Avec cette installation COMPLÈTE, vous aurez:

### Code & Structure
- ✅ 74 pages complètes
- ✅ Navigation traduite en 9 langues
- ✅ Logo AYAPOS avec gradient moderne
- ✅ Site responsive (mobile optimisé)

### Contenu Dynamique
- ✅ 6 articles de blog complets (2000-4000 mots chacun)
- ✅ 52 pages de contenu
- ✅ 10 produits/packages
- ✅ Popup promotionnel configuré

### Médias
- ✅ **76 images uploadées** (38MB)
- ✅ Toutes les photos de pages
- ✅ Images carousel
- ✅ Photos produits

### Fonctionnalités
- ✅ Formulaires de contact (emails vers emrah@ayapos.com)
- ✅ Blog fonctionnel
- ✅ Admin panel
- ✅ Multi-langue

## 📊 Statistiques du Backup

```
Base de données: 45KB (186 documents)
Images:          38MB (76 fichiers)
Total:           ~38MB
```

## 🔧 Dépannage

### "Il manque des images"
→ Vérifiez que le dossier `frontend/public/uploads/` contient bien 76+ fichiers

### "Les articles de blog sont vides"
→ La base de données n'a pas été restaurée correctement
→ Réexécutez `mongorestore --db=test_database mongodb_backup/test_database/ --drop`

### "L'ancienne version s'affiche"
→ Vous avez oublié de restaurer soit la DB, soit les images

### "Cannot connect to MongoDB"
→ MongoDB n'est pas installé ou pas démarré
→ Windows: Démarrez le service "MongoDB"
→ Mac: `brew services start mongodb-community`
→ Linux: `sudo systemctl start mongod`

## 📝 Checklist Finale

Avant de dire "Ça marche pas":

- [ ] Code téléchargé depuis GitHub
- [ ] Backup complet téléchargé et extrait
- [ ] MongoDB installé et démarré
- [ ] Base de données restaurée (`mongorestore`)
- [ ] Images extraites dans `frontend/public/uploads/`
- [ ] Fichiers .env configurés
- [ ] Dépendances installées (pip + yarn)
- [ ] Backend démarré sur port 8001
- [ ] Frontend démarré sur port 3000

## 🎉 Test Final

Si tout est OK, vous devriez avoir:

1. **Page d'accueil:** Logo gradient + 4 sections modernes
2. **Blog:** 6 articles complets qui s'ouvrent
3. **Images:** Toutes les photos s'affichent
4. **Multi-langue:** Changement de langue fonctionne
5. **Admin:** Connexion avec emrah@ayapos.com

---

**Pour toute question:** emrah@ayapos.com

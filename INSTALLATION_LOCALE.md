# 📦 Installation Locale AyaPos

Ce guide vous explique comment installer votre site AyaPos en local avec TOUTES vos données.

## ⚠️ IMPORTANT

Votre site a **DEUX parties**:
1. **Le code source** (fichiers .jsx, .py, etc.) → Sur GitHub
2. **La base de données MongoDB** (articles, images, contenus) → Fichier séparé

## 🚀 Installation Complète

### Étape 1: Télécharger le code depuis GitHub

```bash
git clone https://github.com/ayapos/ayapos-final.git
cd ayapos-final
```

### Étape 2: Installer les dépendances

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

### Étape 3: Restaurer la base de données MongoDB

**IMPORTANT:** Vous devez avoir MongoDB installé localement!

```bash
# Décompresser le backup
tar -xzf mongodb_ayapos_backup.tar.gz

# Restaurer dans MongoDB
mongorestore --db=test_database mongodb_backup/test_database/
```

### Étape 4: Configuration (.env)

**Backend (.env):**
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="ayazemrah87@gmail.com"
EMAIL_PASSWORD="[votre mot de passe]"
EMAIL_FROM="ayazemrah87@gmail.com"
EMAIL_TO="emrah@ayapos.com"
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL="http://localhost:8001"
```

### Étape 5: Lancer le site

**Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend:**
```bash
cd frontend
yarn start
```

Le site sera accessible sur: **http://localhost:3000**

## ✅ Ce qui sera restauré

Avec cette installation complète, vous aurez:
- ✅ Logo AYAPOS avec gradient
- ✅ Navigation traduite en 9 langues
- ✅ 6 articles de blog complets
- ✅ Page d'accueil avec 4 sections professionnelles
- ✅ Site optimisé pour mobile
- ✅ 74 pages complètes
- ✅ Tous les contenus dynamiques
- ✅ Toutes les images uploadées
- ✅ Popup promotionnel configuré
- ✅ Formulaires de contact fonctionnels

## 📝 Notes

- La base de données contient **186 documents** au total
- Collections principales: blog (6 articles), content (52 pages), products (10), uploads (76)
- Le fichier de backup fait ~45KB compressé

## 🆘 Problèmes courants

**Le site affiche l'ancienne version:**
→ Vous avez oublié de restaurer la base de données MongoDB

**"Cannot connect to MongoDB":**
→ MongoDB n'est pas installé ou pas démarré localement

**Les images ne s'affichent pas:**
→ Vérifiez que la collection "uploads" a bien été restaurée

## 📞 Support

Pour toute question: emrah@ayapos.com

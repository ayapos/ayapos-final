#!/bin/bash

echo "📦 Export de la base de données AyaPos..."

# Vérifier MongoDB
if ! command -v mongodump &> /dev/null; then
    echo "❌ mongodump n'est pas installé!"
    exit 1
fi

# Créer le backup
echo "💾 Création du backup..."
mongodump --db=test_database --out=./mongodb_backup

# Compresser
echo "🗜️  Compression..."
tar -czf mongodb_ayapos_backup.tar.gz mongodb_backup/

# Nettoyer
rm -rf mongodb_backup/

# Résultat
SIZE=$(du -h mongodb_ayapos_backup.tar.gz | cut -f1)
echo ""
echo "✅ Backup créé: mongodb_ayapos_backup.tar.gz ($SIZE)"
echo ""
echo "📋 Contenu:"
tar -tzf mongodb_ayapos_backup.tar.gz | grep "\.bson$" | wc -l | xargs echo "  Collections:"
echo ""
echo "💡 Vous pouvez maintenant:"
echo "  1. Commiter ce fichier sur GitHub"
echo "  2. Le partager avec votre équipe"
echo "  3. L'utiliser pour restaurer ailleurs"

#!/bin/bash

echo "🔄 Restauration de la base de données AyaPos..."
echo ""

# Vérifier si MongoDB est installé
if ! command -v mongorestore &> /dev/null; then
    echo "❌ MongoDB n'est pas installé!"
    echo "Installez MongoDB: https://www.mongodb.com/try/download/community"
    exit 1
fi

# Vérifier si le fichier backup existe
if [ ! -f "mongodb_ayapos_backup.tar.gz" ]; then
    echo "❌ Fichier mongodb_ayapos_backup.tar.gz introuvable!"
    echo "Assurez-vous que le fichier est dans le même dossier que ce script."
    exit 1
fi

# Décompresser
echo "📦 Décompression du backup..."
tar -xzf mongodb_ayapos_backup.tar.gz

# Restaurer
echo "💾 Restauration dans MongoDB..."
mongorestore --db=test_database mongodb_backup/test_database/ --drop

# Vérifier
echo ""
echo "✅ Restauration terminée!"
echo ""
echo "📊 Vérification:"
mongo test_database --quiet --eval "
  print('Collections restaurées:');
  db.getCollectionNames().forEach(function(col) {
    print('  - ' + col + ': ' + db[col].count() + ' documents');
  });
"

echo ""
echo "🎉 Votre base de données est prête!"
echo "Vous pouvez maintenant lancer votre site."

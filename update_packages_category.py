#!/usr/bin/env python3
"""
Script pour mettre à jour la catégorie des forfaits en "package"
"""
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# IDs des produits à convertir en packages
package_ids = ['ayapay-starter', 'ayapay-business', 'ayapay-enterprise', 'pos-premium']

print("🔄 Mise à jour des catégories en 'package'...")

for pid in package_ids:
    result = db.products.update_one(
        {"id": pid},
        {
            "$set": {
                "category": "package",
                "currency": "CHF",
                "highlighted": pid == 'ayapay-business',
                "featured": pid in ['ayapay-business', 'pos-premium']
            }
        }
    )
    if result.modified_count > 0:
        print(f"✅ {pid} → catégorie 'package'")
    else:
        print(f"⚠️ {pid} non trouvé ou déjà à jour")

print("\n🎉 Mise à jour terminée!")
print("\nVérification:")
packages = list(db.products.find({"category": "package"}, {"_id": 0, "id": 1, "name": 1, "price": 1, "featured": 1}))
print(f"Nombre de packages: {len(packages)}")
for pkg in packages:
    featured = "⭐" if pkg.get('featured') else ""
    print(f"  {featured} {pkg['name']} - CHF {pkg['price']}/mois")

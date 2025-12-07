#!/usr/bin/env python3
"""
Script pour tester les types de prix
"""
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# Mettre à jour Desk POS Q80 en prix unique
result = db.products.update_one(
    {"id": "pos-desk-q80"},
    {
        "$set": {
            "priceType": "one-time",
            "billingPeriod": "one-time",
            "price": 899,
            "currency": "CHF"
        }
    }
)

if result.modified_count > 0:
    print("✅ Desk POS Q80 → Prix unique (CHF 899)")
else:
    print("⚠️ Produit non trouvé ou déjà à jour")

# Mettre à jour SmartPOS A77 en abonnement annuel
result = db.products.update_one(
    {"id": "pos-smartpos-a77"},
    {
        "$set": {
            "priceType": "subscription",
            "billingPeriod": "yearly",
            "price": 500,
            "currency": "CHF"
        }
    }
)

if result.modified_count > 0:
    print("✅ SmartPOS A77 → Abonnement annuel (CHF 500/an)")
else:
    print("⚠️ Produit non trouvé ou déjà à jour")

print("\n🎉 Tests terminés!")
print("\nVérification:")
products = list(db.products.find(
    {"id": {"$in": ["pos-desk-q80", "pos-smartpos-a77"]}},
    {"_id": 0, "id": 1, "name": 1, "price": 1, "priceType": 1, "billingPeriod": 1, "currency": 1}
))
for p in products:
    price_display = f"{p.get('currency', 'CHF')} {p['price']}"
    if p.get('priceType') == 'one-time':
        price_display += " (unique)"
    else:
        period = 'an' if p.get('billingPeriod') == 'yearly' else 'mois'
        price_display += f"/{period}"
    print(f"  {p['name']}: {price_display}")

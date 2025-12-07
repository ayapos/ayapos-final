#!/usr/bin/env python3
import os
from pymongo import MongoClient

MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['test_database']

# Prix unique pour Desk POS Q80
result = db.products.update_one(
    {"id": "terminal-q80"},
    {"$set": {"priceType": "one-time", "billingPeriod": "one-time", "price": 899, "currency": "CHF"}}
)
print(f"✅ Desk POS Q80 → Prix unique: {result.modified_count} modifié")

# Abonnement annuel pour SmartPOS A77
result = db.products.update_one(
    {"id": "terminal-a77"},
    {"$set": {"priceType": "subscription", "billingPeriod": "yearly", "price": 600, "currency": "CHF"}}
)
print(f"✅ SmartPOS A77 → Abonnement annuel: {result.modified_count} modifié")

# Abonnement mensuel pour Starter (déjà par défaut)
result = db.products.update_one(
    {"id": "ayapay-starter"},
    {"$set": {"priceType": "subscription", "billingPeriod": "monthly", "currency": "CHF"}}
)
print(f"✅ Starter → Abonnement mensuel: {result.modified_count} modifié")

print("\n🎉 Terminé!")

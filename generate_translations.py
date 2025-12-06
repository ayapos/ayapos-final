#!/usr/bin/env python3
"""
Script pour générer les traductions complètes pour toutes les langues
à partir du fichier français (source de vérité)
"""
import json
import os

# Charger le fichier français (source)
with open('/app/frontend/src/i18n/locales/fr.json', 'r', encoding='utf-8') as f:
    fr_data = json.load(f)

# Dictionnaire de traductions manuelles pour les clés principales
translations = {
    'en': {
        # Navigation
        "Accueil": "Home",
        "Systèmes POS": "POS Systems",
        "Solutions Digitales": "Digital Solutions",
        "AyaPay": "AyaPay",
        "Tarifs": "Pricing",
        "À propos": "About",
        "Contact": "Contact",
        "Demander une démo": "Request a demo",
        
        # Hero
        "Solutions POS et Paiement Nouvelle Génération": "Next Generation POS and Payment Solutions",
        "Restaurants, cafés, hôtels, marchés et chaînes d'entreprises - Systèmes POS innovants avec terminaux de paiement intégrés": "Restaurants, cafes, hotels, markets and chain businesses - Innovative POS systems with integrated payment terminals",
        "Découvrir nos solutions": "Discover our solutions",
        "Voir les tarifs": "View pricing",
        
        # Features
        "Tout ce dont vous avez besoin pour réussir": "Everything you need to succeed",
        "Système POS Complet": "Complete POS System",
        "Gérez vos ventes, stocks, et rapports en temps réel depuis n'importe où": "Manage your sales, inventory, and reports in real-time from anywhere",
        "Terminaux de Paiement": "Payment Terminals",
        "Solutions de paiement sécurisées et rapides pour tous types de transactions": "Secure and fast payment solutions for all types of transactions",
        "Menus Digitaux": "Digital Menus",
        "QR codes, tablettes et kiosques pour une expérience client moderne": "QR codes, tablets and kiosks for a modern customer experience",
        "Rapports & Analytics": "Reports & Analytics",
        "Suivez vos performances avec des tableaux de bord intuitifs": "Track your performance with intuitive dashboards",
        
        # POS
        "Systèmes POS Professionnels": "Professional POS Systems",
        "Choisissez la solution POS adaptée à votre entreprise": "Choose the POS solution adapted to your business",
        "Premium POS": "Premium POS",
        "Contrôle total, puissance maximale": "Total control, maximum power",
        "Pour les chaînes de restaurants, centres commerciaux et entreprises à fort volume": "For restaurant chains, shopping centers and high-volume businesses",
        "par mois": "per month",
        "Tablet POS": "Tablet POS",
        "Compact et économique": "Compact and economical",
        "Pour les petits restaurants, chaînes de cafés et pâtisseries boutiques": "For small restaurants, cafe chains and boutique bakeries",
        "Web POS": "Web POS",
        "Démarrage rapide, votre propre appareil": "Quick start, your own device",
        "Pour les nouvelles entreprises, cafés et kiosques": "For new businesses, cafes and kiosks",
        "Mobile POS": "Mobile POS",
        "Mobile et portable": "Mobile and portable",
        "Pour les ventes sur le terrain, vendeurs ambulants et événements": "For field sales, street vendors and events",
    },
    'de': {
        # Navigation
        "Accueil": "Startseite",
        "Systèmes POS": "Kassensysteme",
        "Solutions Digitales": "Digitale Lösungen",
        "AyaPay": "AyaPay",
        "Tarifs": "Preise",
        "À propos": "Über uns",
        "Contact": "Kontakt",
        "Demander une démo": "Demo anfordern",
        
        # Hero
        "Solutions POS et Paiement Nouvelle Génération": "Kassensysteme und Zahlungslösungen der neuen Generation",
        "Restaurants, cafés, hôtels, marchés et chaînes d'entreprises - Systèmes POS innovants avec terminaux de paiement intégrés": "Restaurants, Cafés, Hotels, Märkte und Unternehmensketten - Innovative Kassensysteme mit integrierten Zahlungsterminals",
        "Découvrir nos solutions": "Unsere Lösungen entdecken",
        "Voir les tarifs": "Preise ansehen",
        
        # Common translations
        "par mois": "pro Monat",
        "Mensuel": "Monatlich",
        "Annuel": "Jährlich",
    },
    'it': {
        # Navigation
        "Accueil": "Home",
        "Systèmes POS": "Sistemi POS",
        "Solutions Digitales": "Soluzioni Digitali",
        "AyaPay": "AyaPay",
        "Tarifs": "Prezzi",
        "À propos": "Chi siamo",
        "Contact": "Contatto",
        "Demander une démo": "Richiedi una demo",
        
        # Common
        "par mois": "al mese",
        "Mensuel": "Mensile",
        "Annuel": "Annuale",
    },
    'es': {
        # Navigation
        "Accueil": "Inicio",
        "Systèmes POS": "Sistemas POS",
        "Solutions Digitales": "Soluciones Digitales",
        "AyaPay": "AyaPay",
        "Tarifs": "Precios",
        "À propos": "Acerca de",
        "Contact": "Contacto",
        "Demander une démo": "Solicitar una demo",
        
        # Common
        "par mois": "por mes",
        "Mensuel": "Mensual",
        "Annuel": "Anual",
    },
    'tr': {
        # Navigation
        "Accueil": "Ana Sayfa",
        "Systèmes POS": "POS Sistemleri",
        "Solutions Digitales": "Dijital Çözümler",
        "AyaPay": "AyaPay",
        "Tarifs": "Fiyatlar",
        "À propos": "Hakkımızda",
        "Contact": "İletişim",
        "Demander une démo": "Demo talep edin",
        
        # Common
        "par mois": "ayda",
        "Mensuel": "Aylık",
        "Annuel": "Yıllık",
    },
    'ar': {
        # Navigation
        "Accueil": "الرئيسية",
        "Systèmes POS": "أنظمة نقاط البيع",
        "Solutions Digitales": "الحلول الرقمية",
        "AyaPay": "آيا باي",
        "Tarifs": "الأسعار",
        "À propos": "عن",
        "Contact": "اتصال",
        "Demander une démo": "اطلب عرضًا توضيحيًا",
        
        # Common
        "par mois": "شهريا",
        "Mensuel": "شهريا",
        "Annuel": "سنوي",
    },
    'sr': {
        # Navigation
        "Accueil": "Početna",
        "Systèmes POS": "POS sistemi",
        "Solutions Digitales": "Digitalna rešenja",
        "AyaPay": "AyaPay",
        "Tarifs": "Cene",
        "À propos": "O nama",
        "Contact": "Kontakt",
        "Demander une démo": "Zatražite demo",
        
        # Common
        "par mois": "mesečno",
        "Mensuel": "Mesečno",
        "Annuel": "Godišnje",
    },
    'sq': {
        # Navigation
        "Accueil": "Ballina",
        "Systèmes POS": "Sistemet POS",
        "Solutions Digitales": "Zgjidhje Dixhitale",
        "AyaPay": "AyaPay",
        "Tarifs": "Çmimet",
        "À propos": "Rreth",
        "Contact": "Kontakt",
        "Demander une démo": "Kërko një demo",
        
        # Common
        "par mois": "në muaj",
        "Mensuel": "Mujore",
        "Annuel": "Vjetore",
    }
}

def translate_value(value, lang, translations_dict):
    """Translate a value using the translation dictionary"""
    if isinstance(value, str):
        # Check if we have a direct translation
        if lang in translations_dict and value in translations_dict[lang]:
            return translations_dict[lang][value]
        # Return original if no translation (will need manual translation later)
        return value
    elif isinstance(value, dict):
        return {k: translate_value(v, lang, translations_dict) for k, v in value.items()}
    elif isinstance(value, list):
        return [translate_value(item, lang, translations_dict) for item in value]
    else:
        return value

# Note: Ce script fournit une structure de base
# Pour une traduction complète professionnelle, il faudrait un service de traduction API
print("⚠️  ATTENTION: Ce script crée une structure de base.")
print("Pour des traductions complètes, utilisez un service professionnel de traduction.")
print()
print("Nombre de clés traduites par langue:")
for lang in ['en', 'de', 'it', 'es', 'tr', 'ar', 'sr', 'sq']:
    if lang in translations:
        print(f"  {lang}: {len(translations[lang])} clés")

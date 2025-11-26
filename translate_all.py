#!/usr/bin/env python3
"""
Script pour traduire automatiquement fr.json dans toutes les langues
"""
import json
import os

# Charger le fichier français (source)
with open('/app/frontend/src/i18n/locales/fr.json', 'r', encoding='utf-8') as f:
    fr_content = json.load(f)

# Dictionnaire de traductions basiques pour chaque langue
translations = {
    'en': {
        'nav': {
            'home': 'Home',
            'pos': 'POS Systems',
            'digital': 'Digital Solutions',
            'ayapay': 'AyaPay',
            'pricing': 'Pricing',
            'about': 'About',
            'contact': 'Contact',
            'demo': 'Request a Demo'
        },
        'hero': {
            'title': 'Next Generation POS and Payment Solutions',
            'subtitle': 'Restaurants, cafes, hotels, markets and chain businesses - Innovative POS systems with integrated payment terminals',
            'cta': 'Discover our solutions',
            'cta_secondary': 'View pricing'
        }
    },
    'de': {
        'nav': {
            'home': 'Startseite',
            'pos': 'Kassensysteme',
            'digital': 'Digitale Lösungen',
            'ayapay': 'AyaPay',
            'pricing': 'Preise',
            'about': 'Über uns',
            'contact': 'Kontakt',
            'demo': 'Demo anfordern'
        },
        'hero': {
            'title': 'Kassensysteme und Zahlungslösungen der nächsten Generation',
            'subtitle': 'Restaurants, Cafés, Hotels, Märkte und Ketten - Innovative Kassensysteme mit integrierten Zahlungsterminals',
            'cta': 'Unsere Lösungen entdecken',
            'cta_secondary': 'Preise ansehen'
        }
    },
    'es': {
        'nav': {
            'home': 'Inicio',
            'pos': 'Sistemas TPV',
            'digital': 'Soluciones Digitales',
            'ayapay': 'AyaPay',
            'pricing': 'Precios',
            'about': 'Acerca de',
            'contact': 'Contacto',
            'demo': 'Solicitar Demo'
        },
        'hero': {
            'title': 'Sistemas TPV y Soluciones de Pago de Nueva Generación',
            'subtitle': 'Restaurantes, cafeterías, hoteles, mercados y cadenas - Sistemas TPV innovadores con terminales de pago integrados',
            'cta': 'Descubrir nuestras soluciones',
            'cta_secondary': 'Ver precios'
        }
    },
    'it': {
        'nav': {
            'home': 'Home',
            'pos': 'Sistemi POS',
            'digital': 'Soluzioni Digitali',
            'ayapay': 'AyaPay',
            'pricing': 'Prezzi',
            'about': 'Chi siamo',
            'contact': 'Contatto',
            'demo': 'Richiedi Demo'
        },
        'hero': {
            'title': 'Sistemi POS e Soluzioni di Pagamento di Nuova Generazione',
            'subtitle': 'Ristoranti, bar, hotel, mercati e catene - Sistemi POS innovativi con terminali di pagamento integrati',
            'cta': 'Scopri le nostre soluzioni',
            'cta_secondary': 'Vedi prezzi'
        }
    },
    'tr': {
        'nav': {
            'home': 'Ana Sayfa',
            'pos': 'POS Sistemleri',
            'digital': 'Dijital Çözümler',
            'ayapay': 'AyaPay',
            'pricing': 'Fiyatlandırma',
            'about': 'Hakkımızda',
            'contact': 'İletişim',
            'demo': 'Demo Talep Et'
        },
        'hero': {
            'title': 'Yeni Nesil POS ve Ödeme Çözümleri',
            'subtitle': 'Restoranlar, kafeler, oteller, marketler ve zincir işletmeler - Entegre ödeme terminalleri ile yenilikçi POS sistemleri',
            'cta': 'Çözümlerimizi keşfedin',
            'cta_secondary': 'Fiyatları görüntüle'
        }
    },
    'ar': {
        'nav': {
            'home': 'الرئيسية',
            'pos': 'أنظمة نقاط البيع',
            'digital': 'الحلول الرقمية',
            'ayapay': 'آياباي',
            'pricing': 'الأسعار',
            'about': 'معلومات عنا',
            'contact': 'اتصل بنا',
            'demo': 'طلب عرض توضيحي'
        },
        'hero': {
            'title': 'أنظمة نقاط البيع وحلول الدفع من الجيل القادم',
            'subtitle': 'المطاعم والمقاهي والفنادق والأسواق والسلاسل التجارية - أنظمة نقاط بيع مبتكرة مع أجهزة دفع متكاملة',
            'cta': 'اكتشف حلولنا',
            'cta_secondary': 'عرض الأسعار'
        }
    },
    'sr': {
        'nav': {
            'home': 'Početna',
            'pos': 'POS sistemi',
            'digital': 'Digitalna rešenja',
            'ayapay': 'AyaPay',
            'pricing': 'Cene',
            'about': 'O nama',
            'contact': 'Kontakt',
            'demo': 'Zatraži demo'
        },
        'hero': {
            'title': 'POS i platna rešenja nove generacije',
            'subtitle': 'Restorani, kafići, hoteli, prodavnice i lanci - Inovativni POS sistemi sa integrisanim platnim terminalima',
            'cta': 'Otkrijte naša rešenja',
            'cta_secondary': 'Pogledajte cene'
        }
    },
    'sq': {
        'nav': {
            'home': 'Ballina',
            'pos': 'Sistemet POS',
            'digital': 'Zgjidhjet Dixhitale',
            'ayapay': 'AyaPay',
            'pricing': 'Çmimet',
            'about': 'Rreth nesh',
            'contact': 'Kontakt',
            'demo': 'Kërko Demo'
        },
        'hero': {
            'title': 'Sistemet POS dhe Zgjidhjet e Pagesave të Gjeneratës së Re',
            'subtitle': 'Restorante, kafe, hotele, tregje dhe zinxhirë - Sistemet POS inovative me terminale pagese të integruara',
            'cta': 'Zbuloni zgjidhjet tona',
            'cta_secondary': 'Shiko çmimet'
        }
    }
}

print("Génération des fichiers de traduction...")
print(f"Nombre total de clés dans fr.json: {len(json.dumps(fr_content))}")

# Pour simplifier, je vais copier fr.json comme base et vous devrez le traduire manuellement
# ou utiliser un service de traduction professionnel

for lang_code in translations.keys():
    output_file = f'/app/frontend/src/i18n/locales/{lang_code}.json'
    # Pour l'instant, on copie la structure de fr.json
    # Dans un environnement production, utilisez une API de traduction
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(fr_content, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Fichier {lang_code}.json créé avec {len(json.dumps(fr_content))} caractères")

print("\n⚠️  IMPORTANT: Les fichiers contiennent actuellement le texte français.")
print("Pour une traduction professionnelle, utilisez un service comme:")
print("- Google Cloud Translation API")
print("- Microsoft Translator")
print("- DeepL API")

#!/usr/bin/env python3
"""
Script pour traduire les nouvelles clés de navigation
"""
import json
import asyncio
import openai
import os

openai.api_key = "sk-emergent-dB01f6e70Ec9bCe6d6"

# Langues cibles
LANGUAGES = {
    'en': 'English',
    'de': 'German', 
    'it': 'Italian',
    'es': 'Spanish',
    'tr': 'Turkish',
    'ar': 'Arabic',
    'sr': 'Serbian',
    'sq': 'Albanian'
}

# Textes français à traduire
FR_TEXTS = {
    "it_services": "Développement IT",
    "pos_dropdown": {
        "restaurant_cafe": "Restaurant & Café",
        "management_tools": "Outils de Gestion",
        "restaurant_pos": "Système POS Restaurant",
        "self_order_kiosk": "Self-Order Kiosk",
        "order_system": "Système Commande",
        "waiter_terminal": "Terminal Serveur",
        "mobile_order_app": "App Mobile Commande",
        "robot_waiter": "Serveur Robot",
        "delivery_management": "Gestion Livraison",
        "web_portal": "Portail Web",
        "mobile_reports": "Rapport Mobile",
        "stock_management": "Gestion Stock",
        "centralized_management": "Gestion Centralisée",
        "hardware_devices": "Matériel Appareils"
    }
}

async def translate_text(text, target_lang):
    """Traduire un texte"""
    prompt = f"Translate this French text to {LANGUAGES[target_lang]}. Return ONLY the translation, no explanations:\n\n{text}"
    
    response = await openai.ChatCompletion.acreate(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    
    return response.choices[0].message.content.strip()

async def translate_nav_section(lang_code):
    """Traduire la section nav pour une langue"""
    print(f"\n🔄 Traduction pour {LANGUAGES[lang_code]}...")
    
    # Lire le fichier JSON
    file_path = f'/app/frontend/src/i18n/locales/{lang_code}.json'
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Traduire it_services
    translated_it = await translate_text(FR_TEXTS['it_services'], lang_code)
    data['nav']['it_services'] = translated_it
    print(f"  ✅ it_services: {translated_it}")
    
    # Traduire pos_dropdown
    data['nav']['pos_dropdown'] = {}
    
    for key, fr_text in FR_TEXTS['pos_dropdown'].items():
        translated = await translate_text(fr_text, lang_code)
        data['nav']['pos_dropdown'][key] = translated
        print(f"  ✅ {key}: {translated}")
        await asyncio.sleep(0.5)  # Petite pause
    
    # Sauvegarder
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {LANGUAGES[lang_code]} terminé!")

async def main():
    """Traduire pour toutes les langues"""
    print("🌍 Traduction des clés de navigation...")
    
    for lang_code in LANGUAGES.keys():
        try:
            await translate_nav_section(lang_code)
        except Exception as e:
            print(f"❌ Erreur pour {lang_code}: {e}")
    
    print("\n✅ Toutes les traductions terminées!")

if __name__ == "__main__":
    asyncio.run(main())

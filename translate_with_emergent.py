#!/usr/bin/env python3
"""
Script de traduction automatique utilisant emergentintegrations
"""
import json
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Configuration
EMERGENT_LLM_KEY = "sk-emergent-dB01f6e70Ec9bCe6d6"

# Langues à traduire
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

async def translate_section(chat, section_data, target_lang_name):
    """Traduire une section vers une langue cible"""
    json_str = json.dumps(section_data, ensure_ascii=False, indent=2)
    
    prompt = f"""Translate this JSON from French to {target_lang_name}.
Rules:
- Keep EXACT same structure and keys
- Only translate string values
- Preserve HTML tags and special characters
- Professional business tone
- Output ONLY valid JSON

JSON to translate:
{json_str}"""

    message = UserMessage(text=prompt)
    response = await chat.send_message(message)
    
    # Nettoyer la réponse
    text = response.strip()
    if text.startswith('```json'):
        text = text[7:]
    if text.startswith('```'):
        text = text[3:]
    if text.endswith('```'):
        text = text[:-3]
    
    return json.loads(text.strip())

async def translate_language(source_file, lang_code, lang_name):
    """Traduire vers une langue"""
    print(f"\n{'='*60}")
    print(f"🌍 {lang_name} ({lang_code})")
    print(f"{'='*60}")
    
    # Charger source
    with open(source_file, 'r', encoding='utf-8') as f:
        fr_data = json.load(f)
    
    # Créer chat session
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"translate-{lang_code}",
        system_message="You are a professional translator. Translate JSON files preserving structure."
    ).with_model("openai", "gpt-4o-mini")
    
    # Diviser en sections de 3 clés
    items = list(fr_data.items())
    translated = {}
    
    for i in range(0, len(items), 3):
        section = dict(items[i:i+3])
        section_num = (i // 3) + 1
        total_sections = (len(items) + 2) // 3
        
        print(f"  [{section_num}/{total_sections}] ", end='', flush=True)
        
        try:
            result = await translate_section(chat, section, lang_name)
            translated.update(result)
            print(f"✅")
        except Exception as e:
            print(f"❌ {str(e)[:50]}")
            # Garder l'original en cas d'erreur
            translated.update(section)
    
    # Sauvegarder
    output = f"/app/frontend/src/i18n/locales/{lang_code}.json"
    with open(output, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)
    
    lines = len(open(output).readlines())
    print(f"✅ {lang_code}.json ({lines} lignes)")
    
    return lines

async def main():
    """Fonction principale"""
    source = "/app/frontend/src/i18n/locales/fr.json"
    
    print("🚀 Traduction automatique avec Emergent LLM")
    print(f"📄 Source: {source}\n")
    
    total = 0
    for code, name in LANGUAGES.items():
        try:
            lines = await translate_language(source, code, name)
            total += lines
        except Exception as e:
            print(f"❌ Erreur {name}: {e}")
    
    print(f"\n{'='*60}")
    print(f"🎉 TERMINÉ!")
    print(f"📊 {len(LANGUAGES)} langues")
    print(f"📝 ~{total} lignes")
    print(f"{'='*60}")

if __name__ == "__main__":
    asyncio.run(main())

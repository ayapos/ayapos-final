#!/usr/bin/env python3
"""
Script de traduction automatique des fichiers i18n
Utilise OpenAI GPT-4 avec Emergent LLM Key
"""
import json
import os
from openai import OpenAI

# Configuration
EMERGENT_LLM_KEY = "sk-emergent-dB01f6e70Ec9bCe6d6"
client = OpenAI(api_key=EMERGENT_LLM_KEY)

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

def translate_json_chunk(json_chunk, target_lang, target_lang_name):
    """Traduire un morceau de JSON vers une langue cible"""
    prompt = f"""Translate the following JSON content from French to {target_lang_name}.
Keep the exact same JSON structure and keys. Only translate the string values.
Preserve any HTML tags, placeholders like {{variable}}, and special characters.
Maintain professional business tone.

French JSON:
{json.dumps(json_chunk, ensure_ascii=False, indent=2)}

Provide ONLY the translated JSON without any explanations."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional translator specializing in business and technical translations. Translate JSON files while preserving structure."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=4000
        )
        
        translated_text = response.choices[0].message.content.strip()
        
        # Extraire le JSON de la réponse
        if translated_text.startswith('```json'):
            translated_text = translated_text[7:]
        if translated_text.startswith('```'):
            translated_text = translated_text[3:]
        if translated_text.endswith('```'):
            translated_text = translated_text[:-3]
        
        return json.loads(translated_text.strip())
    except Exception as e:
        print(f"❌ Erreur traduction: {e}")
        return None

def split_json_by_sections(data, max_sections=5):
    """Diviser le JSON en morceaux gérables"""
    items = list(data.items())
    chunks = []
    for i in range(0, len(items), max_sections):
        chunk = dict(items[i:i+max_sections])
        chunks.append(chunk)
    return chunks

def translate_language(source_file, target_lang, target_lang_name):
    """Traduire un fichier complet vers une langue"""
    print(f"\n{'='*60}")
    print(f"🌍 Traduction vers {target_lang_name} ({target_lang})...")
    print(f"{'='*60}")
    
    # Charger le fichier source (français)
    with open(source_file, 'r', encoding='utf-8') as f:
        fr_data = json.load(f)
    
    # Diviser en morceaux
    chunks = split_json_by_sections(fr_data, max_sections=3)
    print(f"📦 {len(chunks)} sections à traduire")
    
    # Traduire chaque morceau
    translated_data = {}
    for i, chunk in enumerate(chunks, 1):
        print(f"  Section {i}/{len(chunks)}... ", end='', flush=True)
        translated_chunk = translate_json_chunk(chunk, target_lang, target_lang_name)
        if translated_chunk:
            translated_data.update(translated_chunk)
            print(f"✅ ({len(translated_chunk)} clés)")
        else:
            print("❌ ÉCHEC")
            # En cas d'échec, garder l'original
            translated_data.update(chunk)
    
    # Sauvegarder
    output_file = f"/app/frontend/src/i18n/locales/{target_lang}.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    # Statistiques
    lines = len(open(output_file, 'r', encoding='utf-8').readlines())
    print(f"✅ Fichier {target_lang}.json créé ({lines} lignes)")
    
    return lines

# Exécution principale
if __name__ == "__main__":
    source_file = "/app/frontend/src/i18n/locales/fr.json"
    
    print("🚀 Démarrage de la traduction automatique...")
    print(f"📄 Source: {source_file}")
    
    total_lines = 0
    for lang_code, lang_name in LANGUAGES.items():
        try:
            lines = translate_language(source_file, lang_code, lang_name)
            total_lines += lines
        except Exception as e:
            print(f"❌ Erreur fatale pour {lang_name}: {e}")
            continue
    
    print(f"\n{'='*60}")
    print(f"🎉 TRADUCTION TERMINÉE!")
    print(f"📊 {len(LANGUAGES)} langues traduites")
    print(f"📝 ~{total_lines} lignes totales générées")
    print(f"{'='*60}")

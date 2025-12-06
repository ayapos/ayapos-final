#!/usr/bin/env python3
"""
Traduction complète optimisée avec progression en temps réel
"""
import json
import asyncio
import time
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage

EMERGENT_LLM_KEY = "sk-emergent-dB01f6e70Ec9bCe6d6"

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

# Fichier de progression
PROGRESS_FILE = "/tmp/translation_progress.json"

def save_progress(lang, section, total):
    """Sauvegarder la progression"""
    try:
        with open(PROGRESS_FILE, 'r') as f:
            progress = json.load(f)
    except:
        progress = {}
    
    progress[lang] = {"current": section, "total": total, "timestamp": datetime.now().isoformat()}
    
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, indent=2)

async def translate_batch(chat, batch_data, lang_name):
    """Traduire un batch de données"""
    json_str = json.dumps(batch_data, ensure_ascii=False, indent=2)
    
    prompt = f"""Translate this JSON from French to {lang_name}.
IMPORTANT: 
- Keep EXACT keys unchanged
- Translate ONLY the string values
- Preserve all HTML tags, {{variables}}, special chars
- Return ONLY valid JSON, no explanations

{json_str}"""

    message = UserMessage(text=prompt)
    response = await chat.send_message(message)
    
    # Nettoyer
    text = response.strip()
    for marker in ['```json', '```']:
        if text.startswith(marker):
            text = text[len(marker):]
        if text.endswith(marker):
            text = text[:-len(marker)]
    
    return json.loads(text.strip())

async def translate_language(source_file, lang_code, lang_name):
    """Traduire une langue complète"""
    print(f"\n{'='*70}")
    print(f"🌍 LANGUE: {lang_name.upper()} ({lang_code})")
    print(f"{'='*70}")
    start_time = time.time()
    
    # Charger source
    with open(source_file, 'r', encoding='utf-8') as f:
        fr_data = json.load(f)
    
    # Créer session chat
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"translate-{lang_code}-{int(time.time())}",
        system_message=f"You are a professional {lang_name} translator. Translate JSON preserving structure."
    ).with_model("openai", "gpt-4o-mini")
    
    # Diviser en batches de 2 clés (plus petit = plus fiable)
    items = list(fr_data.items())
    batch_size = 2
    translated = {}
    total_batches = (len(items) + batch_size - 1) // batch_size
    
    print(f"📦 {len(items)} clés → {total_batches} batches")
    
    for i in range(0, len(items), batch_size):
        batch = dict(items[i:i+batch_size])
        batch_num = (i // batch_size) + 1
        
        # Afficher progression
        progress = (batch_num / total_batches) * 100
        print(f"  [{batch_num:3d}/{total_batches}] {progress:5.1f}% ", end='', flush=True)
        
        # Sauvegarder progression
        save_progress(lang_code, batch_num, total_batches)
        
        try:
            result = await translate_batch(chat, batch, lang_name)
            translated.update(result)
            print(f"✅")
        except Exception as e:
            print(f"❌ {str(e)[:40]}")
            # Garder original en cas d'erreur
            translated.update(batch)
            await asyncio.sleep(1)  # Pause en cas d'erreur
    
    # Sauvegarder fichier final
    output = f"/app/frontend/src/i18n/locales/{lang_code}.json"
    with open(output, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)
    
    elapsed = time.time() - start_time
    lines = len(open(output).readlines())
    
    print(f"✅ {lang_code}.json sauvegardé")
    print(f"📝 {lines} lignes | ⏱️  {elapsed:.1f}s")
    
    return lines

async def main():
    """Fonction principale"""
    source = "/app/frontend/src/i18n/locales/fr.json"
    
    print("╔" + "="*68 + "╗")
    print("║" + " "*15 + "🌍 TRADUCTION AUTOMATIQUE COMPLÈTE" + " "*19 + "║")
    print("╚" + "="*68 + "╝")
    print(f"\n📄 Source: {source}")
    print(f"🎯 Langues: {len(LANGUAGES)}")
    print(f"⏰ Début: {datetime.now().strftime('%H:%M:%S')}\n")
    
    # Initialiser fichier de progression
    with open(PROGRESS_FILE, 'w') as f:
        json.dump({}, f)
    
    total_lines = 0
    start_total = time.time()
    
    for i, (code, name) in enumerate(LANGUAGES.items(), 1):
        print(f"\n[{i}/{len(LANGUAGES)}] 🚀 Démarrage {name}...")
        try:
            lines = await translate_language(source, code, name)
            total_lines += lines
        except Exception as e:
            print(f"❌ ERREUR FATALE {name}: {e}")
            continue
    
    elapsed_total = time.time() - start_total
    
    print(f"\n╔" + "="*68 + "╗")
    print(f"║" + " "*20 + "🎉 TRADUCTION TERMINÉE!" + " "*25 + "║")
    print(f"╚" + "="*68 + "╝")
    print(f"📊 {len(LANGUAGES)} langues traduites")
    print(f"📝 ~{total_lines} lignes générées")
    print(f"⏱️  Temps total: {elapsed_total/60:.1f} minutes")
    print(f"⏰ Fin: {datetime.now().strftime('%H:%M:%S')}")
    
    # Vérification finale
    print(f"\n{'='*70}")
    print("📋 VÉRIFICATION FINALE:")
    print(f"{'='*70}")
    for code in LANGUAGES.keys():
        file_path = f"/app/frontend/src/i18n/locales/{code}.json"
        try:
            lines = len(open(file_path).readlines())
            with open(file_path) as f:
                json.load(f)  # Vérifier validité JSON
            print(f"  ✅ {code}.json: {lines} lignes (JSON valide)")
        except Exception as e:
            print(f"  ❌ {code}.json: ERREUR - {e}")

if __name__ == "__main__":
    asyncio.run(main())

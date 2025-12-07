#!/usr/bin/env python3
"""
Traduction ultra-rapide: traduit par grandes sections
"""
import json
import asyncio
from emergentintegrations.llm.chat import LlmChat, UserMessage

KEY = "sk-emergent-dB01f6e70Ec9bCe6d6"
LANGS = {'en':'English','de':'German','it':'Italian','es':'Spanish','tr':'Turkish','ar':'Arabic','sr':'Serbian','sq':'Albanian'}

async def translate(data, lang_name):
    chat = LlmChat(api_key=KEY, session_id=f"t-{lang_name}", system_message="Professional translator").with_model("openai","gpt-4o-mini")
    msg = UserMessage(text=f"Translate JSON French→{lang_name}. Keep keys, translate values only:\n{json.dumps(data,ensure_ascii=False)[:3000]}")
    resp = await chat.send_message(msg)
    text = resp.strip().replace('```json','').replace('```','').strip()
    return json.loads(text)

async def do_lang(code, name):
    print(f"🌍 {name}...", end='', flush=True)
    try:
        with open('/app/frontend/src/i18n/locales/fr.json') as f:
            fr = json.load(f)
        
        # Diviser en 10 chunks
        items = list(fr.items())
        chunk_size = len(items) // 10 + 1
        result = {}
        
        for i in range(0, len(items), chunk_size):
            chunk = dict(items[i:i+chunk_size])
            trans = await translate(chunk, name)
            result.update(trans)
            print('.', end='', flush=True)
        
        with open(f'/app/frontend/src/i18n/locales/{code}.json', 'w') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        
        print(f" ✅")
    except Exception as e:
        print(f" ❌ {e}")

async def main():
    print("🚀 Traduction rapide démarrée\n")
    for code, name in LANGS.items():
        await do_lang(code, name)
    print("\n🎉 Terminé!")

asyncio.run(main())

#!/bin/bash
# Script de monitoring de la traduction

PROGRESS_FILE="/tmp/translation_progress.json"
LOG_FILE="/tmp/translation_output.log"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          📊 SUIVI TRADUCTION EN TEMPS RÉEL                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

if [ -f "$PROGRESS_FILE" ]; then
    echo "📈 Progression actuelle:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    python3 -c "
import json
try:
    with open('$PROGRESS_FILE') as f:
        progress = json.load(f)
    
    if not progress:
        print('  ⏳ Initialisation en cours...')
    else:
        for lang, data in progress.items():
            current = data.get('current', 0)
            total = data.get('total', 0)
            if total > 0:
                pct = (current / total) * 100
                bar_len = int(pct / 2)
                bar = '█' * bar_len + '░' * (50 - bar_len)
                print(f'  {lang.upper():3s} │{bar}│ {pct:5.1f}% ({current}/{total})')
            else:
                print(f'  {lang.upper():3s} │ En attente...')
except Exception as e:
    print(f'  ❌ Erreur: {e}')
"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo "  ⏳ Traduction pas encore démarrée"
fi

echo ""
echo "📝 Dernières lignes du log:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "$LOG_FILE" ]; then
    tail -10 "$LOG_FILE"
else
    echo "  Log pas encore créé"
fi

echo ""
echo "💡 Commandes utiles:"
echo "  • Voir progression: bash /app/check_translation_progress.sh"
echo "  • Voir log complet: tail -f /tmp/translation_output.log"
echo "  • Arrêter: pkill -f translate_all_fast"

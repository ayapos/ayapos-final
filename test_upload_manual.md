# 📝 GUIDE DE TEST D'UPLOAD D'IMAGES

## ✅ CE QUI A ÉTÉ CORRIGÉ :

1. **Endpoint d'upload** : `/api/upload` fonctionne maintenant correctement
2. **Sauvegarde automatique** : Après chaque upload, la page se sauvegarde automatiquement après 0.5 seconde
3. **Messages détaillés** : La console affiche tous les détails de l'upload
4. **Gestion d'erreurs** : Messages d'erreur explicites en cas de problème

## 🧪 COMMENT TESTER L'UPLOAD :

### Étape 1 : Se connecter à l'admin
```
1. Allez sur: https://dynamic-cms-web-1.preview.emergentagent.com/admin/login
2. Email: emrah@ayapos.com
3. Mot de passe: Arden2018@
4. Cliquez sur "Se connecter"
```

### Étape 2 : Accéder à une page
```
1. Dans le menu de gauche, cliquez sur "Terminal Serveur"
2. La page se charge avec tous les champs éditables
```

### Étape 3 : Uploader une image Hero
```
1. Descendez jusqu'à "Image Hero"
2. Cliquez sur le bouton bleu "Upload"
3. Sélectionnez une image (JPG, PNG, WEBP - max 5MB)
4. L'image devrait apparaître immédiatement
5. Un message "✅ Image uploadée" devrait s'afficher
6. Attendez 0.5 seconde → "✅ Sauvegardé !"
```

### Étape 4 : Uploader une image de bénéfice
```
1. Scrollez jusqu'à "Bénéfices avec images"
2. Trouvez "Bénéfice #1"
3. Cliquez sur "Upload" à côté du champ Image
4. Sélectionnez votre image
5. L'image s'affiche instantanément
6. Message "✅ Image uploadée"
7. Puis "✅ Sauvegardé !"
```

### Étape 5 : Vérifier sur le site
```
1. Cliquez sur "Voir le Site" (en haut à droite)
2. Ou allez sur: https://dynamic-cms-web-1.preview.emergentagent.com/waiter-terminal
3. Votre nouvelle image devrait apparaître
```

## 🐛 EN CAS DE PROBLÈME :

### Problème 1 : "Impossible de sauvegarder"
**Cause** : Token expiré ou non valide
**Solution** :
```
1. Déconnectez-vous (bouton en bas à gauche)
2. Reconnectez-vous
3. Réessayez l'upload
```

### Problème 2 : "Erreur lors du téléchargement"
**Cause** : Image trop grande ou format non supporté
**Solution** :
```
1. Vérifiez que l'image fait moins de 5MB
2. Formats acceptés : JPG, PNG, WEBP, GIF, SVG
3. Essayez de compresser l'image sur tinypng.com
```

### Problème 3 : L'image ne s'affiche pas sur le site
**Cause** : La page n'a pas été sauvegardée
**Solution** :
```
1. Après l'upload, cliquez manuellement sur "💾 Sauvegarder et Publier"
2. Attendez le message de confirmation
3. Rafraîchissez la page du site (F5)
```

## 🔍 OUVRIR LA CONSOLE POUR DEBUG :

```
1. Dans Chrome/Edge : F12 ou Ctrl+Shift+I
2. Aller dans l'onglet "Console"
3. Avant d'uploader, la console affiche :
   - 🔄 Upload de l'image: nom_fichier.jpg
   - 📍 API URL: https://...
   - ✅ Réponse upload: {success: true, url: "..."}
4. En cas d'erreur, vous verrez :
   - ❌ Erreur upload: [message détaillé]
```

## ✅ COMPORTEMENT ATTENDU :

```
1. Clic sur "Upload" → Sélecteur de fichier s'ouvre
2. Sélection d'image → Upload commence immédiatement
3. 1-2 secondes → Image apparaît dans l'aperçu
4. Message toast : "✅ Image uploadée"
5. 0.5 seconde plus tard → Sauvegarde automatique
6. Message toast : "✅ Sauvegardé !"
7. L'image est maintenant sur le site
```

## 📞 SI ÇA NE FONCTIONNE TOUJOURS PAS :

Ouvrez la console (F12) et faites une capture d'écran des erreurs affichées.
Les erreurs commenceront par "❌ Erreur upload:" et contiendront des détails.

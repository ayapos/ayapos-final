#!/bin/bash

echo "======================================================================"
echo "🔄 REMPLACEMENT MASSIF DE TOUTES LES IMAGES EN DOUBLON"
echo "======================================================================"

cd /app/frontend/src/pages

# Backup
echo "📦 Création d'un backup..."
cp -r /app/frontend/src/pages /app/frontend/src/pages_backup_$(date +%Y%m%d_%H%M%S)

# Compteur
count=0

# Remplacement photo-1556742049 (utilisé 17 fois) - POS System
echo "🔄 Remplacement photo-1556742049 (POS Systems)..."
find . -name "*.jsx" -type f -exec sed -i 's|photo-1556742049-0cfed4f6a45d|photo-1728044849280-10a1a75cff83|g' {} \;
count=$((count+1))

# Remplacement photo-1556742111 (utilisé 10 fois) - Tablet POS
echo "🔄 Remplacement photo-1556742111 (Tablet POS)..."
find . -name "*.jsx" -type f -exec sed -i 's|photo-1556742111-a301076d9d18|photo-1728044849321-4cbffc50cc1d|g' {} \;
count=$((count+1))

# Remplacement photo-1556741533 (utilisé 5 fois) - Waiter Terminal
echo "🔄 Remplacement photo-1556741533 (Waiter Terminal)..."
find . -name "*.jsx" -type f -exec sed -i 's|photo-1556741533-f6acd646dcec|photo-1609951734391-b79a50460c6c|g' {} \;
count=$((count+1))

# Remplacement photo-1556742044 (utilisé 8 fois) - Order System
echo "🔄 Remplacement photo-1556742044 (Order System)..."
find . -name "*.jsx" -type f -exec sed -i 's|photo-1556742044-3c52d6e88c62|photo-1629248242732-592ecc9cc00f|g' {} \;
count=$((count+1))

# Remplacement photo-1512941937669 (doublon QR/Mobile)
echo "🔄 Remplacement photo-1512941937669 dans fichiers spécifiques..."
# Pour Delivery Management - image de livraison
sed -i 's|photo-1512941937669-90a1b58e7e9c|photo-1593929976216-f746e488aa45|g' DeliveryManagementComplete.jsx 2>/dev/null
# Pour Mobile Order App - garder l'image déjà correcte depuis MongoDB
# Pour Mobile Reports - dashboard
sed -i 's|photo-1512941937669-90a1b58e7e9c|photo-1759752394755-1241472b589d|g' MobileReportsComplete.jsx 2>/dev/null
count=$((count+1))

# Remplacement photo-1556742400 (doublon kiosk)
echo "🔄 Remplacement photo-1556742400 (Self-Order Kiosk)..."
find . -name "*Kiosk*.jsx" -type f -exec sed -i 's|photo-1556742400-b5a5f5d92bb4|photo-1764795849694-34b3316b3de4|g' {} \;
count=$((count+1))

# Stock Management
echo "🔄 Remplacement images Stock Management..."
sed -i 's|photo-1586528116311-ad8dd3c8310d|photo-1740914994657-f1cdffdc418e|g' StockManagementComplete.jsx 2>/dev/null
count=$((count+1))

# Hardware Devices - multiple remplacements
echo "🔄 Remplacement images Hardware Devices..."
sed -i 's|photo-1556740772-1a741367b93e|photo-1726056652582-7c9d202d4018|g' HardwareDevices.jsx 2>/dev/null
count=$((count+1))

# Web Portal - dashboard
echo "🔄 Remplacement images Web Portal..."
sed -i 's|photo-1460925895917-afdab827c52f|photo-1759752394755-1241472b589d|g' WebPortalComplete.jsx 2>/dev/null
count=$((count+1))

echo ""
echo "======================================================================"
echo "✅ $count catégories d'images remplacées"
echo "======================================================================"
echo ""
echo "📊 Vérification des doublons restants..."
grep -rh "photo-[0-9]" . 2>/dev/null | grep -o "photo-[0-9a-z-]*" | sort | uniq -c | sort -rn | head -10

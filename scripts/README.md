# Scripts Webtrine

Scripts utilitaires pour le build et la gestion multi-client.

## 🎨 Favicon Management

### `create-favicons.sh` - Génération des favicons

Génère les favicons (16x16, 32x32, 180x180) à partir des logos source.

```bash
# Générer pour tous les clients
bash scripts/create-favicons.sh

# Générer pour un client spécifique
bash scripts/create-favicons.sh chillpaws
```

**Configuration des sources** (dans le script) :
```bash
FAVICON_SOURCES=(
  ["apt235"]="logo_apt235.png"
  ["chillpaws"]="logo_chillpaws_color_2.png"
  ["dipaolo"]="logo-dipaolo.png"
  ["showcase"]="webtrine_logo_2_blanc_noTitle.png"
  ["webtrine"]="webtrine_logo_2_blanc_noTitle.png"
)
```

Pour changer le fichier source d'un client, éditer cette configuration dans `scripts/create-favicons.sh`.

### `update-favicon.sh` - Copie des favicons

Copie les favicons du client vers `public/` (appelé automatiquement par `pnpm dev` et `pnpm build`).

Fichiers copiés :
- `favicon-32x32.png` (favori standard)
- `favicon-16x16.png` (fallback petite taille)
- `apple-touch-icon.png` (iOS/Safari)

```bash
# Utilisé automatiquement, mais peut être appelé manuellement :
VITE_CUSTOMER=chillpaws bash scripts/update-favicon.sh
```

## 🏗️ Build Scripts

### `build.sh` - Build production

Script de build avec confirmation.

```bash
VITE_CUSTOMER=chillpaws pnpm build
# ou
VITE_CUSTOMER=chillpaws bash scripts/build.sh
```

### `serve.sh` - Serveur de production

Sert le build de production avec Express.

```bash
VITE_CUSTOMER=chillpaws pnpm dev:serve
```

## 🖼️ Image Optimization

### `convert-to-webp.js` - Conversion WebP

Convertit les images JPG/PNG/AVIF en WebP pour optimisation.

**Protection automatique** :
- ✅ Favicons (favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png)
- ✅ Logos sources (nécessaires pour `create-favicons.sh`)

```bash
pnpm convert:webp
```

**Ajouter un fichier à exclure** :

Éditer `scripts/convert-to-webp.js` (ligne ~15) :
```javascript
const EXCLUDED_FILES = [
  "favicon-32x32.png",
  "favicon-16x16.png",
  "apple-touch-icon.png",
  "logo_apt235.png",
  "logo_chillpaws_color_2.png",
  // Ajouter ici ↓
  "nouveau-fichier.png",
];
```

## 📋 Workflow complet

### Ajouter un nouveau client avec favicons

1. Créer la structure du client :
   ```bash
   mkdir -p public/assets/new-client/icons
   ```

2. Ajouter le logo source (ex: `logo-new-client.png`)

3. Configurer dans `scripts/create-favicons.sh` :
   ```bash
   ["new-client"]="logo-new-client.png"
   ```

4. Générer les favicons :
   ```bash
   bash scripts/create-favicons.sh new-client
   ```

5. Tester :
   ```bash
   VITE_CUSTOMER=new-client pnpm dev
   ```

### Changer le favicon source d'un client

1. Éditer `scripts/create-favicons.sh`
2. Modifier la ligne du client concerné :
   ```bash
   ["chillpaws"]="nouveau-logo.png"  # Changer ici
   ```
3. Régénérer :
   ```bash
   bash scripts/create-favicons.sh chillpaws
   ```

## 🧪 Cache & Debug

### Tester les favicons sur Safari

Safari a un cache très agressif pour les favicons :

```bash
# 1. Vider le cache Safari
rm -rf ~/Library/Caches/com.apple.Safari
rm -rf ~/Library/Safari/Favicon\ Cache
killall Safari

# 2. Redémarrer le serveur
VITE_CUSTOMER=chillpaws pnpm dev

# 3. Ouvrir en navigation privée (Cmd+Shift+N)
```

### Vérifier les fichiers générés

```bash
# Lister les favicons d'un client
ls -lh public/assets/chillpaws/icons/favicon*.png

# Vérifier la racine public/
ls -lh public/favicon*
```

# Optimisation du chargement des images de la galerie

## 🎯 Problème identifié

Les images de la galerie prennent du temps à charger et impactent le rendu initial de la page (FOUC - Flash of Unstyled Content).

## ✅ Solutions implémentées

### 1. **Optimisations du chargement des images** (Déjà appliqué)

#### Attributs HTML ajoutés sur les images

```tsx
<Image
  loading="lazy"           // ✅ Déjà présent - Lazy loading natif
  fetchPriority="low"      // ✅ NOUVEAU - Dépriorise le chargement des images
  decoding="async"         // ✅ NOUVEAU - Décodage asynchrone (ne bloque pas le parsing)
  width="450"              // ✅ NOUVEAU - Dimensions explicites (évite layout shift)
  height="450"             // ✅ NOUVEAU - Réserve l'espace avant le chargement
/>
```

**Impact** :
- ✅ `fetchPriority="low"` : Le navigateur charge d'abord le CSS/JS critique
- ✅ `decoding="async"` : Le décodage de l'image ne bloque pas le thread principal
- ✅ `width` + `height` : Élimine le layout shift (CLS = 0)

### 2. **Script de compression d'images** (Nouveau)

#### Usage

```bash
# Compresser un dossier complet
pnpm compress:images public/assets/apt235/

# Compresser un fichier spécifique
pnpm compress:images public/assets/apt235/IMG_45.webp

# Compresser tous les assets d'un client
pnpm compress:images public/assets/showcase/
```

#### Configuration

**Fichier** : `scripts/compress-images.js`

**Paramètres de compression** :
- **WebP** : Quality 85, Effort 6 (compression maximale)
- **JPEG** : Quality 85, MozJPEG activé
- **PNG** : Quality 85, Compression level 9

**Gain attendu** : 30-60% de réduction de poids selon les images

#### Fonctionnalités

- ✅ Traitement récursif des dossiers
- ✅ Ne compresse que si le résultat est plus petit
- ✅ Affiche les statistiques de compression
- ✅ Supporte WebP, JPEG, PNG
- ✅ Utilise Sharp (ultra-rapide, meilleure qualité que browser-image-compression)

### 3. **Skeleton Loader** (Optionnel - Exemple fourni)

Un composant skeleton améliore l'UX en affichant un placeholder pendant le chargement.

#### Fichier exemple

`src/design-system/components/gallery/card-with-skeleton.component.example.tsx`

#### Intégration (si souhaité)

1. **Renommer le fichier exemple** :
   ```bash
   mv src/design-system/components/gallery/card-with-skeleton.component.example.tsx \
      src/design-system/components/gallery/card.component.tsx
   ```

2. **Comportement** :
   - Affiche un skeleton animé pendant le chargement
   - Cache le skeleton et affiche l'image une fois chargée
   - Transition smooth

## 📊 Résultats attendus

### Avant optimisation
- ❌ Layout shift pendant le chargement (CLS élevé)
- ❌ Images bloquent le rendu initial
- ❌ Fichiers WebP non optimisés (taille excessive)

### Après optimisation
- ✅ Pas de layout shift (CLS = 0)
- ✅ CSS/JS se chargent en priorité
- ✅ Images compressées (30-60% plus légères)
- ✅ Décodage non-bloquant
- ✅ Skeleton loader (optionnel) pour meilleure UX

## 🚀 Workflow recommandé

### Pour les nouvelles images

1. **Ajouter les images** dans `public/assets/{customer}/`
2. **Compresser** :
   ```bash
   pnpm compress:images public/assets/{customer}/
   ```
3. **Commit** les images compressées

### Build automatique (optionnel)

Ajouter la compression automatique avant le build :

```json
// package.json
{
  "scripts": {
    "prebuild": "pnpm compress:images public/assets/"
  }
}
```

## 🔧 Alternatives et optimisations supplémentaires

### 1. Responsive Images avec `srcset`

Pour optimiser selon la taille d'écran :

```tsx
<Image
  src="image.webp"
  srcSet="image-450.webp 450w, image-261.webp 261w"
  sizes="(min-width: 1440px) 450px, 261px"
/>
```

Nécessite : Générer plusieurs tailles d'images (script à créer)

### 2. Format AVIF

AVIF offre une meilleure compression que WebP (~30% plus léger).

**Inconvénient** : Support navigateur encore limité (Safari iOS 16+)

**Solution** :
```tsx
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

### 3. Optimisation au build avec Vite

Le plugin `vite-plugin-imagemin` est déjà dans votre projet!

**Activation** :
```js
// vite.config.js
import viteImagemin from "vite-plugin-imagemin";

export default {
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      webp: { quality: 85 }
    })
  ]
}
```

### 4. CDN avec cache

Héberger les images sur un CDN (Cloudflare, Cloudinary) :
- Cache global distribué
- Compression automatique
- Formats adaptatifs (WebP/AVIF automatique)

## 📈 Métriques Core Web Vitals

### Impact sur les métriques

- **LCP (Largest Contentful Paint)** : ⬇️ Amélioration ~20-40%
- **CLS (Cumulative Layout Shift)** : ⬇️ = 0 (grâce aux dimensions)
- **FID (First Input Delay)** : ⬇️ Amélioration (décodage async)

### Mesurer les performances

```bash
# Lighthouse
npx lighthouse http://localhost:3000 --view

# WebPageTest
# https://www.webpagetest.org/
```

## 🎓 Ressources

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [MDN - Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [fetchpriority - Chrome Developers](https://web.dev/articles/fetch-priority)

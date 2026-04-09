# Visual Regression Testing - Workflow

Ce document explique comment gérer les snapshots visuels pour éviter les faux positifs causés par les différences de rendu de fonts entre macOS et Linux.

## 🎯 Problème

Les fonts sont rendues différemment entre :
- **macOS** (CoreText) : votre machine de développement
- **Linux** (FreeType) : l'environnement CI

Même avec `maxDiffPixels: 2000`, les différences de fonts causent des échecs de tests.

## ✅ Solution

### Architecture

**Un seul stockage de snapshots** : Tous les snapshots sont générés sur **Linux** (via Docker) et stockés dans le repo.

**Comportement des tests** :
- **CI (Linux)** : Validation stricte avec `maxDiffPixels: 2000` ✅
- **Local (macOS)** : Skip les assertions visuelles (pas de comparaison) 🚫
- **Local (Docker)** : Validation stricte sur Linux (identique à CI) ✅

**Avantage** : Aucune tolérance élevée → détecte vraiment les régressions (logos, layout, etc.)

### Stockage des snapshots

```
tests/e2e/visual.spec.ts-snapshots/
├── apt235-accueil-FullHD.png           ← Généré sur Linux (Docker)
├── apt235-accueil-HD.png               ← Utilisé par CI
├── chillpaws-contact-iPhone-14.png     ← Pas de snapshots macOS
└── ...
```

**Un seul set de snapshots** : Linux uniquement (pas de duplication).

## 🚀 Workflow

### 1. Installation Docker (une seule fois)

**Option A : Docker Desktop**
```bash
# Télécharger et installer
open https://www.docker.com/products/docker-desktop/
```

**Option B : Colima (plus léger, recommandé)**
```bash
brew install colima docker
colima start
```

### 2. Générer/Mettre à jour les snapshots Linux

```bash
# Générer tous les snapshots sur Linux (Docker)
pnpm test:e2e:snapshots:linux

# Commit et push
git add tests/e2e/visual.spec.ts-snapshots/
git commit -m "chore: update visual snapshots"
git push
```

**Durée** : ~10-15 minutes (première fois), ~5-8 min ensuite.

### 3. Tester en local (macOS)

```bash
# Les assertions visuelles sont SKIPPÉES sur macOS
# (évite les faux positifs de fonts)
pnpm test:e2e

# Sortie exemple:
# ⏭️  [showcase/Accueil] Skipping visual assertion (darwin)
#    💡 Generate Linux snapshots: pnpm test:e2e:snapshots:linux
```

**Important** : En local sur macOS, les tests passent TOUJOURS (pas de comparaison visuelle).

### 4. Validation stricte en Docker (optionnel)

Si vous voulez valider localement avec la même rigueur que la CI :

```bash
# Option 1: Via Docker (identique à CI)
pnpm test:e2e:snapshots:linux

# Option 2: Forcer la validation sur macOS (échec attendu)
FORCE_VISUAL_VALIDATION=true pnpm test:e2e
```

### 5. CI valide strictement

La CI Linux utilise `maxDiffPixels: 2000` → détecte les vrais problèmes.

## 📋 Commandes

| Commande | Description | Plateforme |
|----------|-------------|------------|
| `pnpm test:e2e` | Tests E2E (skip visual sur macOS) | Local macOS |
| `pnpm test:e2e:snapshots:linux` | Générer snapshots Linux | Docker |
| `FORCE_VISUAL_VALIDATION=true pnpm test:e2e` | Forcer validation sur macOS | Local macOS |
| `TEST_CUSTOMER=showcase pnpm test:e2e` | Tester un client | Local |

## 🔧 Détails techniques

### Configuration stricte

**`maxDiffPixels: 2000`** dans tous les cas :
- ~0.1% de différence sur FullHD (1920×1080)
- Détecte : logos manquants, layout cassé, couleurs changées
- Tolère : antialiasing subtil, compression JPEG mineure

**Aucune tolérance élevée** : Pas de `threshold` ou `maxDiffPixelRatio` élevé.

### Skip sur macOS

Code dans `visual.spec.ts` :
```typescript
const isLinuxOrCI =
  process.env.CI === "true" ||
  process.platform === "linux" ||
  process.env.FORCE_VISUAL_VALIDATION === "true";

if (isLinuxOrCI) {
  // Validation stricte
  await expect(page).toHaveScreenshot(name, { maxDiffPixels: 2000 });
} else {
  // macOS: skip
  console.log("⏭️  Skipping visual assertion");
}
```

## 🐛 Troubleshooting

### "Docker not found" / "Docker not running"
```bash
# Installer Colima
brew install colima docker
colima start
```

### Tests passent en local mais échouent en CI
✅ **Normal** si vous êtes sur macOS → les assertions visuelles sont skippées.

**Solution** : Générer les snapshots sur Linux :
```bash
pnpm test:e2e:snapshots:linux
git add tests/e2e/visual.spec.ts-snapshots/
git commit -m "chore: update snapshots"
git push
```

### Vérifier localement avant de pusher
```bash
# Valider avec Docker (comme CI)
pnpm test:e2e:snapshots:linux
```

### Forcer la validation sur macOS
```bash
# Échec attendu dû aux fonts, mais utile pour débug
FORCE_VISUAL_VALIDATION=true pnpm test:e2e
```

## 📊 Métriques

- **maxDiffPixels: 2000** → Détecte ~0.1% de diff sur FullHD
- **~192 snapshots** au total (5 clients × 4 viewports × ~10 routes)
- **1 seul set de snapshots** : Linux (pas de duplication macOS)

# Tests Visuels E2E avec Playwright

Documentation simplifiée pour les tests de régression visuelle en local.

## 🎯 Objectif

Les tests visuels capturent des screenshots de toutes les pages et les comparent avec les snapshots de référence pour détecter les régressions visuelles (design cassé, logos manquants, couleurs incorrectes, etc.).

## 🚀 Commandes

### Lancer les tests

```bash
# Tester un client spécifique
TEST_CUSTOMER=showcase pnpm test:e2e
TEST_CUSTOMER=chillpaws pnpm test:e2e
TEST_CUSTOMER=dipaolo pnpm test:e2e

# Tester tous les clients
pnpm test:e2e:all

# Interface UI pour débugger
pnpm test:e2e:ui
```

### Générer/Mettre à jour les snapshots

```bash
# Pour un client spécifique
TEST_CUSTOMER=showcase playwright test --update-snapshots

# Pour tous les clients (prend ~10-15 min)
pnpm test:e2e:all:update
```

⚠️ **Important** : Les snapshots ne sont PAS versionnés dans Git (ajoutés au `.gitignore`).

## 📸 Snapshots

### Localisation

Les snapshots sont stockés dans :
```
tests/e2e/visual.spec.ts-snapshots/
├── showcase-accueil-FullHD.png
├── showcase-accueil-HD.png
├── showcase-accueil-iPad-Pro.png
├── showcase-accueil-iPhone-14-Pro-Max.png
├── chillpaws-contact-FullHD.png
└── ...
```

### Viewports testés

- **FullHD** : 1920×1080 (Desktop large)
- **HD** : 1280×720 (Desktop standard)
- **iPad Pro** : 1024×1366 (Tablette)
- **iPhone 14 Pro Max** : 430×932 (Mobile)

## ✅ Validation

### Seuil de tolérance

**`maxDiffPixels: 2000`** : Maximum ~0.1% de différence sur un écran FullHD.

**Détecte** :
- Logos manquants ou déplacés
- Layout cassé (colonnes, marges)
- Couleurs incorrectes
- Images manquantes
- Texte débordant

**Tolère** :
- Antialiasing subtil
- Compression JPEG mineure
- Artefacts de rendu mineurs

## 🔧 Workflow

### 1. Développement normal

```bash
# Faire vos modifications CSS/JSX
# ...

# Tester pour vérifier que rien n'est cassé
TEST_CUSTOMER=showcase pnpm test:e2e
```

Si les tests échouent avec des différences visuelles :
- ✅ **Intentionnel** → Régénérer les snapshots
- ❌ **Bug** → Corriger le code

### 2. Changement visuel intentionnel

Exemple : Nouveau design du banner, changement de logo, mise à jour des couleurs...

```bash
# 1. Faire les modifications
# ...

# 2. Régénérer les snapshots
TEST_CUSTOMER=showcase playwright test --update-snapshots

# 3. Vérifier visuellement les nouveaux snapshots
# Ouvrir les fichiers PNG dans tests/e2e/visual.spec.ts-snapshots/

# 4. Si tout est OK, les tests passent maintenant
TEST_CUSTOMER=showcase pnpm test:e2e
```

### 3. Débugger un échec de test

```bash
# Lancer en mode UI pour voir les différences
pnpm test:e2e:ui

# Les diffs sont également dans :
# - test-results/ (images actual vs expected)
# - playwright-report/ (rapport HTML)
```

## 🛠️ Contenu Stabilisé

Pour éviter les faux positifs, certains contenus dynamiques sont figés pendant les tests :

### Vidéos
- Mises en pause
- Reset au frame 0

### Carousels
- Arrêt des animations
- Forcé sur la première image
- Compteur figé sur "1/X"

### Maps Leaflet
- Entièrement masquées (contenu dynamique)

### Avatars avec CORS
- Forcés sur les initiales (fallback)

## 📝 Maintenance

### Quand régénérer les snapshots ?

✅ **OUI** :
- Changement de design intentionnel
- Nouveau logo ou couleurs
- Modification de layout
- Ajout/suppression de composant

❌ **NON** :
- Changement de texte seulement
- Mise à jour du contenu (reviews, etc.)
- Changement de données dynamiques

### Snapshots corrompus

Si les tests échouent de façon inexpliquée :

```bash
# Supprimer tous les snapshots
rm -rf tests/e2e/visual.spec.ts-snapshots/

# Régénérer proprement
pnpm test:e2e:all:update
```

## 💡 Tips

- **Première génération** : ~15-20 min pour tous les clients
- **Tests réguliers** : ~3-5 min par client
- **Snapshots locaux** : Spécifiques à votre machine (pas partagés)
- **Fonts** : Les différences de rendu entre machines sont normales, régénérez si nécessaire
- **Contenu dynamique** : Peut causer des échecs si non stabilisé (vidéos, maps, etc.)

## 🐛 Troubleshooting

### Tests échouent après mise à jour système

Les mises à jour macOS peuvent changer le rendu des fonts.

**Solution** : Régénérer tous les snapshots
```bash
pnpm test:e2e:all:update
```

### "Timed out waiting for screenshot"

Le site prend trop de temps à charger.

**Solution** : Vérifier que le dev server est rapide, augmenter le timeout dans `playwright.config.ts` si nécessaire.

### Différences dues aux fonts

Si vous travaillez sur plusieurs machines, chaque machine aura ses propres snapshots (non versionnés). C'est normal et voulu.

---

**Note** : Cette configuration est optimisée pour un développement solo en local. Les snapshots ne sont pas partagés pour éviter les problèmes de rendu cross-platform.

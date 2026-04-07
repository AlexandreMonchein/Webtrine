# Playwright E2E Testing

Tests visuels et E2E pour tous les clients Webtrine.

## 📦 Installation

```bash
# Installer Playwright (déjà fait)
pnpm add -D @playwright/test

# Installer les navigateurs
pnpm playwright install chromium
```

## 🚀 Commandes

### Workflow Simplifié

Playwright démarre automatiquement le serveur de développement avec le bon client :

```bash
# Le serveur démarre automatiquement avec le client correspondant
pnpm test:e2e:apt235
pnpm test:e2e:chillpaws
pnpm test:e2e:showcase
# etc.
```

**Option manuelle** (si le serveur est déjà lancé, il sera réutilisé) :

```bash
# Terminal 1 : Serveur déjà lancé
VITE_CUSTOMER=apt235 pnpm dev

# Terminal 2 : Tests (réutilise le serveur existant)
pnpm test:e2e:apt235
```

### Lancer tous les tests

```bash
pnpm test:e2e
```

### Tests par client

```bash
pnpm test:e2e:chillpaws
pnpm test:e2e:dipaolo
pnpm test:e2e:showcase
pnpm test:e2e:webtrine
pnpm test:e2e:apt235
```

### Mode interactif (UI)

```bash
pnpm test:e2e:ui

# Ou pour un client spécifique
TEST_CUSTOMER=apt235 pnpm test:e2e:ui
```

### Mode debug

```bash
pnpm test:e2e:debug

# Ou pour un client spécifique
TEST_CUSTOMER=apt235 pnpm test:e2e:debug
```

### Voir le rapport

```bash
pnpm test:e2e:report
```

### Mettre à jour les screenshots de référence

```bash
pnpm test:e2e:update

# Ou pour un client spécifique
TEST_CUSTOMER=chillpaws pnpm test:e2e:update
```

## 📸 Visual Regression Testing

Les tests visuels comparent des screenshots pixel par pixel pour détecter les changements involontaires.

### Comment ça marche

1. **Première exécution** : Crée les screenshots de référence (baseline)
2. **Exécutions suivantes** : Compare avec les baselines et fail si différent
3. **Mise à jour** : Si le changement est voulu, mettre à jour avec `--update-snapshots`

### Structure des snapshots

```
tests/e2e/
├── visual.spec.ts-snapshots/
│   ├── chillpaws-accueil-desktop.png       # Baseline
│   ├── chillpaws-accueil-mobile.png
│   ├── dipaolo-home-desktop.png
│   └── ...
```

### Viewports testés

- **Desktop**: 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667

## 🧪 Tests E2E

Tests fonctionnels qui simulent les parcours utilisateur :

- Navigation entre pages
- Menu mobile
- Liens sociaux
- Branding (logo, coordonnées)
- Formulaires de contact

Fichier : `tests/e2e/navigation.spec.ts`

## 🏗️ Architecture

```
tests/e2e/
├── fixtures/
│   └── customer.ts          # Helpers pour charger les configs clients
├── visual.spec.ts           # Tests visuels (screenshots)
└── navigation.spec.ts       # Tests E2E (navigation, interactions)
```

## 🔧 Configuration

### `playwright.config.ts`

- Base URL: `http://localhost:3000`
- Auto-start dev server si pas déjà lancé
- Retries: 2 fois sur CI
- Screenshots/vidéos sur échec

### `fixtures/routes.config.ts`

Configuration des routes additionnelles par client (pages qui ne sont pas dans la navbar) :

```typescript
export const customerRoutesConfig: Record<string, AdditionalRoutes> = {
  showcase: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: true,  // ✅ Showcase a une page CGU-CGV
  },
  webtrine: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: true,  // ✅ Webtrine a une page CGU-CGV
  },
  apt235: {
    mentionsLegals: true,
    confidentialite: true,
    cguCgv: false, // ❌ Apt235 n'a PAS de page CGU-CGV
  },
  // ...
};
```

**Pour ajouter une nouvelle route pour un client :**

1. Éditer `tests/e2e/fixtures/routes.config.ts`
2. Activer/désactiver les routes selon le client
3. Les tests testeront uniquement les routes activées

### Variables d'environnement

```bash
# Tester un client spécifique
TEST_CUSTOMER=chillpaws pnpm test:e2e

# Changer l'URL de base
PLAYWRIGHT_BASE_URL=http://localhost:3000 pnpm test:e2e
```

## 🤖 GitHub Actions

Les tests s'exécutent automatiquement sur chaque PR via `.github/workflows/playwright.yml`.

### Matrix strategy

Les tests tournent en parallèle pour chaque client :

```yaml
strategy:
  matrix:
    customer: [chillpaws, dipaolo, showcase, webtrine, apt235]
```

### Artifacts

Les rapports sont uploadés et disponibles 30 jours :
- `playwright-report-{customer}`
- `playwright-results-{customer}`

## 📝 Ajouter de nouveaux tests

### Test visuel d'une nouvelle page

Les pages sont auto-détectées depuis `config.fr.json` via la navbar.
Si une nouvelle route est ajoutée dans la config, elle sera testée automatiquement.

### Test E2E personnalisé

```typescript
// tests/e2e/custom.spec.ts
import { test, expect } from '@playwright/test';

test('custom flow', async ({ page }) => {
  await page.goto('/?customer=chillpaws');

  // Votre test ici
  await page.click('button');
  await expect(page.locator('.result')).toBeVisible();
});
```

## 🐛 Debugging

### Mode headed (voir le navigateur)

```bash
pnpm test:e2e:headed
```

### Mode debug avec Playwright Inspector

```bash
pnpm test:e2e:debug
```

### Voir les traces après échec

```bash
pnpm playwright show-trace test-results/.../.../trace.zip
```

## ✅ Best Practices

1. **Commit les baselines** : Les screenshots de référence doivent être dans Git
2. **Ignorer les diffs** : Les `-actual.png` et `-diff.png` sont temporaires
3. **Update consciemment** : Vérifier visuellement avant d'update les snapshots
4. **Test en local d'abord** : Avant de push, lancer les tests localement
5. **Un test = une assertion** : Garder les tests simples et focalisés

## 📊 Rapports

Après une exécution, ouvrir le rapport HTML :

```bash
pnpm test:e2e:report
```

Le rapport contient :
- ✅ Tests passés/échoués
- 📸 Screenshots comparatifs
- 🎥 Vidéos des échecs
- 📊 Timeline d'exécution

## 🆘 Troubleshooting

### Erreur "Browser not found"

```bash
pnpm playwright install chromium
```

### Tests lents en local

Réduire le nombre de clients ou viewports testés en modifiant `visual.spec.ts`.

### Snapshots qui changent souvent

- Désactiver les animations : `animations: 'disabled'` (déjà fait)
- Augmenter le délai d'attente : `await page.waitForTimeout(1000)`
- Masquer les éléments dynamiques : `mask: [page.locator('.animating')]`

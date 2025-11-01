# Tests de Composants - Design System

Ce projet utilise **React Testing Library** avec **Vitest** pour tester les composants du design system.

## Configuration

### Outils utilisés
- **React Testing Library** : Pour tester les composants React de manière accessible et centrée utilisateur
- **Vitest** : Comme framework de test (plus rapide que Jest)
- **jsdom** : Pour simuler un environnement DOM dans les tests
- **@testing-library/jest-dom** : Pour des matchers supplémentaires (toBeInTheDocument, toHaveClass, etc.)
- **@testing-library/user-event** : Pour simuler les interactions utilisateur

### Fichiers de configuration
- `vitest.component.config.ts` : Configuration Vitest spécifique aux tests de composants
- `src/test-setup.ts` : Configuration globale des tests (matchers jest-dom)
- `src/test-setup.d.ts` : Types TypeScript pour les matchers jest-dom

## Scripts disponibles

```bash
# Lancer tous les tests en mode watch (développement)
pnpm run test:components

# Lancer tous les tests une seule fois (CI/CD)
pnpm run test:components:run

# Lancer un test spécifique en mode watch
pnpm run test:components src/design-system/components/cards/cardsList.component.test.tsx
```

## Structure des tests

### Tests existants

1. **cardsList.component.test.tsx** (7 tests)
   - Rendu du contenu
   - Gestion des images optionnelles
   - Mode d'affichage inline
   - Navigation clavier
   - Gestion des cas limites
   - Logique de calcul pair/impair

2. **actionCardsList.component.test.tsx** (13 tests)
   - Rendu des cartes avec titre et contenu
   - Gestion des images
   - Boutons d'action et navigation
   - Accessibilité et navigation clavier
   - Configuration responsive
   - Cas limites (tableaux vides, propriétés manquantes)

3. **description.component.test.tsx** (11 tests)
   - Rendu du contenu texte et boutons
   - Types de contenu mixtes
   - Navigation avec React Router
   - Accessibilité
   - Gestion des configurations diverses

### Exemple de test

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import MonComposant from './monComposant.component';

// Helper pour rendre avec React Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(component, { wrapper: BrowserRouter });
};

describe('MonComposant', () => {
  it('devrait rendre le contenu attendu', () => {
    renderWithRouter(<MonComposant title="Test" />);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('devrait être accessible au clavier', async () => {
    const user = userEvent.setup();

    renderWithRouter(<MonComposant />);

    const bouton = screen.getByRole('button');
    await user.tab();

    expect(bouton).toHaveFocus();
  });
});
```

## Bonnes pratiques

### Principes de test
1. **Tester le comportement, pas l'implémentation** : Utilisez `getByRole`, `getByText`, `getByLabelText`
2. **Accessibilité first** : Testez la navigation clavier et les attributs ARIA
3. **Cas limites** : Testez avec des données vides, manquantes, ou invalides
4. **Interactions utilisateur** : Utilisez `userEvent` pour simuler les vraies interactions

### Queries recommandées (par ordre de priorité)
1. `getByRole` - Pour les éléments avec un rôle sémantique
2. `getByLabelText` - Pour les formulaires
3. `getByText` - Pour le contenu textuel
4. `getByTestId` - En dernier recours seulement

### Structure des tests
```tsx
describe('Nom du Composant', () => {
  // Tests de base (rendu, contenu)
  it('renders correctly', () => { ... });

  // Tests de comportement
  it('handles user interactions', () => { ... });

  // Tests d'accessibilité
  it('is accessible via keyboard', () => { ... });

  // Tests de cas limites
  it('handles edge cases', () => { ... });
});
```

## Coverage

Pour générer un rapport de couverture :

```bash
pnpm run test:components:run --coverage
```

Le rapport sera généré dans `coverage/` avec des formats texte, JSON et HTML.

## Conseils de développement

1. **TDD** : Écrivez les tests avant ou en même temps que le code
2. **Watch mode** : Utilisez `pnpm run test:components` pendant le développement
3. **Tests spécifiques** : Lancez un seul fichier de test pour aller plus vite
4. **Debugging** : Utilisez `screen.debug()` pour voir le DOM rendu
5. **Queries** : Utilisez `screen.logTestingPlaygroundURL()` pour trouver les bonnes queries

## Intégration avec Storybook

Les tests de composants complètent les stories Storybook :
- **Storybook** : Documentation visuelle et test d'interaction
- **React Testing Library** : Tests automatisés de comportement et accessibilité

Les deux approches se complètent pour une couverture complète du design system.
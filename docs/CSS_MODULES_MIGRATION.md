# Guide de Migration : Styled Components → CSS Modules

Ce guide vous accompagne dans la migration progressive de Styled Components vers CSS Modules.

## 📋 Table des matières

1. [Pourquoi CSS Modules ?](#pourquoi-css-modules)
2. [Configuration](#configuration)
3. [Patterns de Migration](#patterns-de-migration)
4. [Exemples de Conversion](#exemples-de-conversion)
5. [Best Practices](#best-practices)
6. [Checklist](#checklist)

## Pourquoi CSS Modules ?

### Avantages de CSS Modules

- ✅ **Performance** : Pas de runtime JavaScript, CSS statique
- ✅ **Taille du bundle** : Réduction de ~30kb (styled-components runtime)
- ✅ **Simplicité** : Séparation claire HTML/CSS
- ✅ **Tooling** : Meilleur support IDE, IntelliSense pour CSS
- ✅ **SSR** : Pas de hydration mismatch
- ✅ **Debugging** : Noms de classes lisibles en dev

### Coexistence pendant la migration

Les deux systèmes peuvent coexister :
- Styled Components continue de fonctionner normalement
- CSS Modules fonctionne en parallèle
- Migration composant par composant

## Configuration

### TypeScript Support

Le projet est configuré pour supporter CSS Modules avec TypeScript :

**`tsconfig.json`** :
```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-plugin-css-modules" }
    ]
  },
  "include": ["src/**/*.module.css"]
}
```

**`src/css-modules.d.ts`** : Déclarations de types pour les modules CSS

### Vite Configuration

**`vite.config.js`** :
```javascript
css: {
  modules: {
    localsConvention: "camelCase", // Support camelCase ET noms originaux
    scopeBehaviour: "local",
    generateScopedName: "[name]__[local]___[hash:base64:5]"
  }
}
```

### StyleLint

**`.stylelintrc.json`** : Configuré pour valider les fichiers `.module.css`

## Patterns de Migration

### 1. Structure de fichiers

**Avant (Styled Components)** :
```
component/
  ├── myComponent.component.tsx
  ├── myComponent.styled.ts
  └── myComponent.stories.tsx
```

**Après (CSS Modules)** :
```
component/
  ├── myComponent.component.tsx
  ├── myComponent.module.css
  └── myComponent.stories.tsx
```

### 2. Import et utilisation

**Avant** :
```tsx
import { Container, Title } from './myComponent.styled';

export const MyComponent = () => (
  <Container>
    <Title>Hello</Title>
  </Container>
);
```

**Après** :
```tsx
import classNames from 'classnames';
import styles from './myComponent.module.css';

export const MyComponent = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Hello</h1>
  </div>
);
```

### 3. Props conditionnelles

**Avant** :
```tsx
const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? 'blue' : 'gray'};
`;

<Button $primary>Click</Button>
```

**Après** :
```tsx
// CSS
.button { background: gray; }
.buttonPrimary { background: blue; }

// TSX
<button className={classNames(styles.button, {
  [styles.buttonPrimary]: isPrimary
})}>
  Click
</button>
```

### 4. Variables CSS du client

**Avant** :
```tsx
const Title = styled.h1`
  color: var(--dark-blue);
  font-size: var(--subtitle-font-size);
`;
```

**Après** :
```css
.title {
  color: var(--dark-blue);
  font-size: var(--subtitle-font-size);
}
```

Les variables CSS de `style.config.json` fonctionnent identiquement ! ✅

### 5. Breakpoints

**Avant** :
```tsx
import { bp } from '@/breakpoint';

const Container = styled.div`
  width: 100%;

  ${bp.min('tablet')} {
    width: 50%;
  }
`;
```

**Après (avec custom media queries)** :
```css
.container {
  width: 100%;
}

@media (--bp-min-medium) {
  .container {
    width: 50%;
  }
}
```

**💡 Nouveau** : Nous utilisons maintenant des **custom media queries** pour une meilleure maintenabilité !
- `--bp-min-medium` (768px+) - Tablette
- `--bp-min-large` (1024px+) - Desktop
- Documentation complète : `docs/CUSTOM_MEDIA_QUERIES.md`
```css
.link {
  color: blue;
}

.link:hover {
  color: darkblue;
}
```

## Exemples de Conversion

### Exemple complet : Banner Component

**Avant (Styled Components)** :

```tsx
// banner.component.tsx
import { BannerContainer, BannerTitle } from './banner.styled';

export const Banner = ({ title, subtitle }) => (
  <BannerContainer>
    <BannerTitle>{title}</BannerTitle>
    <p>{subtitle}</p>
  </BannerContainer>
);
```

```tsx
// banner.styled.ts
import styled from 'styled-components';
import { bp } from '@/breakpoint';

export const BannerContainer = styled.div`
  padding: 2rem;
  background: var(--dark-blue);

  ${bp.min('tablet')} {
    padding: 4rem;
  }
`;

export const BannerTitle = styled.h1`
  color: var(--white);
  font-size: var(--subtitle-font-size);
  margin-bottom: 1rem;
`;
```

**Après (CSS Modules)** :

```tsx
// banner.component.tsx
import styles from './banner.module.css';

export const Banner = ({ title, subtitle }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p>{subtitle}</p>
  </div>
);
```

```css
/* banner.module.css */
.container {
  padding: 2rem;
  background: var(--dark-blue);
}

@media (min-width: 768px) {
  .container {
    padding: 4rem;
  }
}

.title {
  color: var(--white);
  font-size: var(--subtitle-font-size);
  margin-bottom: 1rem;
}
```

### Exemple : Composant avec conditions

**Avant** :

```tsx
// button.component.tsx
import { StyledButton } from './button.styled';

export const Button = ({ variant, disabled, children }) => (
  <StyledButton $variant={variant} $disabled={disabled}>
    {children}
  </StyledButton>
);
```

```tsx
// button.styled.ts
import styled from 'styled-components';

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary';
  $disabled?: boolean;
}>`
  padding: 1rem 2rem;
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  background: ${props =>
    props.$variant === 'primary' ? 'var(--blue)' : 'var(--grey)'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
`;
```

**Après** :

```tsx
// button.component.tsx
import classNames from 'classnames';
import styles from './button.module.css';

export const Button = ({ variant = 'primary', disabled, children }) => (
  <button
    className={classNames(styles.button, {
      [styles.buttonPrimary]: variant === 'primary',
      [styles.buttonSecondary]: variant === 'secondary',
      [styles.buttonDisabled]: disabled,
    })}
    disabled={disabled}
  >
    {children}
  </button>
);
```

```css
/* button.module.css */
.button {
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
}

.buttonPrimary {
  background: var(--blue);
}

.buttonSecondary {
  background: var(--grey);
}

.buttonDisabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

## Best Practices

### 1. Nommage des classes

- ✅ **camelCase** : Activé dans la config pour utiliser `styles.myClass`
- ✅ **BEM-like** : `.componentName__element--modifier`
- ✅ **Descriptif** : `.cardTitle` plutôt que `.t1`

### 2. Composition

```css
/* Utiliser composes pour réutiliser des styles */
.baseButton {
  padding: 1rem 2rem;
  border: none;
}

.primaryButton {
  composes: baseButton;
  background: var(--blue);
}
```

### 3. Variables CSS globales

Continuer à utiliser les variables de `style.config.json` :

```css
.title {
  color: var(--dark-blue);
  font-size: var(--subtitle-font-size);
  z-index: var(--z-index-navbars);
}
```

### 4. Breakpoints helper (optionnel)

Créer un fichier `_breakpoints.scss` :

```scss
// src/styles/_breakpoints.scss
@mixin mobile {
  @media (max-width: 767px) { @content; }
}

@mixin tablet {
  @media (min-width: 768px) { @content; }
}

@mixin desktop {
  @media (min-width: 1024px) { @content; }
}
```

Usage :
```scss
@import '@/styles/breakpoints';

.container {
  width: 100%;

  @include tablet {
    width: 50%;
  }
}
```

### 5. Tests

Les tests restent identiques :

```tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './myComponent.component';

it('should render', () => {
  render(<MyComponent />);
  // Les classes CSS modules sont automatiquement appliquées
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

## Checklist de Migration

### Phase 1 : Préparation ✅
- [x] Configuration TypeScript
- [x] Configuration Vite
- [x] Configuration StyleLint
- [x] Types CSS Modules
- [x] Documentation

### Phase 2 : Migration Composant par Composant

Pour chaque composant :

- [ ] Créer le fichier `.module.css`
- [ ] Convertir les styled components en classes CSS
- [ ] Adapter les props conditionnelles avec `classNames`
- [ ] Migrer les breakpoints
- [ ] Tester le composant
- [ ] Vérifier dans Storybook
- [ ] Supprimer le fichier `.styled.ts`

### Phase 3 : Nettoyage Final

- [ ] Tous les composants migrés
- [ ] Tests passent
- [ ] Storybook fonctionne
- [ ] Supprimer `styled-components` de `package.json`
- [ ] Supprimer les imports inutiles dans `globalStyled.ts`
- [ ] Mettre à jour AGENTS.md

## Order of Migration

Recommandation d'ordre de migration :

1. **Nouveaux composants** : Commencer directement avec CSS Modules
2. **Composants simples** : Buttons, Cards, badges
3. **Composants isolés** : Components sans beaucoup de dépendances
4. **Layout components** : Banner, Description, Cards lists
5. **Navigation** : Navbars et Footers (plus complexes)
6. **Global styles** : Garder pour la fin

## Ressources

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Vite CSS Modules](https://vitejs.dev/guide/features.html#css-modules)
- [TypeScript Plugin CSS Modules](https://github.com/mrmckeb/typescript-plugin-css-modules)
- [Classnames Library](https://github.com/JedWatson/classnames)

## Support

Pour toute question sur la migration, consulter :
- Le composant exemple dans `/src/design-system/example/`
- Ce guide de migration
- Les patterns existants dans le projet

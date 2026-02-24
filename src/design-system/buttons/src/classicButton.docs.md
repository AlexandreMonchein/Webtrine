# ToggleButton Component

## Description

Le composant `ToggleButton` est un bouton réutilisable qui peut soit basculer entre deux textes différents, soit rediriger vers une page de contact.

## Usage

Ce composant est utilisé directement dans d'autres composants (pas via la configuration JSON).

```tsx
import { ToggleButton } from '@/design-system/buttons/src/classicButton.component';

// Type "call" - Bascule entre deux textes
<ToggleButton
  type="call"
  displayedText="Afficher le numéro"
  hiddenText="+33 1 23 45 67 89"
/>

// Type "redirect" - Redirige vers /contact
<ToggleButton
  type="redirect"
  displayedText="Nous contacter"
  hiddenText="Redirection..."
/>
```

## Props

| Prop | Type | Description | Obligatoire |
|------|------|-------------|-------------|
| `type` | `'call' \| 'redirect'` | Type de comportement du bouton | ✅ |
| `displayedText` | `string` | Texte affiché par défaut | ✅ |
| `hiddenText` | `string` | Texte affiché après toggle (pour type "call") | ✅ |

### Type "call"
- Click initial : affiche `hiddenText`
- Click suivant : affiche `displayedText`
- Toggle répétable à l'infini

### Type "redirect"
- Click redirige vers `/contact`
- Pas de toggle de texte

## Fonctionnalités

### Calcul automatique de largeur
Le composant calcule automatiquement la largeur maximale entre `displayedText` et `hiddenText` pour éviter le redimensionnement lors du toggle.

### Transitions douces
Animations CSS avec `transition` pour les changements d'opacité au hover.

## Fichiers

- **Component**: [classicButton.component.tsx](src/classicButton.component.tsx)
- **Types**: [classicButton.types.ts](src/classicButton.types.ts)
- **Styles**: [classicButton.module.css](src/classicButton.module.css)
- **Stories**: [classicButton.stories.tsx](stories/classicButton.stories.tsx)
- **Tests**: [classicButton.component.int.tsx](src/__tests__/classicButton.component.int.tsx)

## Accessibilité

- ✅ Élément `<button>` sémantique avec `type="button"`
- ✅ Navigation au clavier (Enter/Space)
- ✅ États focus et hover

## Tests

8 tests d'intégration couvrent :
- ✅ Rendu par défaut
- ✅ Toggle entre textes (type "call")
- ✅ Redirection (type "redirect")
- ✅ Calcul de largeur
- ✅ Types TypeScript

```bash
pnpm test:run src/design-system/buttons/src/__tests__/classicButton.component.int.tsx
```

## Storybook

4 stories disponibles :
- **CallType** : Bouton avec toggle de texte
- **RedirectType** : Bouton avec redirection
- **LongText** : Test avec textes longs
- **ShortText** : Test avec textes courts

```bash
pnpm storybook
# → Design System/Buttons/ToggleButton
```

## Variables CSS utilisées

- `--theme-color-background-1` : Couleur de fond du bouton
- `--theme-color-foreground-2` : Couleur du texte

Définies dans `config/customer/{CLIENT}/style.config.json`

## Exemple d'utilisation dans le projet

```tsx
// Dans un composant de contact
<ToggleButton
  type="call"
  displayedText="Afficher le téléphone"
  hiddenText="+33 1 23 45 67 89"
/>

// Dans une section d'action
<ToggleButton
  type="redirect"
  displayedText="Prendre rendez-vous"
  hiddenText="Chargement..."
/>
```

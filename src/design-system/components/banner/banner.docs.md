# Banner Component

## Overview

Composant de bannière hero avec image(s) de fond et texte positionnable. Supporte le carrousel multi-images, les boutons de contact, et plusieurs positions de texte.

## Features

- 🖼️ **Images multiples** : Support du carrousel avec changement automatique et manuel
- 📍 **Positionnement flexible** : 9 positions pour le texte (top-left, center, bottom-right, etc.)
- 🎨 **Hauteur variable** : Mode `medium` pour bannières moins hautes
- 🎭 **Masque d'image** : Overlay optionnel pour améliorer la lisibilité du texte
- 🔘 **Boutons de contact** : Support de boutons d'action intégrés (redirect, toggle)
- ♿ **Accessibilité** : Support clavier pour les sélecteurs de carousel, rôles ARIA

## Props Interface

### BannerDatas

```typescript
interface BannerDatas {
  features: BannerFeatures;
  title?: string;
  subTitle?: string;
  subTitle2?: string;
  images: BannerImage[];
  textPosition: TextPosition;
  contact?: BannerContact[];
  intervalBetweenImages?: number;
}
```

### BannerFeatures

```typescript
interface BannerFeatures {
  multi: boolean;              // Active le carrousel multi-images
  medium: boolean;             // Hauteur moyenne (vs. pleine hauteur)
  textPositionFeature?: boolean;
  mask?: boolean;              // Overlay pour améliorer lisibilité
}
```

### TextPosition (9 positions)

```typescript
type TextPosition =
  | "top-left"
  | "center-left"
  | "bottom-left"
  | "center-top"
  | "center"
  | "center-bottom"
  | "top-right"
  | "center-right"
  | "bottom-right";
```

### BannerImage

```typescript
interface BannerImage {
  name: string;           // Nom du fichier image (sans chemin)
  copyright?: {           // Copyright optionnel
    title?: string;
    link?: string;
  };
}
```

### BannerContact

```typescript
interface BannerContact {
  type: "redirect" | "toggle";
  to?: string;                    // Pour type "redirect"
  displayedText?: string;
  hiddenText?: string;            // Pour type "toggle"
}
```

## Usage Examples

### Bannière simple

```tsx
import Banner from './banner.component';

const simpleBanner = {
  features: { multi: false, medium: true, mask: true },
  title: "Bienvenue sur notre site",
  subTitle: "Découvrez nos services",
  images: [{ name: "hero-image" }],
  textPosition: "center-right"
};

<Banner {...simpleBanner} />
```

### Carrousel multi-images

```tsx
const carouselBanner = {
  features: { multi: true, medium: false, mask: true },
  title: "Notre Portfolio",
  subTitle: "Découvrez nos réalisations",
  images: [
    { name: "project-1" },
    { name: "project-2" },
    { name: "project-3" }
  ],
  textPosition: "center",
  intervalBetweenImages: 5000  // 5 secondes
};

<Banner {...carouselBanner} />
```

### Bannière avec boutons de contact

```tsx
const contactBanner = {
  features: { multi: false, medium: true, mask: true },
  title: "Contactez-nous",
  subTitle: "Notre équipe vous accompagne",
  images: [{ name: "contact-hero" }],
  textPosition: "bottom-left",
  contact: [
    {
      type: "toggle",
      displayedText: "Appeler",
      hiddenText: "+33 1 23 45 67 89"
    },
    {
      type: "redirect",
      to: "contact",
      displayedText: "Formulaire de contact"
    }
  ]
};

<Banner {...contactBanner} />
```

### Image avec copyright

```tsx
const imageCopyright = {
  name: "photographer-image",
  copyright: {
    title: "Photo par John Doe",
    link: "https://unsplash.com/@johndoe"
  }
};
```

## Configuration JSON (client config)

```json
{
  "type": "banner",
  "id": "home-banner",
  "datas": {
    "features": {
      "multi": false,
      "medium": true,
      "mask": true
    },
    "title": "Bienvenue chez Webtrine",
    "subTitle": "Création de sites web sur mesure",
    "images": [
      { "name": "hero-home" }
    ],
    "textPosition": "center-right"
  }
}
```

## CSS Classes

Le composant utilise CSS Modules avec les classes suivantes :

- `.content` : Conteneur principal (section)
- `.backgroundContainer` : Container des images
- `.background` : Image individuelle
- `.active` : Image actuellement visible dans le carousel
- `.textContainer` : Container du texte
- `.topLeft`, `.center`, `.bottomRight`, etc. : Classes de positionnement (9 variants)
- `.title` : Titre principal (h1)
- `.subTitle` : Sous-titres (h2)
- `.selectorsContainer` : Container des sélecteurs de carousel
- `.selector` : Sélecteur individuel
- `.contactContainer` : Container des boutons de contact
- `.overlay` : Overlay quand contact est présent
- `.mask` : Masque d'image pour améliorer lisibilité
- `.medium` : Variante hauteur moyenne
- `.isSplit` : Mode split quand contact présent
- `.redirectLink` : Lien copyright

## Keyboard Navigation

Les sélecteurs de carousel supportent la navigation au clavier :

- **Enter** : Sélectionner une image
- **Space** : Sélectionner une image
- **Tab** : Naviguer entre les sélecteurs

## Carousel Behavior

Quand `features.multi = true` :

1. Changement automatique toutes les `intervalBetweenImages` millisecondes (défaut: 7000ms)
2. Sélecteurs manuels cliquables en bas de la bannière
3. L'intervalle se réinitialise après un changement manuel
4. Support du clavier (Enter/Space sur les sélecteurs)
5. Nettoyage automatique des intervalles au démontage

## Accessibility

- ✅ Balises sémantiques : `<section>`, `<h1>`, `<h2>`, `<a>`
- ✅ `data-testid="bannerRoot"` pour les tests
- ✅ Attributs `role="button"` sur les sélecteurs non-natifs
- ✅ `tabIndex={0}` pour navigation clavier
- ✅ `aria-label` descriptif sur les sélecteurs ("Go to slide 1")
- ✅ Support `onKeyDown` pour Enter et Space
- ✅ Attribut `alt` descriptif sur les images

## Testing

Le composant dispose de 28 tests d'intégration couvrant :

- ✅ Rendering de base avec toutes les props
- ✅ 9 positions de texte
- ✅ Fonctionnalités (medium, mask)
- ✅ Carousel multi-images (render, selectors, click, keyboard)
- ✅ Boutons de contact
- ✅ Liens de copyright
- ✅ Types TypeScript

```bash
pnpm test src/design-system/components/banner/__tests__/banner.component.int.tsx
```

## Migration Notes

### Depuis Styled Components

Ce composant a été migré de Styled Components vers CSS Modules :

- ✅ Conversion des `bp.min()` en `@media (--bp-min-medium)` imbriquées
- ✅ Kebab-case (`bottom-left`) converti en camelCase (`bottomLeft`) pour CSS classes
- ✅ Variables CSS (`var(--dark-blue)`) depuis `style.config.json`
- ✅ Types TypeScript stricts
- ✅ Tests d'intégration complets
- ✅ Accessibilité améliorée (ARIA, keyboard)

### Conversion kebab-case → camelCase

Le composant convertit automatiquement `textPosition` kebab-case en camelCase pour les classes CSS :

```tsx
// Props: textPosition="bottom-left"
// CSS class: styles.bottomLeft
const textPositionClass = textPosition.replace(
  /-([a-z])/g,
  (g) => g[1].toUpperCase()
);
```

## Storybook Stories

4 stories disponibles :

1. **Default** : Bannière standard avec texte centre-droite
2. **WithContact** : Avec bouton de contact intégré
3. **MultipleImages** : Carrousel automatique d'images
4. **MultipleContactButtons** : Plusieurs boutons d'action

```bash
pnpm storybook
```

## Performance

- Images chargées via chemin dynamique : `/assets/${customer}/${imageName}.webp`
- Intervalle de carousel nettoyé au démontage (pas de memory leak)
- CSS Modules avec hash unique (pas de conflits de styles)
- Lazy evaluation des classes conditionnelles avec `classNames()`

## Browser Support

Compatible avec tous les navigateurs modernes supportant :

- CSS Custom Properties (variables)
- CSS Grid
- ES6+ JavaScript
- Custom Media Queries (via PostCSS)

## Related Components

- [ToggleButton](../buttons/src/classicButton.component.tsx) : Utilisé pour les boutons de contact type "toggle"
- [customer.utils](../../../customer.utils.js) : Fonction `getCustomer()` pour le multi-tenant

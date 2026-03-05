# CallToAction Button

Bouton d'appel à l'action réutilisable avec support d'icônes SVG, plusieurs variantes de style et tailles, et un effet de scale au hover.

## Caractéristiques

- ✅ Support d'icônes SVG personnalisées
- ✅ Deux variantes : primaire et secondaire
- ✅ Trois tailles : small, medium, large
- ✅ Deux formes : pill (complètement arrondi) ou rounded (coins arrondis)
- ✅ Effet de scale au hover avec transform
- ✅ Peut être un bouton ou un lien
- ✅ Responsive
- ✅ Accessible (ARIA labels)

## Usage dans un composant React

```tsx
import CallToAction from "@/design-system/buttons/src/callToAction.component";

// Icône SVG personnalisée
const MyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
);

// Bouton simple
<CallToAction
  text="Cliquez ici"
  onClick={() => console.log('Cliqué!')}
/>

// Bouton avec icône
<CallToAction
  text="Découvrir"
  icon={<MyIcon />}
  variant="primary"
  size="large"
  shape="pill"
  onClick={() => console.log('Cliqué!')}
/>

// Bouton avec coins arrondis
<CallToAction
  text="En savoir plus"
  shape="rounded"
  onClick={() => console.log('Cliqué!')}
/>

// Comme lien
<CallToAction
  text="Voir plus"
  href="/plus-d-infos"
  icon={<MyIcon />}
/>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `text` | `string` | **Requis** | Texte affiché dans le bouton |
| `icon` | `ReactNode` | `undefined` | Icône SVG optionnelle affichée avant le texte |
| `onClick` | `() => void` | `undefined` | Fonction appelée lors du clic (ignorée si `href` est défini) |
| `href` | `string` | `undefined` | URL de destination si le bouton est un lien (s'ouvre dans un nouvel onglet) |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Variante de style du bouton |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Taille du bouton |
| `shape` | `"pill" \| "rounded"` | `"pill"` | Forme du bouton |

**Note** : Lorsqu'un `href` est fourni, le bouton est rendu comme un lien `<a>` et s'ouvre automatiquement dans un nouvel onglet avec `target="_blank"` et `rel="noopener noreferrer"` pour la sécurité.

## Variantes de style

### Primary
Bouton avec fond coloré, utilisant les couleurs du thème principal.

### Secondary
Bouton avec fond transparent et bordure, devient coloré au hover.

## Tailles

- **small** : Compact, adapté pour les interfaces denses
- **medium** : Taille standard, recommandée pour la plupart des cas
- **large** : Imposant, pour les CTA principaux

## Formes

- **pill** : Bords complètement arrondis (border-radius: 50px), forme de pilule/capsule moderne et douce
- **rounded** : Coins arrondis (border-radius: 8px), apparence classique et professionnelle

## Effet de scale

Le bouton utilise `transform: scale(1.05)` au hover pour créer un effet d'agrandissement fluide et `scale(0.98)` à l'état actif pour un effet de pression visuel.

## Accessibilité

- Utilise des éléments sémantiques (`<button>` ou `<a>`)
- Inclut automatiquement les attributs ARIA nécessaires
- Support du clavier (Enter, Space pour les boutons)
- Indicateurs de focus visibles

## Exemples d'usage

### Bouton d'action principal
```tsx
<CallToAction
  text="Commencer maintenant"
  variant="primary"
  size="large"
  onClick={handleStart}
/>
```

### Navigation avec icône
```tsx
<CallToAction
  text="En savoir plus"
  href="/about"
  icon={<ArrowRightIcon />}
  variant="secondary"
/>
```

### Action secondaire
```tsx
<CallToAction
  text="Annuler"
  variant="secondary"
  size="small"
  onClick={handleCancel}
/>
```

### Bouton avec coins arrondis
```tsx
<CallToAction
  text="Télécharger"
  shape="rounded"
  icon={<DownloadIcon />}
  onClick={handleDownload}
/>
```

## Notes techniques

- Le composant utilise CSS Modules pour l'isolation des styles
- Les icônes SVG héritent de la couleur du texte via `fill: currentColor`
- Media queries pour ajustements responsive
- Gestion intelligente du type de rendu (button vs anchor) selon les props

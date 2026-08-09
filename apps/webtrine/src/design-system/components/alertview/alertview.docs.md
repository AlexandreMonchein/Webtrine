# AlertView

Composant modal d'alerte/notification full-screen avec overlay, logo, titre, description et bouton d'action optionnel. S'affiche par-dessus tout le contenu pour attirer l'attention de l'utilisateur sur des messages importants, des confirmations, ou guider vers une action.

## Comportement Modal

- **Overlay full-screen** : Fond sombre semi-transparent couvrant toute la page
- **Centré** : Le contenu de l'alerte est centré verticalement et horizontalement
- **Scroll bloqué** : Le scroll de la page est désactivé quand le modal est ouvert
- **Fermeture** : Cliquer sur l'overlay ou le bouton CTA ferme le modal (via `onClose`)
- **Animations** : Apparition en fondu avec slide-in pour le contenu
- **Z-index élevé** : 9999 pour être au-dessus de tout autre contenu

## Implementation

**AlertView n'est pas adressable depuis `config.json`** : contrairement aux composants de la section "Contenu" (`description`, `banner`, `contactBanner`, etc.), il n'a pas d'entrée `"type": "alertview"` dans un `content` de `multiDescriptions`, et il n'existe dans aucun `config/customer/*/config.json` aujourd'hui. C'est un composant React utilisé directement par d'autres composants qui gèrent eux-mêmes leur état d'alerte — par exemple `tattooContact.component.tsx` l'affiche après la soumission du formulaire de contact (succès ou erreur).

### Exemple d'intégration dans un composant

```tsx
import { useState } from "react";
import { AlertView } from "../alertview/alertview.component";

type AlertState = {
  visible: boolean;
  title: string;
  description: string;
  ctaText?: string;
  ctaIcon?: string;
  logo?: string;
};

const MyFormComponent = () => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const handleCloseAlert = () => setAlert(null);

  return (
    <>
      {alert?.visible && (
        <AlertView
          title={alert.title}
          description={alert.description}
          ctaText={alert.ctaText}
          ctaIcon={alert.ctaIcon}
          ctaPosition="right"
          logo={alert.logo}
          onClose={handleCloseAlert}
        />
      )}
      {/* ...formulaire... */}
    </>
  );
};
```

Le composant parent contrôle entièrement la visibilité (ex: `alert?.visible`) et doit fournir `onClose` pour permettre la fermeture ; le bouton CTA ne s'affiche que si `ctaText` **et** `onClose` sont tous les deux fournis.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | `undefined` | Nom du fichier logo (sans extension) depuis `/assets/{customer}/icons/` (ex: "logo_webtrine_mono") |
| `title` | `string` | `undefined` | Titre principal de l'alerte |
| `description` | `string` | `undefined` | Description détaillée |
| `ctaText` | `string` | `undefined` | Texte du bouton call-to-action |
| `ctaIcon` | `string` | `undefined` | Nom de l'icône SVG (sans extension) depuis `/src/assets/icons/` (ex: "chevronRight") |
| `ctaPosition` | `"left" \| "right"` | `undefined` | Position de l'icône sur le bouton CTA (transmise à `CallToAction`) |
| `onClose` | `() => void` | `undefined` | Callback appelé lors de la fermeture (clic CTA ou overlay). Sans `onClose`, le bouton CTA ne s'affiche pas. |

Il n'existe **pas** de prop `variant` ni `ctaLink` sur ce composant : l'apparence ne change pas selon le contexte (succès/erreur/info) — seuls `logo`/`title`/`description`/`ctaText` varient — et la fermeture passe toujours par `onClose` (pas de navigation directe).

## When to use

- ✅ Messages de bienvenue
- ✅ Confirmations d'action (succès, erreur)
- ✅ Notifications importantes
- ✅ Alertes nécessitant une action utilisateur
- ✅ Pages d'état (erreur 404, maintenance)

## Features

- 📦 **Modal full-screen** avec overlay et animations
- 🖼️ Support de logos/images `.webp` depuis `/assets/{customer}/icons/`
- 📱 Responsive avec approche mobile-first (max-height: 80px → 100px)
- 🔒 Bloque le scroll de la page pendant l'affichage
- 🖱️ Fermeture au clic sur overlay ou bouton CTA
- 🎬 Animations d'entrée (fadeIn + slideIn)
- ♿ Accessible (sémantique HTML, gestion focus)
- 🧪 Tests d'intégration complets

## Usage en React

```tsx
import { useState } from "react";
import { AlertView } from "./alertview.component";

const MyComponent = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSuccess = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Alert</button>

      {showAlert && (
        <AlertView
          title="Opération réussie!"
          description="Votre action a été effectuée avec succès."
          ctaText="Continuer"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};
```

## Examples

Ces exemples illustrent différents cas d'usage via React (ce composant n'étant pas piloté par JSON, voir "Implementation" ci-dessus) :

### Alerte de succès

```tsx
<AlertView
  logo="check"
  title="Inscription réussie!"
  description="Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
  ctaText="Se connecter"
  onClose={handleClose}
/>
```

### Alerte d'erreur

```tsx
<AlertView
  logo="warning"
  title="Erreur de connexion"
  description="Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet."
  ctaText="Réessayer"
  onClose={handleClose}
/>
```

### Message informatif

```tsx
<AlertView
  logo="info"
  title="Nouvelle fonctionnalité"
  description="Découvrez notre nouvelle interface utilisateur repensée."
  ctaText="En savoir plus"
  onClose={handleClose}
/>
```

### Sans bouton CTA

```tsx
<AlertView
  logo="bell"
  title="Maintenance programmée"
  description="Le site sera indisponible demain de 2h à 4h du matin."
/>
```

## Customization

Les couleurs sont personnalisables via les variables CSS du thème dans `style.config.json` :

- `--theme-color-background-1` : Fond du modal
- `--theme-color-foreground-1` : Couleur du titre, de la description et du séparateur
- `--theme-color-primary` : Couleur appliquée sur `.logoWrapper`

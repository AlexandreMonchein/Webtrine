# AlertView

Composant modal d'alerte/notification full-screen avec overlay, logo, titre, description et call-to-action. S'affiche par-dessus tout le contenu pour attirer l'attention de l'utilisateur sur des messages importants, des confirmations, ou guider vers une action.

## Comportement Modal

- **Overlay full-screen** : Fond sombre semi-transparent couvrant toute la page
- **Centré** : Le contenu de l'alerte est centré verticalement et horizontalement
- **Scroll bloqué** : Le scroll de la page est désactivé quand le modal est ouvert
- **Fermeture** : Cliquer sur l'overlay ou le bouton CTA ferme le modal
- **Animations** : Apparition en fondu avec slide-in pour le contenu
- **Z-index élevé** : 9999 pour être au-dessus de tout autre contenu

## Implementation

Le composant **AlertView** est chargé automatiquement via la configuration JSON du client.

### Configuration dans `config.json`

Ajoutez cette structure dans votre `config/customer/{CLIENT}/config.json` :

```json
{
  "type": "multiDescriptions",
  "id": "notifications",
  "name": "NotificationsPage",
  "datas": {
    "title": "Notifications",
    "description": "Page de notifications",
    "content": {
      "alertview-1": {
        "type": "alertview",
        "datas": {
          "logo": "logo_webtrine_mono",
          "title": "Bienvenue sur notre plateforme",
          "description": "Découvrez toutes nos fonctionnalités",
          "ctaText": "Commencer",
          "ctaLink": "/start",
          "variant": "default"
        }
      }
    }
  }
}
```

### Structure JSON (4 niveaux)

- **Niveau 1 (Layout)** : `type`, `id`, `name` → Routing et layout
- **Niveau 2 (Metadata)** : `title`, `description` → SEO
- **Niveau 3 (Content)** : Clés `alertview-{number}` → Organisation composants
- **Niveau 4 (Component)** : `type` (nom fichier) + `datas` (props)

### Chargement automatique

1. Le système lit `config.json`
2. Extrait les composants depuis `content` avec clés `alertview-{number}`
3. Charge dynamiquement `src/design-system/components/alertview/alertview.component.tsx`
4. Passe les `datas` comme props au composant

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | `undefined` | Nom du fichier logo (sans extension) depuis `/assets/{customer}/icons/` (ex: "logo_webtrine_mono") |
| `title` | `string` | `undefined` | Titre principal de l'alerte |
| `description` | `string` | `undefined` | Description détaillée |
| `ctaText` | `string` | `undefined` | Texte du bouton call-to-action |
| `ctaIcon` | `string` | `undefined` | Nom de l'icône SVG (sans extension) depuis `/src/assets/icons/` (ex: "chevronRight") |
| `onClose` | `() => void` | `undefined` | Callback appelé lors de la fermeture (clic CTA ou overlay) |
| `variant` | `"default" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Variante visuelle |

## When to use

- ✅ Messages de bienvenue
- ✅ Confirmations d'action (succès, erreur)
- ✅ Notifications importantes
- ✅ Alertes nécessitant une action utilisateur
- ✅ Pages d'état (erreur 404, maintenance)

## Features

- 📦 **Modal full-screen** avec overlay et animations
- 🎨 5 variants : default, info, success, warning, error
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
          variant="success"
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

### Alerte de succès

```json
{
  "type": "alertview",
  "datas": {
    "logo": "check",
    "title": "Inscription réussie!",
    "description": "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
    "ctaText": "Se connecter",
    "ctaLink": "/login",
    "variant": "success"
  }
}
```

### Alerte d'erreur

```json
{
  "type": "alertview",
  "datas": {
    "logo": "warning",
    "title": "Erreur de connexion",
    "description": "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.",
    "ctaText": "Réessayer",
    "ctaLink": "/retry",
    "variant": "error"
  }
}
```

### Message informatif

```json
{
  "type": "alertview",
  "datas": {
    "logo": "info",
    "title": "Nouvelle fonctionnalité",
    "description": "Découvrez notre nouvelle interface utilisateur repensée.",
    "ctaText": "En savoir plus",
    "ctaLink": "/features",
    "variant": "info"
  }
}
```

### Sans bouton CTA

```json
{
  "type": "alertview",
  "datas": {
    "logo": "bell",
    "title": "Maintenance programmée",
    "description": "Le site sera indisponible demain de 2h à 4h du matin.",
    "variant": "warning"
  }
}
```

## Variants

### Default
Variante neutre pour messages généraux.

### Info
Couleur bleue pour informations.

### Success
Couleur verte pour confirmations de succès.

### Warning
Couleur orange pour avertissements.

### Error
Couleur rouge pour erreurs.

## Customization

Les couleurs sont personnalisables via les variables CSS du thème dans `style.config.json` :

- `--theme-color-primary` : Couleur principale (default)
- `--theme-color-utility-4` : Info (bleu)
- `--theme-color-utility-2` : Success (vert)
- `--theme-color-utility-3` : Warning (orange)
- `--theme-color-utility-1` : Error (rouge)

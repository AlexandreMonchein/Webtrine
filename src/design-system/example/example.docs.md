# Example

Composant d'exemple démontrant le pattern CSS Modules et toutes les conventions du Design System Webtrine.

## Implementation

Le composant **Example** n'est jamais importé directement. Il est chargé automatiquement via la configuration JSON du client.

### Configuration dans `config.json`

Ajoutez cette structure dans votre `config/customer/{CLIENT}/config.json` :

```json
{
  "type": "description",
  "id": "multiDescriptions",
  "name": "ExamplePage",
  "datas": {
    "title": "Example Page",
    "description": "Page with example component",
    "content": {
      "description-1": {
        "type": "example",
        "datas": {
          "title": "Example Title",
          "description": "Example description text",
          "variant": "primary"
        }
      }
    }
  }
}
```

### Structure JSON (4 niveaux)

- **Niveau 1 (Layout)** : `type`, `id`, `name` → Routing et layout
- **Niveau 2 (Metadata)** : `title`, `description` → SEO
- **Niveau 3 (Content)** : Clés `{folder}-{number}` → Organisation composants
- **Niveau 4 (Component)** : `type` (nom fichier) + `datas` (props)

### Chargement automatique

1. Le système lit `config.json`
2. Extrait les composants depuis `content` avec clés `{folder}-{number}`
3. Charge dynamiquement `src/design-system/example/example.component.tsx`
4. Passe les `datas` comme props au composant

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Titre optionnel du composant |
| `description` | `string` | `undefined` | Description optionnelle |
| `variant` | `"default" \| "primary" \| "secondary"` | `"default"` | Variante visuelle |
| `disabled` | `boolean` | `false` | État désactivé |
| `children` | `ReactNode` | `undefined` | Contenu enfant |

## When to use

- ✅ Utiliser ce composant comme référence pour créer de nouveaux composants
- ✅ Démonstration du pattern CSS Modules
- ✅ Exemple de toutes les best practices du projet

## Features

- 📦 CSS Modules avec custom media queries
- 🎨 3 variants : default, primary, secondary
- 🚫 État disabled
- 📱 Responsive avec approche mobile-first
- ♿ Accessible (sémantique HTML)
- 🧪 Tests d'intégration complets

## Examples

### Variant Primary

```json
{
  "type": "example",
  "datas": {
    "title": "Primary Example",
    "variant": "primary"
  }
}
```

### Sans titre

```json
{
  "type": "example",
  "datas": {
    "description": "Description without title"
  }
}
```

### Disabled

```json
{
  "type": "example",
  "datas": {
    "title": "Disabled Example",
    "disabled": true
  }
}
```

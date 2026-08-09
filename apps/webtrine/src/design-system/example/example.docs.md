# Example

Composant d'exemple démontrant le pattern CSS Modules et toutes les conventions du Design System Webtrine.

## Implementation

**Note** : `Example` vit dans `src/design-system/example/` (pas sous `src/design-system/components/`) et sert de gabarit de référence pour créer de nouveaux composants — il n'est pas lui-même adressable depuis `config.json` (le dispatcher de `multiDescriptions` ne scanne que `src/design-system/components/**`). Le fragment JSON ci-dessous illustre la structure qu'un composant construit sur ce modèle, **placé sous `components/`**, recevrait via le dispatch dynamique (props passées à plat, sans wrapper `datas`).

### Configuration dans `config.json`

```json
{
  "type": "description",
  "id": "multiDescriptions",
  "name": "ExamplePage",
  "datas": {
    "title": "Example Page",
    "description": "Page with example component",
    "content": {
      "example-1": {
        "type": "example",
        "title": "Example Title",
        "description": "Example description text",
        "variant": "primary"
      }
    }
  }
}
```

### Structure JSON (4 niveaux)

- **Niveau 1 (Layout)** : `type`, `id`, `name` → Routing et layout
- **Niveau 2 (Metadata)** : `title`, `description` → SEO
- **Niveau 3 (Content)** : Clés `{folder}-{number}` → Organisation composants
- **Niveau 4 (Component)** : `type` (nom fichier) + reste des champs de l'entrée passés à plat en props (pas de wrapper `datas` à ce niveau)

### Chargement automatique

1. Le système lit `config.json`
2. Extrait les composants depuis `content` avec clés `{folder}-{number}`
3. Charge dynamiquement `src/design-system/components/{folder}/{type}.component.tsx` (ici `{folder}` = `example`, ce qui pointerait vers `components/example/`, un chemin qui n'existe pas tant que ce composant reste hors de `components/`)
4. Passe le reste de l'entrée (`{type, title, description, ...}`) comme props au composant, via `<Component {...datas} />`

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
  "title": "Primary Example",
  "variant": "primary"
}
```

### Sans titre

```json
{
  "type": "example",
  "description": "Description without title"
}
```

### Disabled

```json
{
  "type": "example",
  "title": "Disabled Example",
  "disabled": true
}
```

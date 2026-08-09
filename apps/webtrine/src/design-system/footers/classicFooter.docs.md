# ClassicFooter - Documentation

Footer classique avec trois sections : logo à gauche, copyright et liens légaux au centre, réseaux sociaux à droite.

## Type de composant

**Type** : `footers`
**ID** : `classicFooter`

## Fonctionnalités

- Logo cliquable avec dimensions automatiques selon le format (carré ou horizontal)
- Copyright Webtrine avec lien
- Liste de liens légaux (mentions légales, confidentialité, etc.)
- Icônes de réseaux sociaux avec liens externes
- Responsive : Stack vertical sur mobile, horizontal sur desktop
- Récupère les données depuis Redux (client, socials, templates)

## Configuration JSON

### Structure minimale

```json
{
  "type": "footers",
  "id": "classicFooter",
  "datas": {
    "logo": {
      "name": "webtrine_logo_2_blanc_noTitle",
      "shape": "square",
      "alt": "logo-webtrine",
      "link": "/"
    }
  }
}
```

### Exemple complet (Webtrine)

```json
{
  "type": "footers",
  "id": "classicFooter",
  "datas": {
    "features": {},
    "logo": {
      "name": "webtrine_logo_2_blanc_noTitle",
      "shape": "square",
      "alt": "logo-webtrine",
      "link": "/"
    }
  }
}
```

### Exemple avec logo horizontal (APT235)

```json
{
  "type": "footers",
  "id": "classicFooter",
  "datas": {
    "logo": {
      "name": "apt235_logo_horizontal",
      "shape": "horizontal",
      "alt": "APT.235 Studio",
      "link": "/"
    }
  }
}
```

### Sans logo

```json
{
  "type": "footers",
  "id": "classicFooter",
  "datas": {}
}
```

## Configuration du logo

### Propriétés du logo

| Propriété | Type | Requis | Description |
|-----------|------|--------|-------------|
| `name` | string | Oui | Nom du fichier du logo (sans extension `.webp`) |
| `shape` | "square" \| "horizontal" | Oui | Format du logo (affecte les dimensions) |
| `alt` | string | Oui | Texte alternatif pour l'accessibilité |
| `link` | string | Oui | URL de destination au clic |

### Dimensions automatiques selon le format

- **`square`** : 48px × 48px
- **`horizontal`** : 72px × 32px

Les dimensions sont gérées automatiquement par `getLogoDimensions(shape)`.

## Données Redux utilisées

### Client

```typescript
const { name: clientName } = useSelector(getClient);
// Utilisé pour construire le chemin des assets : /assets/{clientName}/icons/{logoName}.webp
```

### Socials

```typescript
const socials = useSelector(getSocials);
// Structure attendue :
// {
//   instagram: { link: "https://instagram.com/...", color: "#E4405F" },
//   facebook: { link: "https://facebook.com/...", color: "#1877F2" },
//   linkedin: { link: "https://linkedin.com/...", color: "#0A66C2" }
// }
```

Les icônes sociales sont chargées dynamiquement depuis `/src/assets/icons/`.

### Legals (Templates)

```typescript
const legals = useSelector(getTemplates).filter(
  (template) => template.type === "legals"
);
// Exemple :
// [
//   { type: "legals", datas: { type: "mentions-legals" } },
//   { type: "legals", datas: { type: "confidentialite" } }
// ]
```

## Responsive

### Mobile (< 768px)

- Layout vertical (flex-direction: column)
- Padding réduit : 24px 16px
- Gap entre sections : 16px
- Liens légaux en colonne

### Desktop (≥ 768px)

- Layout horizontal (flex-direction: row)
- Padding : 16px 32px
- Justification : space-between
- Liens légaux en ligne

## Classes CSS

| Classe | Description |
|--------|-------------|
| `.classicFooterRoot` | Container principal du footer |
| `.leftSection` | Section gauche (logo) |
| `.logo` | Image du logo |
| `.middleSection` | Section centrale (copyright + légaux) |
| `.topSection` | Container du copyright |
| `.bottomSection` | Container des liens légaux |
| `.siteRef` | Liens (copyright + légaux) |
| `.rightSection` | Section droite (réseaux sociaux) |
| `.socials` | Container des réseaux sociaux |
| `.socialContent` | Liste `<ul>` des icônes sociales |
| `.socialLogo` | Container d'une icône sociale |

## Accessibilité

- Tag sémantique `<footer>`
- Attribut `aria-label` sur les liens sociaux
- Texte alternatif sur le logo (`alt`)
- data-testid="classicFooterRoot" pour les tests

## Exemples d'utilisation

### Webtrine

Logo carré, texte copyright, liens légaux, réseaux sociaux standards.

### APT235

Logo horizontal, même structure, adaptation mobile/desktop.

### Showcase

Logo carré, démonstration de toutes les fonctionnalités.

## Notes techniques

- **Import dynamique** des icônes sociales via `useLoadComponents`
- **Dimensions du logo** calculées automatiquement selon le `shape`
- **Chemins assets** : `/assets/{CUSTOMER}/icons/{name}.webp`
- **Z-index** : `var(--z-index-navbars)` pour superposition
- **Couleurs** : `var(--theme-color-*)` issues de `style.config.json`

## Migration depuis styled-components

Cette migration a converti :
- `FooterContainer` → `.classicFooterRoot`
- `LeftSection` → `.leftSection`
- `Logo` → `.logo`
- `MiddleSection` → `.middleSection`
- `TopSection` → `.topSection`
- `BottomSection` → `.bottomSection`
- `SiteRef` → `.siteRef`
- `RightSection` → `.rightSection`
- `Socials` → `.socials`
- `SocialContent` → `.socialContent`
- `SocialLogo` → `.socialLogo`

Toutes les media queries sont maintenant imbriquées dans les sélecteurs CSS, conformément au guide de création de composants.

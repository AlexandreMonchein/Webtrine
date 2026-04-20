# BigLogosFooter - Documentation

Footer avec sections distinctes pour logos partenaires, liens de navigation, informations de marque et réseaux sociaux.

## Type de composant

**Type** : `footers`
**ID** : `bigLogosFooter`

## Fonctionnalités

- **Logos partenaires** : Grille de logos cliquables (max 256×256px)
- **Section menu** : Liste de liens de navigation avec titre personnalisé
- **Section marque** : Titre, description HTML et texte additionnel optionnel
- **Réseaux sociaux** : Icônes sociales chargées dynamiquement depuis Redux
- **Copyright** : Lien Webtrine automatique
- **Responsive** : Layout adaptatif 1→3 colonnes selon la taille d'écran
- **Accessibilité** : Labels ARIA, navigation sémantique, focus visible

## Configuration JSON

### Structure complète (Chillpaws)

```json
{
  "type": "footers",
  "id": "bigLogosFooter",
  "datas": {
    "menuSection": {
      "title": "Liens complémentaires:",
      "links": [
        { "label": "FAQ", "url": "/faq" },
        { "label": "Mentions légales", "url": "/mentions-legals" },
        { "label": "Politique de confidentialité", "url": "/confidentialite" }
      ]
    },
    "brandInfo": {
      "title": "Me contacter:",
      "description": "<p><strong>06.24.78.74.42 ou via mon adresse mail: oceanemic.petsitting@gmail.com</strong></p>",
      "additionalText": "Suivez-moi sur les réseaux pour découvrir mes petits protégés!"
    },
    "logos": null
  }
}
```

### Avec logos partenaires

```json
{
  "type": "footers",
  "id": "bigLogosFooter",
  "datas": {
    "menuSection": {
      "title": "Navigation",
      "links": [
        { "label": "Accueil", "url": "/" },
        { "label": "Services", "url": "/services" }
      ]
    },
    "brandInfo": {
      "title": "À propos",
      "description": "<p>Description de votre entreprise</p>",
      "additionalText": "Texte additionnel optionnel"
    },
    "logos": [
      {
        "name": "partner1_logo",
        "alt": "Logo Partenaire 1",
        "url": "https://partner1.com"
      },
      {
        "name": "partner2_logo",
        "alt": "Logo Partenaire 2"
      }
    ]
  }
}
```

### Configuration minimale (sans logos)

```json
{
  "type": "footers",
  "id": "bigLogosFooter",
  "datas": {
    "menuSection": {
      "title": "Liens rapides",
      "links": [
        { "label": "Contact", "url": "/contact" }
      ]
    },
    "brandInfo": {
      "title": "Mon entreprise",
      "description": "<p>Informations de contact</p>"
    }
  }
}
```

## Structure des données

### menuSection

| Propriété | Type | Requis | Description |
|-----------|------|--------|-------------|
| `title` | string | Oui | Titre de la section menu |
| `links` | Link[] | Oui | Liste des liens de navigation |

**Link** :
- `label` : string - Texte du lien
- `url` : string - URL de destination

### brandInfo

| Propriété | Type | Requis | Description |
|-----------|------|--------|-------------|
| `title` | string | Oui | Titre de la section marque |
| `description` | string (HTML) | Oui | Description avec HTML possible |
| `additionalText` | string | Non | Texte additionnel simple |

### logos

| Propriété | Type | Requis | Description |
|-----------|------|--------|-------------|
| `name` | string | Oui | Nom du fichier (sans extension .webp) |
| `alt` | string | Oui | Texte alternatif pour l'accessibilité |
| `url` | string | Non | URL de destination (logo devient cliquable) |

**Note** : Mettre `logos: null` si pas de logos partenaires.

## Données Redux utilisées

### Socials

```typescript
const socials = useSelector(getSocials);
// Structure attendue :
// {
//   facebook: { link: "https://facebook.com/...", color: "full" },
//   instagram: { link: "https://instagram.com/...", color: "full" }
// }
```

Les icônes sont chargées dynamiquement depuis `/src/assets/icons/{name}.component.tsx`.

### Client

```typescript
const { name: clientName } = useSelector(getClient);
// Utilisé pour construire le chemin des logos : /assets/{clientName}/icons/{logoName}.webp
```

## Layout responsive

### Mobile (< 768px)
- 1 colonne
- Stack vertical : Logos → Menu → Marque → Socials
- Padding : 20px 40px
- Gap : 2rem

### Tablet (768px - 1023px)
- 3 colonnes : 0fr 1fr 1fr (sans logos) ou 1fr 1fr 1fr (avec logos)
- Menu : colonne 2
- Marque : colonne 3
- Socials : full width en bas
- Padding : 20px 40px
- Gap : 3rem

### Desktop (≥ 1024px)
- Même layout que tablet
- Padding : 40px 80px

### Wide (≥ 1920px)
- Padding : 40px 240px

## Classes CSS

| Classe | Description |
|--------|-------------|
| `.bigLogosFooterRoot` | Container principal du footer |
| `.footerContent` | Wrapper du contenu |
| `.footerGrid` | Grid layout principal |
| `.footerGrid.isLogo` | Modificateur quand des logos sont présents |
| `.logosSection` | Section des logos partenaires |
| `.logosGrid` | Grille des logos |
| `.logoItem` | Container d'un logo |
| `.logoLink` | Lien autour d'un logo |
| `.logoImage` | Image du logo |
| `.menuSection` | Section menu |
| `.menuTitle` | Titre de la section menu |
| `.menuList` | Liste `<ul>` des liens |
| `.menuListItem` | Item `<li>` de liste |
| `.menuLink` | Lien de navigation |
| `.brandSection` | Section marque |
| `.brandTitle` | Titre de la marque |
| `.brandDescription` | Description (HTML) |
| `.additionalText` | Texte additionnel |
| `.socialSection` | Section réseaux sociaux |
| `.socialList` | Liste `<ul>` des icônes |
| `.socialListItem` | Item `<li>` d'icône |
| `.socialLink` | Lien social |
| `.visuallyHidden` | Texte caché visuellement (accessibilité) |
| `.siteRef` | Lien copyright Webtrine |

## Accessibilité

- Tag sémantique `<footer role="contentinfo">`
- Navigation ARIA : `aria-label="Liens du footer"`, `aria-label="Liens vers les réseaux sociaux"`
- Labels explicites sur tous les liens : `aria-label="Aller vers {label}"`
- Focus visible avec outline 2px
- Texte caché pour screen readers : `.visuallyHidden`
- `target="_blank"` avec `rel="noopener noreferrer"` sur liens externes
- Lazy loading des images : `loading="lazy"`
- Dimensions fixes : `width="128" height="128"` pour éviter CLS

## Chargement dynamique des icônes

Le composant utilise `import.meta.glob` pour charger dynamiquement les icônes sociales :

```typescript
const componentFiles = import.meta.glob(
  "../../../assets/**/**/*.component.tsx",
);
```

Les icônes doivent être dans `/src/assets/icons/{nom}.component.tsx` et exporter un composant SVG par défaut.

## Exemples d'utilisation

### Chillpaws
Footer avec menu, informations de contact, réseaux sociaux. Pas de logos partenaires.

### Avec logos
Footer avec 2+ logos partenaires en première colonne, menu au centre, marque à droite.

### Minimal
Menu et marque uniquement, pas de logos ni réseaux sociaux.

## Notes techniques

- **HTML dans description** : Utilise `dangerouslySetInnerHTML` pour supporter le HTML
- **Icônes dynamiques** : Chargement asynchrone avec `useEffect`
- **Performance** : Lazy loading des images, dimensions fixes
- **SEO** : Balises sémantiques, liens internes/externes
- **Z-index** : Pas de z-index spécifique (footer normal)

## Migration depuis styled-components

Cette migration a converti :
- `FooterContainer` → `.bigLogosFooterRoot`
- `FooterContent` → `.footerContent`
- `FooterGrid` → `.footerGrid`
- `LogosSection` → `.logosSection`
- `LogosGrid` → `.logosGrid`
- `LogoItem` → `.logoItem`
- `LogoLink` → `.logoLink`
- `LogoImage` → `.logoImage`
- `MenuSection` → `.menuSection`
- `MenuTitle` → `.menuTitle`
- `MenuList` → `.menuList`
- `MenuListItem` → `.menuListItem`
- `MenuLink` → `.menuLink`
- `BrandSection` → `.brandSection`
- `BrandTitle` → `.brandTitle`
- `BrandDescription` → `.brandDescription`
- `AdditionalText` → `.additionalText`
- `SocialSection` → `.socialSection`
- `SocialList` → `.socialList`
- `SocialListItem` → `.socialListItem`
- `SocialLink` → `.socialLink`
- `VisuallyHidden` → `.visuallyHidden`
- `SiteRef` → `.siteRef`

Toutes les media queries sont maintenant imbriquées dans les sélecteurs CSS, conformément au guide de création de composants.

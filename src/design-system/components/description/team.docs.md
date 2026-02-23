# Team Component

Composant de présentation d'équipe avec pré-titre, titre, description et grille de membres avec photos rondes.

## Implementation

Le composant **Team** n'est jamais importé directement dans le code. Il est chargé automatiquement par le système de templates via la configuration JSON du client.

### Configuration dans `config.json`

Ajoutez cette structure dans votre `config/customer/{CLIENT}/config.json` :

```json
{
  "type": "description",
  "id": "multiDescriptions",
  "name": "Team",
  "datas": {
    "title": "Our Team",
    "description": "Meet our amazing team of professionals",
    "content": {
      "description-1": {
        "type": "team",
        "datas": {
          "preTitle": "Meet the team",
          "title": "Our Amazing Team",
          "description": "We are a group of passionate professionals dedicated to creating exceptional experiences.",
          "members": [
            {
              "name": "Alexandre Dupont",
              "position": "CEO & Founder",
              "image": "team_alexandre",
              "imageAlt": "Alexandre Dupont profile picture"
            },
            {
              "name": "Marie Laurent",
              "position": "Chief Technology Officer",
              "image": "team_marie",
              "imageAlt": "Marie Laurent profile picture"
            },
            {
              "name": "Thomas Bernard",
              "position": "Lead Designer",
              "image": "team_thomas",
              "imageAlt": "Thomas Bernard profile picture"
            }
          ]
        }
      }
    }
  }
}
```

### Explication de la structure

#### Niveau 1 : Layout & Routing

- **`type`** : `"description"` - Type de layout (description, banner, etc.)
  - ⚠️ Exceptions : `navbars`, `footers`, `errors` n'ont pas cette structure

- **`id`** : `"multiDescriptions"` - ID du système de routing/multi-descriptions
  - Utilisé par le composant `multiDescriptions` pour gérer plusieurs composants sur une même page

- **`name`** : `"Team"` - Nom utilisé pour le routing (URL de la page)
  - Exemple : `/team`, `/about`, `/events`

#### Niveau 2 : Métadonnées de la page

- **`title`** : `"Our Team"` - Titre affiché dans l'onglet du navigateur

- **`description`** : `"Meet our amazing team..."` - Description pour SEO
  - Génère un tag `<meta name="description" content="..." data-react-helmet="true">`
  - Peut être `null` si non nécessaire

#### Niveau 3 : Content (composants de la page)

- **`content`** : Objet contenant tous les composants à afficher
  - Chaque clé suit le format `{folder}-{number}`

- **Clé `"description-1"`** :
  - La partie `description` indique le dossier source → `src/design-system/components/description/`
  - Le nombre `1` permet d'avoir plusieurs instances (description-1, description-2, etc.)
  - Exemples : `banner-1`, `cards-1`, `contact-1`

#### Niveau 4 : Composant

- **`type`** : `"team"` - Nom du fichier composant sans extension → `team.component.tsx`

- **`datas`** : Objet contenant toutes les props du composant

### Chargement automatique

Le composant est chargé dynamiquement via :
1. Le système de routing lit la configuration et détecte `type: "description"` + `id: "multiDescriptions"`
2. Il crée une route avec `name` comme URL
3. Il configure les métadonnées de page (`title`, `description`)
4. Dans `content`, il parse chaque clé pour extraire le dossier (ex: `description` de `description-1`)
5. Il charge `src/design-system/components/description/team.component.tsx` via le `default export`
6. Les `datas` du niveau composant sont passées comme props

### `title` (optional)
Titre principal de la section (h2).

### `description` (optional)
Paragraphe de description de l'équipe.

### `members` (required)
Tableau d'objets représentant les membres de l'équipe :
```ts
{
  name: string;          // Nom du membre (required)
  position?: string;     // Poste dans l'équipe (optional)
  image: string;         // Nom du fichier image sans extension (required)
  imageAlt: string;      // Texte alternatif pour l'image (required)
}
```

## Comportement Responsive

Le composant utilise une grille CSS responsive avec l'approche mobile-first :

- **Mobile (< 768px)** : 1 colonne
- **Tablet (768px+)** : 2 colonnes
- **Desktop (1024px+)** : 3 colonnes
- **Large Desktop (1440px+)** : 4 colonnes

Les images de profil s'agrandissent également avec les breakpoints :
- Mobile : 150px × 150px
- Tablet : 180px × 180px
- Desktop : 200px × 200px

## Caractéristiques

- ✅ Images rondes pour les profils
- ✅ Effet hover sur les images (élévation + ombre)
- ✅ Layout responsive avec CSS Grid
- ✅ Support des membres sans poste (position optionnelle)
- ✅ Section header optionnelle (preTitle, title, description)
- ✅ Utilise CSS Modules pour les styles
- ✅ Approche mobile-first avec custom media queries
- ✅ Chargement automatique des images depuis les assets client
- ✅ Data-testid `"teamRoot"` pour les tests

## Variables CSS utilisées

Le composant utilise les variables CSS du theme client définies dans `style.config.json` :

**Couleurs** :
- `--theme-color-primary` : Couleur du titre et des noms
- `--theme-color-secondary` : Couleur de la description et des postes
- `--theme-color-tertiary` : Couleur du pré-titre
- `--theme-color-background-1` : Fond de la section
- `--theme-color-background-2` : Fond des conteneurs d'image

**Typographie** :
- `--subtitle-font-size` : Taille du titre principal
- `--text-font-size` : Taille des noms de membres
- `--description-font-size` : Taille du pré-titre et des postes

## Accessibilité

- Le titre principal utilise `<h2>` pour la hiérarchie sémantique
- Les noms des membres utilisent `<h3>`
- Toutes les images ont des attributs `alt` obligatoires
- Structure sémantique avec `<section>` pour la section principale

## Tests

Le composant dispose de 13 tests d'intégration couvrant :
- Rendu de tous les éléments
- Gestion des props optionnelles
- Support des membres sans position
- Équipes de différentes tailles (1 à 8+ membres)
- Accessibilité (headings h2 et h3)
- Data-testid "teamRoot" par défaut

Pour exécuter les tests :
```bash
pnpm test src/design-system/components/description/__tests__/team.component.int.tsx
```

## Storybook

Le composant possède 8 stories Storybook documentant différents cas d'usage :
- Configuration complète
- Sans pré-titre
- Sans description
- Titre uniquement
- Sans postes
- Grande équipe (8 membres)
- Petite équipe (2 membres)

Lancez Storybook pour explorer les exemples :
```bash
pnpm storybook
```

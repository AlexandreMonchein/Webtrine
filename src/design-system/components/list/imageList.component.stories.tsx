import type { Meta, StoryObj } from "@storybook/react";
import ImageListComponent from "./imageList.component";

const meta: Meta<typeof ImageListComponent> = {
  component: ImageListComponent,
  title: "Design System/Components/List/ImageList",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Image List Component

Composant pour afficher une liste horizontale d'images avec défilement automatique et boutons de navigation. Supporte les overlays avec boutons d'action et s'adapte automatiquement au contenu. Idéal pour présenter des clients, partenaires ou galeries de projets.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"list-1": {
  "type": "imageList",
  "title": "Ils nous ont fait confiance",
  "subtitle": null,
  "images": [
    {
      "alt": "Logo entreprise cliente: Di Paolo",
      "link": "https://www.labodipaolo.com",
      "src": "dipaolo"
    },
    {
      "alt": "Logo client - Entreprise technologique",
      "link": "https://www.exemple-client.com",
      "src": "client2"
    },
    {
      "alt": "Logo partenaire - Agence créative",
      "link": "https://www.partenaire.fr",
      "src": "partenaire1"
    }
  ],
  "features": null
}
\`\`\`

### Structure des données :
- **title** : Titre principal de la section (obligatoire)
- **subtitle** : Sous-titre optionnel pour donner plus de contexte (optionnel)
- **images** : Tableau d'images à afficher (obligatoire)
  - **src** : Nom du fichier image (sans extension, chargé depuis assets/{customer}/clients/)
  - **alt** : Texte alternatif pour l'accessibilité (obligatoire)
  - **link** : URL de destination au clic (obligatoire)
- **features** : Configuration optionnelle (généralement \`null\`)

### Fonctionnalités automatiques :
- **Défilement horizontal** : Activé automatiquement si le contenu dépasse la largeur
- **Boutons de navigation** : Apparaissent automatiquement pour naviguer dans la liste
- **Overlay interactif** : Bouton "Consulter" apparaît au survol de chaque image
- **Responsive** : S'adapte automatiquement à la taille de l'écran

### Exemple avec de nombreuses images :
\`\`\`json
{
  "images": [
    {
      "alt": "Logo Di Paolo - Laboratoire pharmaceutique",
      "link": "https://www.labodipaolo.com",
      "src": "dipaolo"
    },
    {
      "alt": "Logo TechCorp - Solutions informatiques",
      "link": "https://www.techcorp.fr",
      "src": "techcorp"
    },
    {
      "alt": "Logo Creative Agency - Agence de communication",
      "link": "https://www.creative-agency.com",
      "src": "creative"
    },
    {
      "alt": "Logo StartupX - Innovation technologique",
      "link": "https://www.startupx.io",
      "src": "startupx"
    },
    {
      "alt": "Logo BigCompany - Grande entreprise",
      "link": "https://www.bigcompany.com",
      "src": "bigcompany"
    }
  ]
}
\`\`\`

### Notes importantes :
- Les images sont chargées depuis le dossier \`public/assets/{customer}/clients/\`
- Format d'image recommandé : WebP pour de meilleures performances
- Les liens peuvent être externes (https://) ou internes (#section)
- Le texte alternatif (\`alt\`) est essentiel pour l'accessibilité
- Si le tableau \`images\` est vide, le composant ne s'affiche pas
- Le défilement est fluide et supporte les gestes tactiles sur mobile
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la section",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre optionnel",
    },
    images: {
      control: "object",
      description:
        "Tableau d'images avec src (nom du fichier), alt (texte alternatif), et link (URL de destination). Les images sont chargées depuis assets/{customer}/clients/",
    },
    features: {
      control: "object",
      description:
        "Configuration optionnelle pour personnaliser le comportement",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageListComponent>;

export const Default: Story = {
  name: "Liste d'images par défaut",
  args: {
    title: "Ils nous ont fait confiance",
    subtitle: null,
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo",
        link: "https://www.labodipaolo.com",
        src: "dipaolo",
      },
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Configuration de base avec une seule image. L\'overlay avec bouton "Consulter" apparaît au survol.',
      },
    },
  },
};

export const WithSubtitle: Story = {
  name: "Avec sous-titre",
  args: {
    title: "Nos références",
    subtitle: "Une sélection de nos projets réalisés avec succès",
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo - Laboratoire pharmaceutique",
        link: "https://www.labodipaolo.com",
        src: "dipaolo",
      },
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec titre et sous-titre pour donner plus de contexte à la liste d'images.",
      },
    },
  },
};

export const MultipleImages: Story = {
  name: "Plusieurs images avec défilement",
  args: {
    title: "Notre portfolio clients",
    subtitle: "Découvrez les entreprises qui nous font confiance",
    images: [
      {
        alt: "Logo entreprise cliente: Di Paolo - Laboratoire pharmaceutique",
        link: "https://www.labodipaolo.com",
        src: "dipaolo",
      },
      // Exemples avec placeholder pour démonstration du défilement
      {
        alt: "Logo client - Entreprise technologique",
        link: "#",
        src: "dipaolo", // Réutilisation pour la demo
      },
      {
        alt: "Logo partenaire - Agence créative",
        link: "#",
        src: "dipaolo", // Réutilisation pour la demo
      },
      {
        alt: "Logo client - Start-up innovante",
        link: "#",
        src: "dipaolo", // Réutilisation pour la demo
      },
      {
        alt: "Logo partenaire - Grande entreprise",
        link: "#",
        src: "dipaolo", // Réutilisation pour la demo
      },
    ],
    features: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec plusieurs images pour démontrer le défilement horizontal automatique et les boutons de navigation. Les boutons de défilement apparaissent automatiquement quand le contenu dépasse la largeur du conteneur.",
      },
    },
  },
};

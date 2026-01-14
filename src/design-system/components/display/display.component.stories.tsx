import type { Meta, StoryObj } from "@storybook/react";

import DisplayComponent from "./display.component";

const meta: Meta<typeof DisplayComponent> = {
  component: DisplayComponent,
  title: "Design System/Components/Display",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Display Component

Composant pour afficher une grille de fonctionnalités avec icônes SVG et texte descriptif. Charge dynamiquement les composants d'icônes depuis le dossier assets/icons. Idéal pour présenter des services, avantages ou caractéristiques avec support visuel.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"display-1": {
  "type": "display",
  "features": null,
  "title": "display h2 title data-1",
  "content": [
    {
      "name": "websiteCreation",
      "text": "display p text data-1. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "name": "quality",
      "text": "display p text data-2. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "name": "support",
      "text": "display p text data-3. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ]
}
\`\`\`

### Structure des données :
- **title** : Titre principal de la section (obligatoire)
- **content** : Tableau d'éléments à afficher (obligatoire)
  - **name** : Nom de l'icône (correspond au fichier .component.tsx dans assets/icons)
  - **text** : Texte descriptif affiché sous l'icône

### Icônes disponibles :
- \`websiteCreation\` : Création de sites web
- \`quality\` : Qualité et assurance
- \`support\` : Support technique
- \`colorPalette\` : Design graphique
- \`domain\` : Gestion de domaine
- \`euro\` : Tarifs et prix
- \`facebook\` : Réseau social Facebook
- \`instagram\` : Réseau social Instagram
- \`linkedin\` : Réseau social LinkedIn
- \`youtube\` : Plateforme YouTube
- \`discord\` : Plateforme Discord
- \`france\` : Drapeau France
- \`franceColored\` : Drapeau France en couleur

### Exemple avec de nombreux éléments :
\`\`\`json
{
  "type": "display",
  "id": "all-services",
  "datas": {
    "title": "display h2 title data-1",
    "content": [
      {
        "name": "websiteCreation",
        "text": "display p text data-1"
      },
      {
        "name": "quality",
        "text": "display p text data-2"
      },
      {
        "name": "support",
        "text": "display p text data-3"
      },
      {
        "name": "colorPalette",
        "text": "display p text data-4"
      },
      {
        "name": "domain",
        "text": "display p text data-5"
      },
      {
        "name": "euro",
        "text": "display p text data-6"
      }
    ]
  }
}
\`\`\`

### Exemple thématique - Réseaux sociaux :
\`\`\`json
{
  "type": "display",
  "id": "social-networks",
  "datas": {
    "title": "display h2 title data-1",
    "content": [
      {
        "name": "facebook",
        "text": "display p text data-1"
      },
      {
        "name": "instagram",
        "text": "display p text data-2"
      },
      {
        "name": "linkedin",
        "text": "display p text data-3"
      },
      {
        "name": "youtube",
        "text": "display p text data-4"
      }
    ]
  }
}
\`\`\`

### Notes importantes :
- Les icônes sont chargées depuis \`src/assets/icons/{name}.component.tsx\`
- Assurez-vous que l'icône existe avant de l'utiliser
- Le composant s'adapte automatiquement au nombre d'éléments en grille responsive
- Maximum recommandé : 6-8 éléments pour une lisibilité optimale
- Les icônes sont des composants React SVG optimisés
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
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant name (nom de l'icône) et text (description). Les icônes sont chargées depuis assets/icons/{name}.component.tsx",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DisplayComponent>;

export const Default: Story = {
  name: "Affichage par défaut",
  args: {
    title: "display h2 title data-1",
    content: [
      {
        name: "websiteCreation",
        text: "display p text data-1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        name: "quality",
        text: "display p text data-2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        name: "support",
        text: "display p text data-3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration standard avec 3 éléments affichant des icônes et du texte descriptif en grille.",
      },
    },
  },
};

export const ManyItems: Story = {
  name: "Nombreux éléments",
  args: {
    title: "display h2 title data-1",
    content: [
      {
        name: "websiteCreation",
        text: "display p text data-1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "quality",
        text: "display p text data-2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "support",
        text: "display p text data-3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "colorPalette",
        text: "display p text data-4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "domain",
        text: "display p text data-5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "euro",
        text: "display p text data-6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 6 éléments pour tester l'affichage en grille avec plus de contenu.",
      },
    },
  },
};

export const SocialNetworks: Story = {
  name: "Réseaux sociaux",
  args: {
    title: "display h2 title data-1",
    content: [
      {
        name: "facebook",
        text: "display p text data-1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "instagram",
        text: "display p text data-2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "linkedin",
        text: "display p text data-3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        name: "youtube",
        text: "display p text data-4. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple thématique utilisant les icônes de réseaux sociaux disponibles.",
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import Cards from "./cardsList.component";

const meta: Meta<typeof Cards> = {
  component: Cards,
  title: "Design System/Components/Cards/CardsList",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Cards List Component

Composant pour afficher une liste de cartes avec titre, description et image optionnelle.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"cards-1": {
  "type": "cardsList",
  "features": {
    "displayInline": true
  },
  "title": "cardsList h2 title data-1",
  "description": "cardsList p description data-1",
  "content": [
    {
      "title": "cardsList h3 card-title data-1",
      "description": [
        {
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        }
      ],
      "imageSrc": "square_image"
    },
    {
      "title": "cardsList h3 card-title data-2",
      "description": [
        {
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    },
    {
      "title": "cardsList h3 card-title data-3",
      "description": [
        {
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ],
      "imageSrc": "square_image"
    }
  ]
}
\`\`\`

### Structure des cartes :
- \`title\` : Titre principal de chaque carte
- \`description\` : Texte descriptif détaillé
- \`imageSrc\` : (Optionnel) Nom de l'image carrée à afficher au-dessus du titre

### Options de \`features\` :
- \`displayInline: true\` : Active l'affichage côte à côte avec logique intelligente
- \`displayInline: false\` ou \`null\` : Affichage en pile (par défaut)

### Logique d'affichage intelligent (mode inline) :
- **1 carte** : Toujours en mode stack (pleine largeur)
- **Nombre pair de cartes** :
  - **Mobile** (< 768px) : 1 colonne
  - **Tablette** (768px - 1239px) : 2 colonnes
  - **Desktop large** (≥ 1240px) : 4 colonnes
- **Nombre impair de cartes** :
  - **Mobile** (< 768px) : 1 colonne
  - **Tablette** (768px - 1239px) : 3 colonnes
  - **Desktop large** (≥ 1240px) : 3 colonnes (maintient la symétrie)

### Images :
- Les images sont automatiquement rendues carrées (aspect-ratio: 1)
- Format attendu : \`.webp\`
- Chemin : \`assets/{customer}/{imageSrc}.webp\`
- Si \`imageSrc\` n'est pas fourni, aucune image n'est affichée

### Cas d'usage typiques :
- **Mode stack** : FAQ, témoignages détaillés, descriptions longues
- **Mode inline** : Services, avantages, processus, équipe avec descriptions courtes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal affiché au-dessus des cartes",
    },
    description: {
      control: "text",
      description: "Description affichée au-dessus des cartes",
    },
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant les données des cartes (title, description, imageSrc optionnel)",
    },
    features: {
      control: "object",
      description:
        "Configuration des fonctionnalités : displayInline (true/false) pour l'affichage côte à côte",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cards>;

export const Default: Story = {
  name: "Par défaut",
  args: {
    title: "cardsList h2 title data-1",
    description: "cardsList p description data-1",
    content: [
      {
        title: "cardsList h3 card-title data-1",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
      },
      {
        title: "cardsList h3 card-title data-2",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
      },
      {
        title: "cardsList h3 card-title data-3",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec 3 cartes en mode stack (affichage par défaut), cas d'usage le plus courant pour les descriptions longues.",
      },
    },
  },
};

export const WithImages: Story = {
  name: "Avec images",
  args: {
    title: "cardsList h2 title data-1",
    content: [
      {
        title: "cardsList h3 card-title data-1",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
        imageSrc: "square_image_1",
      },
      {
        title: "cardsList h3 card-title data-2",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
        imageSrc: "square_image_2",
      },
      {
        title: "cardsList h3 card-title data-3",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
        imageSrc: "square_image_3",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec des images carrées au-dessus de chaque titre. Idéal pour présenter des services avec des visuels explicites.",
      },
    },
  },
};

export const InlineDisplay: Story = {
  name: "Affichage côte à côte",
  args: {
    title: "cardsList h2 title data-1",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "cardsList h3 card-title data-1",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
        imageSrc: "square_image_1",
      },
      {
        title: "cardsList h3 card-title data-2",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
        imageSrc: "square_image_2",
      },
      {
        title: "cardsList h3 card-title data-3",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
        imageSrc: "square_image_3",
      },
      {
        title: "cardsList h3 card-title data-4",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
        imageSrc: "square_image_4",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec affichage côte à côte activé (displayInline: true). Responsive : 1 colonne sur mobile, 2 sur tablette, 4 sur desktop.",
      },
    },
  },
};

export const EvenCount: Story = {
  name: "Nombre pair (6 cartes)",
  args: {
    title: "cardsList h2 title data-1",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "cardsList h3 card-title data-1",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_1",
      },
      {
        title: "cardsList h3 card-title data-2",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_2",
      },
      {
        title: "cardsList h3 card-title data-3",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_3",
      },
      {
        title: "cardsList h3 card-title data-4",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_4",
      },
      {
        title: "cardsList h3 card-title data-5",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_1",
      },
      {
        title: "cardsList h3 card-title data-6",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_2",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "6 cartes (nombre pair) : 2 colonnes sur tablette, 4 colonnes sur desktop. Affichage symétrique optimisé.",
      },
    },
  },
};

export const OddCount: Story = {
  name: "Nombre impair (5 cartes)",
  args: {
    title: "cardsList h2 title data-1",
    features: {
      displayInline: true,
    },
    content: [
      {
        title: "cardsList h3 card-title data-1",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_1",
      },
      {
        title: "cardsList h3 card-title data-2",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_2",
      },
      {
        title: "cardsList h3 card-title data-3",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_3",
      },
      {
        title: "cardsList h3 card-title data-4",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_4",
      },
      {
        title: "cardsList h3 card-title data-5",
        description: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
        imageSrc: "square_image_1",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "5 cartes (nombre impair) : 3 colonnes sur tablette et desktop. Évite les déséquilibres visuels.",
      },
    },
  },
};

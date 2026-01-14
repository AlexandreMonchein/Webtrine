import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import DescriptionComponent from "./description.component";

const meta: Meta<typeof DescriptionComponent> = {
  component: DescriptionComponent,
  title: "Design System/Components/Description/Description",
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Description Component

Composant pour afficher une section de description avec du texte, des boutons et une image optionnelle.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"description-1":{
  "type": "description",
  "features": {
    "isReversed": false,
    "isContinuous": false
  },
  "title": "description h2 title data-1",
  "content": [
    {
      "text": "description p text data-1. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "text": "description p text data-2. Lorem ipsum dolor sit amet with <strong>HTML formatting</strong>."
    },
    {
      "button": {
        "label": "description button label data-1",
        "to": "/link-1"
      }
    }
  ],
  "images": [
    {
      "name": "square_image",
      "alt": "description img alt data-1",
      "focusable": false
    }
  ]
}
\`\`\`

### Types de contenu supportés :
- **Texte** : \`{ "text": "Votre contenu texte avec HTML" }\`
- **Bouton** : \`{ "button": { "label": "Texte du bouton", "to": "/lien" } }\`

### Options de \`features\` :
- \`isReversed: true\` : Place l'image à droite du texte
- \`isContinuous: true\` : Affichage continu sans espacement supplémentaire

### Structure de l'image :
- \`name\` : Nom du fichier image (sans extension, .webp sera ajouté)
- \`alt\` : Texte alternatif pour l'accessibilité
- \`focusable\` : Si l'image peut recevoir le focus (navigation clavier)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la section (optionnel)",
    },
    features: {
      control: "object",
      description:
        "Configuration du comportement : isReversed (image à droite), isContinuous (affichage continu)",
    },
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant le texte à afficher ou des boutons. Le texte supporte le HTML (sanitisé avec DOMPurify). Les boutons utilisent React Router Link.",
    },
    images: {
      control: "object",
      description:
        "Tableau d'images : name (nom du fichier), alt (texte alternatif), focusable (accessible au clavier)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DescriptionComponent>;

export const Default: Story = {
  name: "Configuration par défaut",
  args: {
    type: "description",
    features: { isReversed: false, isContinious: false },
    title: "description h2 title data-1",
    content: [
      {
        text: "description p text data-1",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      },
      {
        text: "description p text data-8",
      },
    ],
    images: [
      {
        name: "square_image_1",
        alt: "description img alt data-1",
        focusable: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration standard avec texte à gauche et image à droite. Idéal pour les sections de présentation ou d'introduction.",
      },
    },
  },
};

export const Reversed: Story = {
  name: "Image inversée (à gauche)",
  args: {
    features: {
      isReversed: true,
      isContinious: false,
    },
    title: "description h2 title data-1",
    content: [
      {
        text: "description p text data-1",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      },
    ],
    images: [
      {
        name: "square_image_1",
        alt: "description img alt data-1",
        focusable: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration avec image à gauche et texte à droite (isReversed: true). Permet de varier l'affichage sur une page.",
      },
    },
  },
};

// Nouvelles stories pour couvrir plus de cas d'usage
export const WithoutImage: Story = {
  name: "Sans image",
  args: {
    features: {
      isReversed: false,
      isContinious: false,
    },
    title: "description h2 title data-1",
    content: [
      {
        text: "description p text data-1",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        text: "description p text data-3",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        text: "description p text data-5",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuration sans image pour les sections purement textuelles. Le contenu prend toute la largeur disponible.",
      },
    },
  },
};

export const WithButtons: Story = {
  name: "Avec boutons d'action",
  args: {
    features: {
      isReversed: false,
      isContinious: false,
    },
    title: "description h2 title data-1",
    content: [
      {
        text: "description p text data-1",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        button: {
          label: "description button label data-1",
          to: "/services",
        },
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        button: {
          label: "description button label data-2",
          to: "/contact",
        },
      },
    ],
    images: [
      {
        name: "vertical_image_1",
        alt: "description img alt data-1",
        focusable: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple avec des boutons d'action intégrés dans le contenu. Les boutons utilisent React Router pour la navigation.",
      },
    },
  },
};

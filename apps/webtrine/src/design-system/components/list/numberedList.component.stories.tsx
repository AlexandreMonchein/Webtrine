import type { Meta, StoryObj } from "@storybook/react";

import NumberedListComponent from "./numberedList.component";

const meta: Meta<typeof NumberedListComponent> = {
  component: NumberedListComponent,
  title: "Design System/Components/List/NumberedList",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Numbered List Component

Composant pour afficher une liste numérotée avec titres et descriptions. Chaque élément est automatiquement numéroté avec un cercle stylisé. Excellent pour présenter des processus, étapes, instructions ou workflows de manière claire et séquentielle.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"list-1": {
  "type": "numberedList",
  "features": null,
  "title": "numberedList h2 title data-1",
  "content": [
    {
      "title": "numberedList h3 step-title data-1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      "title": "numberedList h3 step-title data-2",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      "title": "numberedList h3 step-title data-3",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      "title": "numberedList h3 step-title data-4",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    },
    {
      "title": "numberedList h3 step-title data-5",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
    }
  ]
}
\`\`\`

### Structure des données :
- **title** : Titre principal de la liste (optionnel, peut être vide)
- **content** : Tableau d'étapes numérotées (obligatoire)
  - **title** : Titre de l'étape (obligatoire)
  - **description** : Explication détaillée de l'étape (obligatoire)

### Cas d'usage recommandés :
- **Processus de création** : Étapes de développement d'un projet
- **Instructions** : Guide pas-à-pas pour les utilisateurs
- **Workflow** : Processus métier ou technique
- **Tutoriels** : Étapes d'apprentissage
- **Procédures** : Méthodes organisationnelles
- **Timeline** : Chronologie d'un projet

### Fonctionnalités automatiques :
- **Numérotation automatique** : Chaque étape est numérotée séquentiellement (1, 2, 3...)
- **Design responsive** : S'adapte automatiquement à tous les écrans
- **Accessibilité** : Structure sémantique optimisée pour les lecteurs d'écran
- **Style cohérent** : Cercles numérotés stylisés avec typographie harmonieuse

### Notes importantes :
- La numérotation commence toujours à 1 et s'incrémente automatiquement
- Le titre principal peut être omis (chaîne vide) pour plus de flexibilité
- Idéal pour 2 à 8 étapes maximum pour une lecture optimale
- Les descriptions peuvent contenir plusieurs phrases
- Le composant est optimisé pour l'accessibilité (rôles ARIA appropriés)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la liste",
    },
    content: {
      control: "object",
      description:
        "Tableau d'objets contenant title (titre de l'étape) et description (explication détaillée)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberedListComponent>;

export const Default: Story = {
  name: "Liste numérotée standard",
  args: {
    title: "numberedList h2 title data-1",
    content: [
      {
        title: "numberedList h3 step-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        title: "numberedList h3 step-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "numberedList h3 step-title data-3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      },
      {
        title: "numberedList h3 step-title data-4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
      {
        title: "numberedList h3 step-title data-5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple complet avec 5 étapes d'un processus de création de site web. Chaque étape est numérotée automatiquement avec un design claire et accessible.",
      },
    },
  },
};

export const ShortProcess: Story = {
  name: "Processus court",
  args: {
    title: "numberedList h2 title data-1",
    content: [
      {
        title: "numberedList h3 step-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      {
        title: "numberedList h3 step-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version simplifiée avec seulement 2 étapes pour tester l'affichage minimal du composant.",
      },
    },
  },
};

export const TechnicalSteps: Story = {
  name: "Étapes techniques",
  args: {
    title: "numberedList h2 title data-1",
    content: [
      {
        title: "numberedList h3 step-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        title: "numberedList h3 step-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        title: "numberedList h3 step-title data-3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      },
      {
        title: "numberedList h3 step-title data-4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple orienté technique pour démontrer l'utilisation dans un contexte de développement logiciel.",
      },
    },
  },
};

export const WithoutTitle: Story = {
  name: "Sans titre principal",
  args: {
    title: "",
    content: [
      {
        title: "numberedList h3 step-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        title: "numberedList h3 step-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      {
        title: "numberedList h3 step-title data-3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test du composant sans titre principal pour une utilisation plus flexible dans différents contextes.",
      },
    },
  },
};

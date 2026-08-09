import type { Meta, StoryObj } from "@storybook/react";

import DataTable from "./dataTable.component";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: "Design System/Components/DataTable",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DataTable Component

Composant de tableau flexible permettant d'afficher des données tabulaires avec un design épuré et responsive.

## Utilisation

\`\`\`tsx
import DataTable from './dataTable.component';

const datas = {
  title: "dataTable h2 title data-1", // Optionnel
  subTitle: "dataTable p subtitle data-1", // Optionnel
  features: { // Optionnel
    centeredTitles: false,
    centerContent: false
  },
  content: {
    columns: [
      { header: "dataTable th header data-1", key: "name" },
      { header: "dataTable th header data-2", key: "description" },
      { header: "dataTable th header data-3", key: "price" }
    ],
    data: [
      { name: "dataTable td data-1-1", description: "Lorem ipsum dolor sit amet", price: "99€" },
      { name: "dataTable td data-2-1", description: "Lorem ipsum dolor sit amet", price: "149€" }
    ]
  }
};

<DataTable {...datas} />
\`\`\`

## Props

- **title**: Titre du tableau (optionnel)
- **subTitle**: Sous-titre du tableau (optionnel)
- **features**: Objet contenant les options d'affichage (optionnel) :
  - **centeredTitles**: Centre le titre et sous-titre (défaut: false)
  - **centerContent**: Centre le contenu des cellules (défaut: false)
- **content**: Objet contenant les données du tableau avec :
  - **columns**: Array d'objets définissant les colonnes (header, key)
  - **data**: Array d'objets contenant les données à afficher
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Titre du tableau (optionnel)",
    },
    subTitle: {
      control: "text",
      description: "Sous-titre du tableau (optionnel)",
    },
    features: {
      control: "object",
      description: "Options d'affichage du tableau",
    },
    content: {
      control: "object",
      description: "Objet contenant toutes les données du tableau",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Données d'exemple basées sur votre tableau de tarifs
const pricingColumns = [
  { header: "dataTable th header data-1", key: "type" },
  { header: "dataTable th header data-2", key: "detail" },
  { header: "dataTable th header data-3", key: "price" },
];

const pricingData = [
  {
    type: "dataTable td data-1-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-1-3",
  },
  {
    type: "dataTable td data-2-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-2-3",
  },
  {
    type: "dataTable td data-3-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-3-3",
  },
  {
    type: "dataTable td data-4-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-4-3",
  },
  {
    type: "dataTable td data-5-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-5-3",
  },
  {
    type: "dataTable td data-6-1",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: "dataTable td data-6-3",
  },
];

// Données d'exemple simples
const simpleColumns = [
  { header: "dataTable th header data-1", key: "name" },
  { header: "dataTable th header data-2", key: "email" },
  { header: "dataTable th header data-3", key: "role" },
];

const simpleData = [
  {
    name: "dataTable td data-1-1",
    email: "dataTable td data-1-2",
    role: "dataTable td data-1-3",
  },
  {
    name: "dataTable td data-2-1",
    email: "dataTable td data-2-2",
    role: "dataTable td data-2-3",
  },
  {
    name: "dataTable td data-3-1",
    email: "dataTable td data-3-2",
    role: "dataTable td data-3-3",
  },
  {
    name: "dataTable td data-4-1",
    email: "dataTable td data-4-2",
    role: "dataTable td data-4-3",
  },
];

export const Default: Story = {
  args: {
    title: "dataTable h2 title data-1",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
  },
};

export const CenteredTitles: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
    features: {
      centeredTitles: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemple avec les titres centrés",
      },
    },
  },
};

export const CenteredContent: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
    features: {
      centerContent: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemple avec le contenu du tableau centré",
      },
    },
  },
};

export const FullyCentered: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
    features: {
      centeredTitles: true,
      centerContent: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemple avec tout centré : titres et contenu",
      },
    },
  },
};

export const PricingTable: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: pricingColumns,
      data: pricingData,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemple de tableau de tarifs avec titre, sous-titre et contenu détaillé",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    title: "dataTable h2 title data-1",
    subTitle: "dataTable p subtitle data-1",
    content: {
      columns: simpleColumns,
      data: [],
    },
  },
  parameters: {
    docs: {
      description: {
        story: "État du tableau lorsqu'il n'y a pas de données à afficher",
      },
    },
  },
};

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
  title: "Mon tableau", // Optionnel
  subTitle: "Description du tableau", // Optionnel
  features: { // Optionnel
    centeredTitles: false,
    centerContent: false
  },
  content: {
    columns: [
      { header: "Nom", key: "name" },
      { header: "Description", key: "description" },
      { header: "Prix", key: "price" }
    ],
    data: [
      { name: "Produit 1", description: "Description du produit", price: "99€" },
      { name: "Produit 2", description: "Autre description", price: "149€" }
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
  { header: "Type de prestation", key: "type" },
  { header: "Détail", key: "detail" },
  { header: "Tarif HT", key: "price" },
];

const pricingData = [
  {
    type: "Suppression / modification simple",
    detail: "Texte, bouton, image, groupe d'élément simple",
    price: "10 – 30 €",
  },
  {
    type: "Ajout",
    detail: "Ajouter une image, un bouton, une section simple",
    price: "40 €",
  },
  {
    type: "Création / modification de style",
    detail: "Ajustements de style, responsive",
    price: "50 – 100 €",
  },
  {
    type: "Nouveau composant au sein d'une section/page",
    detail: "Nouveau composant",
    price: "100 – 200 €",
  },
  {
    type: "Nouvelle section",
    detail: 'Ex : "À propos", "Contact" avec formulaire simple...',
    price: "150 – 300 €",
  },
  {
    type: "Nouvelle page complète",
    detail: "Nouvelle page avec structure, contenu et responsive",
    price: "250 – 500 €",
  },
];

// Données d'exemple simples
const simpleColumns = [
  { header: "Nom", key: "name" },
  { header: "Email", key: "email" },
  { header: "Rôle", key: "role" },
];

const simpleData = [
  { name: "John Doe", email: "john@example.com", role: "Développeur" },
  { name: "Jane Smith", email: "jane@example.com", role: "Designer" },
  { name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
  { name: "Alice Brown", email: "alice@example.com", role: "Développeur" },
];

export const Default: Story = {
  args: {
    title: "Tableau d'exemple",
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
    title: "Équipe de développement",
    subTitle: "Liste des membres actifs",
    content: {
      columns: simpleColumns,
      data: simpleData,
    },
  },
};

export const CenteredTitles: Story = {
  args: {
    title: "Équipe de développement",
    subTitle: "Liste des membres actifs",
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
    title: "Équipe de développement",
    subTitle: "Liste des membres actifs",
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
    title: "Équipe de développement",
    subTitle: "Liste des membres actifs",
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
    title: "Tarifs des prestations complémentaires",
    subTitle: "Détail des tarifs pour les modifications et ajouts sur votre site vitrine",
    content: {
      columns: pricingColumns,
      data: pricingData,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Exemple de tableau de tarifs avec titre, sous-titre et contenu détaillé",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    title: "Aucune donnée disponible",
    subTitle: "Le tableau est vide",
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

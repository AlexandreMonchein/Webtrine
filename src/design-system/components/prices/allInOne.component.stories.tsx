import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import AllInOneComponent from "./allInOne.component";

const meta: Meta<typeof AllInOneComponent> = {
  title: "Design System/Components/Prices/AllInOne",
  component: AllInOneComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# All In One Component

Composant pour afficher une offre tout-en-un avec prix, fonctionnalités et descriptions.

## Configuration JSON pour intégration

Copiez et adaptez cette configuration dans votre \`config.json\` :

\`\`\`json
"prices-1": {
  "type": "allInOne",
  "features": {},
  "title": "L'offre complète :",
  "descriptionTop": "Description principale de votre offre tout-en-un.",
  "content": [
    {
      "imgSrc": "nom_icone_1",
      "text": "Première fonctionnalité incluse"
    },
    {
      "imgSrc": "nom_icone_2",
      "text": "Deuxième fonctionnalité incluse"
    },
    {
      "imgSrc": "nom_icone_3",
      "text": "Troisième fonctionnalité avec conditions *"
    }
  ],
  "descriptionBottom": [
    {
      "text": "* Conditions d'utilisation ou restrictions"
    },
    {
      "text": "** Informations complémentaires"
    }
  ],
  "price": "450,00€ HT",
  "per": null,
  "additionalDescription": "Information supplémentaire sur l'offre"
}
\`\`\`

### Structure des éléments :
- \`content[].imgSrc\` : Nom de l'icône (correspond aux composants dans assets/icons/)
- \`content[].text\` : Description de la fonctionnalité
- \`descriptionBottom\` : Notes et conditions en bas de page
- \`per\` : Unité de temps pour le prix (\`"mois"\`, \`"an"\`, ou \`null\`)
- \`additionalDescription\` : Description supplémentaire optionnelle

### Icônes disponibles :
- \`colorPalette\` : Charte graphique
- \`websiteCreation\` : Création de site
- \`domain\` : Nom de domaine
- \`lodging\` : Hébergement
- \`support\` : Support/maintenance
- \`pencil\` : Modifications
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AllInOneComponent>;

export const Default: Story = {
  args: {
    content: [
      {
        imgSrc: "colorPalette",
        text: "Création de votre charte graphique",
      },
      {
        imgSrc: "websiteCreation",
        text: "Création de votre site vitrine",
      },
      {
        imgSrc: "domain",
        text: "Création de votre nom de domaine *",
      },
      {
        imgSrc: "lodging",
        text: "Hébergement de votre site vitrine **",
      },
    ],
    title: "L'offre Webtrine:",
    descriptionTop:
      "Webtrine, c'est une offre tout-en-un : un package complet pour créer et lancer votre site sans prise de tête.",
    descriptionBottom: [
      {
        text: "* Si vous le faites héberger chez nous - ** Pour un supplément de 250€/an HT",
      },
    ],
    price: "450,00€",
    per: "HT",
    buttonText: "Commencer maintenant",
    additionalDescription: "Paiement en plusieurs fois possible",
  },
  parameters: {
    docs: {
      description: {
        story: "Offre complète Webtrine avec toutes les fonctionnalités.",
      },
    },
  },
};

export const BasicOffer: Story = {
  args: {
    content: [
      {
        imgSrc: "websiteCreation",
        text: "Création de votre site vitrine",
      },
      {
        imgSrc: "domain",
        text: "Support technique inclus",
      },
    ],
    title: "Offre basique:",
    descriptionTop: "Une offre simplifiée pour démarrer rapidement.",
    descriptionBottom: [{ text: "Parfait pour les petites entreprises" }],
    price: "350,00€",
    per: "HT",
    buttonText: "Choisir cette offre",
  },
  parameters: {
    docs: {
      description: {
        story: "Version simplifiée de l'offre all-in-one.",
      },
    },
  },
};

import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import BigLogosFooter from "./bigLogosFooter.component";
import { BigLogosFooterProps } from "./bigLogosFooter.types";

// Create mock store with socials data
const createMockStore = (socials = {}) => {
  return configureStore({
    reducer: {
      client: (state = { socials, name: "showcase" }, action) => state,
      layout: (state = {}, action) => state,
    },
  });
};

const meta: Meta<typeof BigLogosFooter> = {
  title: "Design System/Footers/BigLogosFooter",
  component: BigLogosFooter,
  decorators: [
    (Story, context) => {
      const storyName = context.name;
      let mockSocials = {};

      // Configure différents réseaux sociaux selon la story
      if (storyName !== "Sans réseaux sociaux") {
        mockSocials = {
          facebook: { link: "https://facebook.com/example", color: "full" },
          instagram: { link: "https://instagram.com/example", color: "full" },
        };
      }

      const mockStore = createMockStore(mockSocials);
      return (
        <Provider store={mockStore}>
          <Story />
        </Provider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# BigLogosFooter Component

Le composant BigLogosFooter est un footer avec des sections distinctes pour les liens de navigation, les informations de marque et les réseaux sociaux.

## Implémentation

Pour utiliser ce composant dans votre configuration JSON :

\`\`\`json
"footer-1": {
  "menuSection": {
    "title": "Besoin de réponses ? Faites un tour sur la foire aux questions !",
    "links": [
      { "label": "FAQ", "url": "/pages/faq" },
      { "label": "Mentions légales", "url": "/policies/legal-notice" },
      { "label": "Conditions générales", "url": "/policies/terms-of-service" }
    ]
  },
  "brandInfo": {
    "title": "GÉNA ET COMPAGNIE - PET SITTER CERTIFIÉE - LYON ET ALENTOURS",
    "description": "<p><strong>06.29.92.58.40 ou genaetcompagnie@gmail.com</strong></p>",
    "contact": "06.29.92.58.40 ou genaetcompagnie@gmail.com",
    "additionalText": "Suivez-moi sur les réseaux pour découvrir mes petits protégés !"
  },
  "logos": [
    { "name": "partner1", "alt": "Partenaire 1", "url": "https://partner1.com" },
    { "name": "partner2", "alt": "Partenaire 2" }
  ]
}
\`\`\`

## Fonctionnalités

- **Responsive** : S'adapte automatiquement aux différentes tailles d'écran
- **Accessible** : Respect des normes W3C avec navigation ARIA et labels appropriés
- **Réseaux sociaux** : Chargement dynamique des icônes depuis le store Redux
- **Logos partenaires** : Affichage de logos en grille 2 colonnes (max 128x128px)
- **Configurabilité** : Chaque section peut être activée/désactivée indépendamment
- **CLS optimisé** : Pas de décalage de contenu grâce aux dimensions fixes des éléments
        `,
      },
    },
  },
  argTypes: {
    menuSection: {
      description: "Section des liens de navigation dans le footer.",
      control: "object",
    },
    brandInfo: {
      description: "Informations de la marque affichées dans le footer.",
      control: "object",
    },
    logos: {
      description: "Liste des logos partenaires à afficher dans le footer.",
      control: "object",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BigLogosFooter>;

const defaultArgs: BigLogosFooterProps = {
  menuSection: {
    title: "Besoin de réponses ? Faites un tour sur la foire aux questions !",
    links: [
      { label: "FAQ", url: "/pages/faq" },
      { label: "Mentions légales", url: "/policies/legal-notice" },
      { label: "Conditions générales", url: "/policies/terms-of-service" },
    ],
  },
  brandInfo: {
    title: "GÉNA ET COMPAGNIE - PET SITTER CERTIFIÉE - LYON ET ALENTOURS",
    description:
      "<p><strong>06.29.92.58.40 ou genaetcompagnie@gmail.com</strong></p>",
    additionalText:
      "Suivez-moi sur les réseaux pour découvrir mes petits protégés !",
  },
  logos: [
    {
      name: "label_france_petsitters",
      alt: "Partenaire",
    },
  ],
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  name: "Default",
};

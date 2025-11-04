import type { Meta, StoryObj } from "@storybook/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import BigLogosFooter from "./bigLogosFooter.component";
import { BigLogosFooterProps } from "./bigLogosFooter.types";

// Create mock store with socials data
const createMockStore = (socials = {}) => {
  return configureStore({
    reducer: {
      client: (state = { socials, name: "showcase" }, action) => state,
      layout: (state = {}, action) => state
    }
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
  "type": "bigLogosFooter",
  "features": {
    "showSocialLinks": true,
    "showBrandInfo": true,
    "showMenuSection": true,
    "showLogos": true
  },
  "content": {
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
    type: {
      control: false,
      description: 'Type du composant (toujours "bigLogosFooter")',
    },
    features: {
      description: "Configuration des fonctionnalités du footer",
      control: "object",
    },
    content: {
      description: "Contenu du footer (sections menu et brand)",
      control: "object",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BigLogosFooter>;

const defaultArgs: BigLogosFooterProps = {
  type: "bigLogosFooter",
  features: {
    showSocialLinks: true,
    showBrandInfo: true,
    showMenuSection: true,
  },
  content: {
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
      contact: "06.29.92.58.40 ou genaetcompagnie@gmail.com",
      additionalText:
        "Suivez-moi sur les réseaux pour découvrir mes petits protégés !",
    },
  },
};

export const WithoutSocialLinks: Story = {
  args: {
    ...defaultArgs,
    features: {
      ...defaultArgs.features,
      showSocialLinks: false,
    },
  },
  name: "Sans réseaux sociaux",
};

export const MinimalFooter: Story = {
  args: {
    type: "bigLogosFooter",
    features: {
      showSocialLinks: true,
      showBrandInfo: true,
      showMenuSection: true,
    },
    content: {
      menuSection: {
        title: "Liens utiles",
        links: [
          { label: "Contact", url: "/contact" },
          { label: "Mentions légales", url: "/legal" },
        ],
      },
      brandInfo: {
        title: "Mon Entreprise",
        description: "<p>Description courte de l'entreprise</p>",
        contact: "contact@monentreprise.fr",
      },
    },
  },
  name: "Footer minimal",
};

export const WithLogos: Story = {
  args: {
    type: "bigLogosFooter",
    features: {
      showSocialLinks: true,
      showBrandInfo: true,
      showMenuSection: true,
      showLogos: true,
    },
    content: {
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
        contact: "06.29.92.58.40 ou genaetcompagnie@gmail.com",
        additionalText:
          "Suivez-moi sur les réseaux pour découvrir mes petits protégés !",
      },
      logos: [
        { name: "logo_dipaolo", alt: "Partenaire 1", url: "https://partner1.com" },
        { name: "webtrine_logo_2_blanc_noTitle", alt: "Partenaire 2", url: "https://partner2.com" },
        { name: "logo_chillpaws_color_2", alt: "Partenaire 3", url: "https://partner3.com" },
      ],
    },
  },
  name: "Avec logos partenaires",
};

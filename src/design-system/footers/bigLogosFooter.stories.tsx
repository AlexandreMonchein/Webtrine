import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import BigLogosFooter from "./bigLogosFooter.component";
import type { BigLogosFooterProps } from "./bigLogosFooter.types";

// Create mock store with socials data
const createMockStore = (socials = {}) => {
  return configureStore({
    reducer: {
      state: (state = { client: { name: "showcase" }, socials }) => state,
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
        component:
          "Footer avec sections distinctes pour logos partenaires, liens de navigation, informations de marque et réseaux sociaux. Adaptatif mobile/desktop.",
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
    title: "Liens complémentaires:",
    links: [
      { label: "FAQ", url: "/faq" },
      { label: "Mentions légales", url: "/mentions-legals" },
      { label: "Politique de confidentialité", url: "/confidentialite" },
    ],
  },
  brandInfo: {
    title: "Me contacter:",
    description:
      "<p><strong>06.24.78.74.42 ou oceanemic.petsitting@gmail.com</strong></p>",
    additionalText:
      "Suivez-moi sur les réseaux pour découvrir mes petits protégés !",
  },
  logos: [
    {
      name: "banner_1",
      alt: "Logo partenaire",
    },
  ],
};

// Story Overview - Vue d'ensemble de tous les cas d'usage
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3>Footer complet avec logos</h3>
        <BigLogosFooter {...defaultArgs} />
      </div>

      <div>
        <h3>Footer sans logos</h3>
        <BigLogosFooter
          menuSection={defaultArgs.menuSection}
          brandInfo={defaultArgs.brandInfo}
        />
      </div>

      <div>
        <h3>Footer sans section marque</h3>
        <BigLogosFooter
          menuSection={defaultArgs.menuSection}
          logos={defaultArgs.logos}
        />
      </div>

      <div>
        <h3>Footer minimal (menu seulement)</h3>
        <BigLogosFooter menuSection={defaultArgs.menuSection} />
      </div>
    </div>
  ),
};

// Footer complet avec tous les éléments
export const Complet: Story = {
  args: {
    ...defaultArgs,
  },
};

// Footer sans logos partenaires
export const SansLogos: Story = {
  args: {
    menuSection: defaultArgs.menuSection,
    brandInfo: defaultArgs.brandInfo,
  },
};

// Footer sans section marque
export const SansSectionMarque: Story = {
  args: {
    menuSection: defaultArgs.menuSection,
    logos: defaultArgs.logos,
  },
};

// Footer minimal
export const Minimal: Story = {
  args: {
    menuSection: defaultArgs.menuSection,
  },
};

// Footer avec plusieurs logos
export const AvecPlusieursLogos: Story = {
  args: {
    ...defaultArgs,
    logos: [
      { name: "banner_1", alt: "Logo Partenaire 1" },
      {
        name: "banner_1",
        alt: "Logo Partenaire 2",
        url: "https://partner2.com",
      },
    ],
  },
};

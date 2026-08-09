import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ClassicFooter from "./classicFooter.component";
import type { ClassicFooterProps } from "./classicFooter.types";

// Mock Redux store pour Storybook
const mockStore = configureStore({
  reducer: {
    state: (
      state = {
        client: { name: "showcase" },
        socials: {
          instagram: {
            link: "https://instagram.com/showcase",
            color: "#E4405F",
          },
          facebook: { link: "https://facebook.com/showcase", color: "#1877F2" },
          linkedin: {
            link: "https://linkedin.com/company/showcase",
            color: "#0A66C2",
          },
        },
        templates: [
          { type: "legals", datas: { type: "mentions-legals" } },
          { type: "legals", datas: { type: "confidentialite" } },
        ],
      },
    ) => state,
  },
});

const meta: Meta<typeof ClassicFooter> = {
  title: "Design System/Footers/ClassicFooter",
  component: ClassicFooter,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Footer classique avec logo, liens légaux et réseaux sociaux. Adaptatif mobile/desktop.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClassicFooter>;

// Args par défaut pour réutilisation
const defaultArgs: ClassicFooterProps = {
  logo: {
    name: "banner_1",
    shape: "square",
    alt: "Logo Showcase",
    link: "/",
  },
};

// Story Overview - Vue d'ensemble de tous les cas d'usage
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3>Footer avec logo carré</h3>
        <ClassicFooter {...defaultArgs} />
      </div>

      <div>
        <h3>Footer avec logo horizontal</h3>
        <ClassicFooter
          logo={{
            name: "banner_1",
            shape: "horizontal",
            alt: "Logo Showcase Horizontal",
            link: "/",
          }}
        />
      </div>

      <div>
        <h3>Footer sans logo</h3>
        <ClassicFooter />
      </div>
    </div>
  ),
};

// Story par défaut avec logo carré
export const AvecLogoCarré: Story = {
  args: {
    ...defaultArgs,
  },
};

// Story avec logo horizontal
export const AvecLogoHorizontal: Story = {
  args: {
    logo: {
      name: "banner_1",
      shape: "horizontal",
      alt: "Logo Showcase Horizontal",
      link: "/",
    },
  },
};

// Story sans logo
export const SansLogo: Story = {
  args: {},
};

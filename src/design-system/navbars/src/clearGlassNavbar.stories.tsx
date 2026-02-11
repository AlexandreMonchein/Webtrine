import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import i18n from "../../../i18n";
import { ClearGlassNavbar } from "./clearGlassNavbar.component";

const meta: Meta<typeof ClearGlassNavbar> = {
  title: "Navbars/ClearGlassNavbar",
  component: ClearGlassNavbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
            <Story />
          </div>
        </I18nextProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logo: {
      control: "text",
      description: "Nom du logo à charger dynamiquement",
    },
    links: {
      control: "object",
      description: "Liste des liens de navigation",
    },
    activePath: {
      control: "text",
      description: "Chemin actif pour le styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClearGlassNavbar>;

const defaultLinks = [
  { label: "HOME", path: "/" },
  { label: "BOOK A TATTOO", path: "/book" },
  { label: "THE ARTISTS", path: "/artists" },
  { label: "THE STUDIO", path: "/studio" },
  { label: "EVENT", path: "/event" },
  { label: "FAQ", path: "/faq" },
];

/**
 * Version par défaut de la burger navbar avec logo et liens de navigation.
 */
export const Default: Story = {
  args: {
    logo: "logo_showcase",
    links: defaultLinks,
    activePath: "/",
  },
};

/**
 * Navbar avec un chemin actif différent pour voir le style de lien actif.
 */
export const ActiveLink: Story = {
  args: {
    logo: "logo_showcase",
    links: defaultLinks,
    activePath: "/artists",
  },
};

/**
 * Navbar avec un logo personnalisé.
 */
export const CustomLogo: Story = {
  args: {
    logo: "logo_chillpaws_color_2",
    links: defaultLinks,
    activePath: "/",
  },
};

/**
 * Navbar avec moins de liens pour un site simple.
 */
export const SimplifiedNav: Story = {
  args: {
    logo: "logo_showcase",
    links: [
      { label: "HOME", path: "/" },
      { label: "ABOUT", path: "/about" },
      { label: "CONTACT", path: "/contact" },
    ],
    activePath: "/",
  },
};

/**
 * Playground pour tester différentes configurations.
 */
export const Playground: Story = {
  args: {
    logo: "logo_showcase",
    links: defaultLinks,
    activePath: "/",
  },
};

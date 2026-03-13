import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initialState, stateReducer } from "../../../store/state.reducer";
import ClassicNavbar from "../classicNavbar.component";
import type { ClassicNavbarProps } from "../classicNavbar.types";

// Store mocké pour Storybook avec les données client
const mockStore = configureStore({
  reducer: stateReducer,
  preloadedState: {
    ...initialState,
    client: {
      name: "showcase",
    },
    socials: {
      instagram: { link: "https://instagram.com" },
      facebook: { link: "https://facebook.com" },
    },
  } as any,
});

const defaultArgs: ClassicNavbarProps = {
  features: {
    isFixed: false,
    hasHideOnScroll: false,
    trad: false,
    darkMode: false,
    shouldDisplaySocials: true,
  },
  categories: [
    {
      name: "Accueil",
      link: "/",
    },
    {
      name: "Services",
      sub: [
        {
          name: "Développement web",
          link: "/services/web",
        },
        {
          name: "Design",
          link: "/services/design",
        },
      ],
    },
    {
      name: "À propos",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ],
  content: {
    logo: {
      name: "webtrine_logo_2_blanc_noTitle",
      shape: "horizontal",
    },
  },
  toggleTheme: () => {},
  theme: "light",
};

const meta: Meta<typeof ClassicNavbar> = {
  title: "Design System/Components/Navbars/ClassicNavbar",
  component: ClassicNavbar,
  tags: ["autodocs"],
  args: defaultArgs,
  argTypes: {
    features: {
      description:
        "Configuration des fonctionnalités de la navbar (position fixe, masquage au scroll, traduction, mode sombre, réseaux sociaux)",
      control: { type: "object" },
    },
    categories: {
      description:
        "Liste des catégories de navigation. Chaque catégorie peut avoir des sous-catégories optionnelles",
      control: { type: "object" },
    },
    content: {
      description:
        "Contenu de la navbar incluant la configuration du logo et optionnellement le lien Calendly",
      control: { type: "object" },
    },
    actionButton: {
      description:
        "Configuration optionnelle d'un bouton d'action (ex: bouton d'appel)",
      control: { type: "object" },
    },
    toggleTheme: {
      description:
        "Fonction callback pour basculer entre les modes clair et sombre",
      control: false,
    },
    theme: {
      description: "Thème actuel de l'application",
      control: { type: "radio" },
      options: ["light", "dark"],
    },
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <div style={{ minHeight: "300px" }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ClassicNavbar>;

/**
 * Aperçu de tous les cas d'usage du composant ClassicNavbar
 */
export const Overview: Story = {
  render: () => (
    <Provider store={mockStore}>
      <BrowserRouter>
        <div>
          <h3>Navbar basique</h3>
          <ClassicNavbar {...defaultArgs} />

          <h3 style={{ marginTop: "100px" }}>
            Navbar avec traduction et mode sombre
          </h3>
          <ClassicNavbar
            {...defaultArgs}
            features={{
              ...defaultArgs.features,
              trad: true,
              darkMode: true,
            }}
          />

          <h3 style={{ marginTop: "100px" }}>
            Navbar fixe avec masquage au scroll
          </h3>
          <ClassicNavbar
            {...defaultArgs}
            features={{
              ...defaultArgs.features,
              isFixed: true,
              hasHideOnScroll: true,
            }}
          />

          <h3 style={{ marginTop: "100px" }}>Navbar avec bouton d'action</h3>
          <ClassicNavbar
            {...defaultArgs}
            actionButton={{
              type: "call",
              displayedText: "Nous contacter",
              hiddenText: "+33 1 23 45 67 89",
            }}
          />

          <h3 style={{ marginTop: "100px" }}>Navbar avec Calendly</h3>
          <ClassicNavbar
            {...defaultArgs}
            content={{
              ...defaultArgs.content,
              calendly: {
                url: "https://calendly.com/exemple",
              },
            }}
          />

          <h3 style={{ marginTop: "100px" }}>Navbar sans réseaux sociaux</h3>
          <ClassicNavbar
            {...defaultArgs}
            features={{
              ...defaultArgs.features,
              shouldDisplaySocials: false,
            }}
          />
        </div>
      </BrowserRouter>
    </Provider>
  ),
};

import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initialState, stateReducer } from "../../../store/state.reducer";
import ClassicNavbar from "../src/classicNavbar.component";

interface Category {
  name: string;
  link: string;
  subCategories?: Array<{
    name: string;
    link: string;
  }>;
}

// Interface définissant les props du composant ClassicNavbar
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ClassicNavbarProps {
  features: {
    isFixed: boolean;
    hasHideOnScroll: boolean;
    trad: boolean;
    darkMode: boolean;
  };
  categories: Category[];
  content: {
    logo: { name: string };
  };
  toggleTheme: () => void;
  theme: string;
}

// Store mocké pour Storybook avec les données client
const mockStore = configureStore({
  reducer: stateReducer,
  preloadedState: {
    ...initialState,
    client: {
      name: "showcase",
    },
  },
});

const meta: Meta<typeof ClassicNavbar> = {
  title: "Design System/Navbars/ClassicNavbar",
  component: ClassicNavbar,
  tags: ["autodocs"],
  args: {
    features: {
      isFixed: false,
      hasHideOnScroll: false,
      trad: false,
      darkMode: false,
    },
    categories: [
      {
        name: "classicNavbar a link data-1",
        link: "/",
      },
      {
        name: "classicNavbar a link data-2",
        link: "/services",
      },
      {
        name: "classicNavbar a link data-3",
        link: "/about",
      },
      {
        name: "classicNavbar a link data-4",
        link: "/contact",
      },
    ],
    content: {
      logo: { name: "webtrine_logo_2_blanc_noTitle" },
    },
    toggleTheme: () => {},
    theme: "light",
  },
  argTypes: {
    features: {
      description: "Configuration des fonctionnalités de la navbar",
    },
    categories: {
      description: "Liste des catégories de navigation",
    },
    content: {
      description: "Contenu de la navbar (logo, etc.)",
    },
    toggleTheme: {
      description: "Fonction pour basculer le thème",
    },
    theme: {
      description: "Thème actuel (light ou dark)",
      control: { type: "radio" },
      options: ["light", "dark"],
    },
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ClassicNavbar>;

export const Playground: Story = {};

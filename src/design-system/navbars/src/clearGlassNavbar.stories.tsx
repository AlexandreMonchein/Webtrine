import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import i18n from "../../../i18n";
import { initialState, stateReducer } from "../../../store/state.reducer";
import { ClearGlassNavbar } from "./clearGlassNavbar.component";

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

const meta: Meta<typeof ClearGlassNavbar> = {
  title: "Design System/Navbars/ClearGlassNavbar",
  component: ClearGlassNavbar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
              <Story />
            </div>
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
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
 * Version par défaut de la navbar avec logo personnalisé.
 */
export const Default: Story = {
  args: {
    logo: "logo_chillpaws_color_2",
    links: defaultLinks,
    activePath: "/",
  },
};

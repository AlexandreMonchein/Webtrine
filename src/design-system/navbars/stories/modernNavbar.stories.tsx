import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initialState, stateReducer } from "../../../store/state.reducer";
import ModernNavbar from "../src/modernNavbar.component";
import type { ModernNavbarProps, NavItem } from "../src/modernNavbar.types";

// Store mocké pour Storybook avec les données client
const mockStore = configureStore({
  reducer: stateReducer,
  preloadedState: {
    ...initialState,
    client: {
      name: "showcase", // Nom du client pour les assets
    },
  },
});

// Mock data pour la navigation
const mockNavigationItems: NavItem[] = [
  {
    label: "modernNavbar a link data-1",
    href: "/",
  },
  {
    label: "modernNavbar a link data-2",
    subItems: [
      {
        label: "modernNavbar a sublink data-2-1",
        href: "/services/web-dev",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        label: "modernNavbar a sublink data-2-2",
        href: "/services/design",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        label: "modernNavbar a sublink data-2-3",
        href: "/services/seo",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        label: "modernNavbar a sublink data-2-4",
        href: "/services/ecommerce",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  {
    label: "modernNavbar a link data-3",
    href: "/portfolio",
  },
  {
    label: "modernNavbar a link data-4",
    href: "/contact",
  },
];

const meta: Meta<typeof ModernNavbar> = {
  title: "Design System/Navbars/ModernNavbar",
  component: ModernNavbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# ModernNavbar

Une navbar moderne et responsive avec support des sous-menus.

## Implémentation

Pour utiliser ce composant dans votre configuration JSON :

\`\`\`json
{
  "type": "navbars",
  "id": "modernNavbar",
  "datas": {
    "logo": {
      "name": "logo-principal",
      "alt": "modernNavbar img alt data-1"
    },
    "navigationItems": [
      {
        "label": "modernNavbar a link data-1",
        "href": "/"
      },
      {
        "label": "modernNavbar a link data-2",
        "subItems": [
          {
            "label": "modernNavbar a sublink data-2-1",
            "href": "/services/web-dev",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            "label": "modernNavbar a sublink data-2-2",
            "href": "/services/design",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            "label": "modernNavbar a sublink data-2-3",
            "href": "/services/seo",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        ]
      },
      {
        "label": "modernNavbar a link data-3",
        "subItems": [
          {
            "label": "modernNavbar a sublink data-3-1",
            "href": "/solutions/startups",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            "label": "modernNavbar a sublink data-3-2",
            "href": "/solutions/pme",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        ]
      },
      {
        "label": "modernNavbar a link data-4",
        "href": "/portfolio"
      },
      {
        "label": "modernNavbar a link data-5",
        "href": "/contact"
      }
    ]
  }
}
\`\`\`

## Fonctionnalités

- **Design moderne**: Interface épurée avec animations fluides
- **Responsive**: Menu desktop avec dropdowns + menu mobile hamburger
- **Navigation avancée**: Support des sous-catégories avec descriptions optionnelles
- **Accessibilité**: Navigation clavier, ARIA, focus management complet
- **Performance**: Animations optimisées, gestion des états intelligente
- **Mobile-first**: Breakpoints adaptatifs et touch-friendly

## Configuration

- **Logo**: Dimensions optimales 150-200px de largeur, hauteur adaptative
- **Navigation**: Maximum recommandé de 6-8 éléments principaux
- **Sous-menus**: Support illimité avec descriptions optionnelles
- **Breakpoints**: Suit le système mobile-first du design system
        `,
      },
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
  argTypes: {
    logo: {
      description: "Configuration du logo avec nom de fichier et alt",
      control: { type: "object" },
    },
    navigationItems: {
      description: "Éléments de navigation avec sous-menus optionnels",
      control: { type: "object" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ModernNavbarProps>;

// Story principale avec navigation complète
export const Default: Story = {
  args: {
    logo: {
      name: "logo_chillpaws_color_2",
      alt: "modernNavbar img alt data-1",
    },
    navigationItems: mockNavigationItems,
  },
};

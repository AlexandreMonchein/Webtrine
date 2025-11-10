import type { Meta, StoryObj } from "@storybook/react";
import ModernNavbar from "../src/modernNavbar.component";
import type { ModernNavbarProps, NavItem } from "../src/modernNavbar.types";
import { initialState, stateReducer } from "../../../store/state.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

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
    label: "Accueil",
    href: "/",
  },
  {
    label: "Services",
    subItems: [
      {
        label: "Développement Web",
        href: "/services/web-dev",
        description: "Sites web modernes et applications React",
      },
      {
        label: "Design UX/UI",
        href: "/services/design",
        description: "Interface utilisateur et expérience client",
      },
      {
        label: "SEO & Marketing",
        href: "/services/seo",
        description: "Référencement et stratégie digitale",
      },
      {
        label: "E-commerce",
        href: "/services/ecommerce",
        description: "Boutiques en ligne et solutions de vente",
      },
    ],
  },
  {
    label: "Solutions",
    subItems: [
      {
        label: "Pour les Startups",
        href: "/solutions/startups",
        description: "Solutions adaptées aux jeunes entreprises",
      },
      {
        label: "Pour les PME",
        href: "/solutions/pme",
        description: "Accompagnement des entreprises établies",
      },
      {
        label: "Entreprises",
        href: "/solutions/entreprises",
        description: "Solutions enterprise et sur mesure",
      },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "À propos",
    subItems: [
      {
        label: "Notre équipe",
        href: "/about/team",
        description: "Rencontrez les experts derrière vos projets",
      },
      {
        label: "Notre histoire",
        href: "/about/story",
        description: "Découvrez notre parcours et nos valeurs",
      },
      {
        label: "Carrières",
        href: "/about/careers",
        description: "Rejoignez notre équipe dynamique",
      },
    ],
  },
  {
    label: "Contact",
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
  "header": {
    "logo": {
      "name": "logo-principal",
      "alt": "Logo de l'entreprise"
    },
    "navigation": [
      {
        "label": "Accueil",
        "href": "/"
      },
      {
        "label": "Services",
        "subItems": [
          {
            "label": "Développement Web",
            "href": "/services/web-dev",
            "description": "Sites web modernes et applications React"
          },
          {
            "label": "Design UX/UI",
            "href": "/services/design",
            "description": "Interface utilisateur et expérience client"
          }
        ]
      },
      {
        "label": "Contact",
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
      alt: "Logo de l'entreprise"
    },
    navigationItems: mockNavigationItems,
  },
};
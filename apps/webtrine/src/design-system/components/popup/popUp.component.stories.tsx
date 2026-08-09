import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import PopUpComponent from "./popUp.component";

// Create a mock store for Storybook
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      popUp: (
        state = {
          showPopUp: true,
          type: "success",
          message: "Message par défaut",
          error: null,
          ...initialState,
        },
        action,
      ) => {
        switch (action.type) {
          case "HIDE_POPUP":
            return { ...state, showPopUp: false };
          default:
            return state;
        }
      },
    },
  });
};

interface StoryArgs {
  storeState?: {
    showPopUp?: boolean;
    type?: "success" | "warning" | "error";
    message?: string;
    error?: any;
  };
}

const meta: Meta<typeof PopUpComponent> = {
  title: "Design System/Components/PopUp",
  component: PopUpComponent,
  decorators: [
    (Story, context) => {
      const args = context.args as StoryArgs;
      const mockStore = createMockStore(args.storeState);
      return (
        <Provider store={mockStore}>
          <Story />
        </Provider>
      );
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Composant PopUp pour afficher des notifications avec auto-fermeture et barre de progression.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PopUpComponent>;

export const Default: Story = {
  args: {
    storeState: {
      showPopUp: true,
      type: "success",
      message: "Votre action a été effectuée avec succès !",
      error: null,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "PopUp par défaut avec message de succès.",
      },
    },
  },
};

export const WarningPopup: Story = {
  args: {
    storeState: {
      showPopUp: true,
      type: "warning",
      message:
        "Attention ! Cette action est irréversible. Veuillez confirmer votre choix.",
      error: null,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "PopUp d'avertissement avec message de précaution.",
      },
    },
  },
};

export const ErrorPopup: Story = {
  args: {
    storeState: {
      showPopUp: true,
      type: "error",
      message:
        "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
      error: null,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "PopUp d'erreur pour signaler un problème.",
      },
    },
  },
};

export const ErrorWithDetails: Story = {
  args: {
    storeState: {
      showPopUp: true,
      type: "error",
      message: "Erreur lors de la connexion au serveur.",
      error: {
        code: 500,
        message: "Internal Server Error",
        stack: "Error: Failed to fetch\n    at fetchData (app.js:42:15)",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "PopUp d'erreur avec détails techniques pour le débogage.",
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    storeState: {
      showPopUp: true,
      type: "success",
      message:
        "Félicitations ! Votre commande a été validée avec succès. Vous recevrez un email de confirmation dans les prochaines minutes avec tous les détails de votre achat. Notre équipe préparera votre commande dans les plus brefs délais.",
      error: null,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "PopUp avec un message long pour tester l'affichage du contenu étendu.",
      },
    },
  },
};

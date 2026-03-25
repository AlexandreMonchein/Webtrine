import type { Meta, StoryObj } from "@storybook/react";

import { AlertView } from "./alertview.component";
import type { AlertViewProps } from "./alertview.types";

// defaultArgs : Définir UNE FOIS, réutiliser partout
const defaultArgs: AlertViewProps = {
  logo: "logo_webtrine_mono",
  title: "Bienvenue sur notre plateforme",
  description:
    "Découvrez toutes les fonctionnalités que nous avons à vous offrir. Commencez dès maintenant votre aventure avec nous.",
  ctaText: "Commencer",
  onClose: () => {
    // Close handler
  },
};

const meta: Meta<typeof AlertView> = {
  title: "Design System/Components/AlertView/AlertView",
  component: AlertView,
  tags: ["autodocs"],
  argTypes: {
    logo: {
      control: "text",
      description:
        "Nom du fichier logo (sans extension .webp) depuis /assets/{customer}/icons/",
    },
    title: {
      control: "text",
      description: "Titre principal de l'alerte",
    },
    description: {
      control: "text",
      description: "Description détaillée",
    },
    ctaText: {
      control: "text",
      description: "Texte du bouton call-to-action",
    },
    ctaIcon: {
      control: "text",
      description:
        "Nom de l'icône SVG (sans extension) depuis /src/assets/icons/",
    },
    onClose: {
      action: "closed",
      description: "Callback appelé lors de la fermeture",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlertView>;

// Story Overview : Affiche tous les cas d'usage
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3>Variant par défaut</h3>
        <AlertView {...defaultArgs} />
      </div>
    </div>
  ),
};

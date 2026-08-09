import type { Meta, StoryObj } from "@storybook/react";

import BannerComponent from "./banner.component";
import type { BannerDatas } from "./banner.types";

// defaultArgs : Définir UNE FOIS, réutiliser partout
const defaultArgs: BannerDatas = {
  features: {
    multi: false,
    medium: true,
    mask: true,
  },
  title: "Webtrine",
  subTitle: "Il n'a jamais été aussi simple de confectionner un site",
  images: [{ name: "banner_1" }],
  textPosition: "center-right",
};

const meta: Meta<typeof BannerComponent> = {
  component: BannerComponent,
  title: "Design System/Components/Banner/Banner",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Titre principal de la bannière",
    },
    subTitle: {
      control: "text",
      description: "Sous-titre optionnel",
    },
    textPosition: {
      control: "select",
      options: [
        "center",
        "center-left",
        "center-right",
        "bottom-left",
        "bottom-right",
      ],
      description: "Position du texte sur la bannière",
    },
    images: {
      control: "object",
      description: "Tableau d'images de fond avec nom et copyright optionnel",
    },
    features: {
      control: "object",
      description:
        "Configuration : multi (carrousel), medium (taille), textPositionFeature",
    },
    contact: {
      control: "object",
      description: "Boutons d'action optionnels (redirect, contact, etc.)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BannerComponent>;

// Overview : OBLIGATOIRE - Tous les cas d'usage pour visual testing (Chromatic)
export const Overview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Bannière par défaut
        </h3>
        <BannerComponent {...defaultArgs} />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Avec bouton contact
        </h3>
        <BannerComponent
          {...defaultArgs}
          title="Contactez-nous pour plus de renseignements"
          subTitle="Notre équipe vous accompagne dans votre projet web"
          textPosition="center-left"
          contact={[
            {
              type: "redirect",
              displayedText: "Aller au formulaire de contact",
              hiddenText: "contact",
            },
          ]}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Carrousel d'images
        </h3>
        <BannerComponent
          {...defaultArgs}
          title="Notre portfolio"
          subTitle="Découvrez nos réalisations à travers différents projets"
          images={[
            { name: "horizontal_image_1" },
            { name: "horizontal_image_2" },
            { name: "horizontal_image_3" },
          ]}
          textPosition="center"
          features={{ multi: true, medium: true, mask: true }}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem", color: "#666" }}>
          Plusieurs boutons d'action
        </h3>
        <BannerComponent
          {...defaultArgs}
          title="Prêt à commencer votre projet ?"
          subTitle="Contactez-nous ou découvrez nos tarifs"
          textPosition="center"
          contact={[
            {
              type: "redirect",
              displayedText: "Nous contacter",
              hiddenText: "contact",
            },
            {
              type: "redirect",
              displayedText: "Voir nos tarifs",
              hiddenText: "pricing",
            },
          ]}
        />
      </div>
    </div>
  ),
};

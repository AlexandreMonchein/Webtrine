import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import DescriptionComponent from "./description.component";

const defaultArgs = {
  type: "description" as const,
  features: {
    isReversed: false,
    isContinious: false,
    isCentered: false,
    isTextBefore: false,
  },
  title: "Notre histoire et nos valeurs",
  hash: "section-description",
  content: [
    {
      text: "Depuis notre création, nous nous engageons à offrir des services de qualité qui dépassent les attentes de nos clients.",
    },
    {
      text: "Notre équipe passionnée travaille chaque jour pour innover et créer des solutions sur mesure adaptées à vos besoins spécifiques.",
    },
    {
      text: "Nous croyons fermement que <strong>la qualité</strong> et <strong>l'attention aux détails</strong> font toute la différence dans la réussite de chaque projet.",
    },
  ],
  images: [
    {
      name: "square_image_1",
      alt: "Image illustrant notre approche",
      focusable: false,
    },
  ],
};

const meta: Meta<typeof DescriptionComponent> = {
  component: DescriptionComponent,
  title: "Design System/Components/Description/Description",
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: false,
      description: "Type de template (toujours 'description')",
    },
    features: {
      control: "object",
      description:
        "Configuration du comportement : isReversed, isContinious, isCentered, isTextBefore",
    },
    title: {
      control: "text",
      description: "Titre principal de la section (optionnel)",
    },
    hash: {
      control: "text",
      description: "Ancre pour la navigation (optionnel)",
    },
    content: {
      control: "object",
      description:
        "Tableau d'éléments de contenu (texte ou bouton). Le texte supporte le HTML (sanitisé avec DOMPurify)",
    },
    images: {
      control: "object",
      description:
        "Tableau d'images avec name, alt, focusable et description optionnelle",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DescriptionComponent>;

export const Overview: Story = {
  name: "Vue d'ensemble",
  args: defaultArgs,
  render: (args) => (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
        Configuration par défaut
      </h3>
      <DescriptionComponent {...args} />

      <hr style={{ margin: "60px 0", border: "1px solid #e0e0e0" }} />

      <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
        Image inversée (à droite)
      </h3>
      <DescriptionComponent
        {...args}
        features={{ ...args.features, isReversed: true }}
        title="Une approche différente"
        content={[
          {
            text: "En inversant la disposition, nous créons un effet visuel différent qui permet de varier l'apparence de vos pages.",
          },
          {
            text: "Cette configuration est idéale pour alterner les sections et maintenir l'intérêt visuel de vos visiteurs.",
          },
        ]}
      />

      <hr style={{ margin: "60px 0", border: "1px solid #e0e0e0" }} />

      <h3 style={{ textAlign: "center", marginBottom: "40px" }}>Sans image</h3>
      <DescriptionComponent
        {...args}
        title="Du texte, simplement"
        images={[]}
        content={[
          {
            text: "Parfois, <strong>le contenu textuel seul</strong> est suffisant pour transmettre votre message de manière claire et efficace.",
          },
          {
            text: "Cette configuration permet de se concentrer uniquement sur le texte, sans distraction visuelle. Le contenu prend toute la largeur disponible.",
          },
          {
            text: "Idéal pour les sections explicatives, les mentions légales ou tout autre contenu nécessitant une lecture approfondie.",
          },
        ]}
      />

      <hr style={{ margin: "60px 0", border: "1px solid #e0e0e0" }} />

      <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
        Avec boutons d'action
      </h3>
      <DescriptionComponent
        {...args}
        title="Passez à l'action"
        images={[
          {
            name: "vertical_image_1",
            alt: "Illustration pour l'appel à l'action",
            focusable: false,
          },
        ]}
        content={[
          {
            text: "Découvrez comment nous pouvons transformer vos idées en réalité grâce à notre expertise et notre passion.",
          },
          {
            button: {
              label: "Découvrir nos services",
              to: "/services",
            },
          },
          {
            text: "Notre équipe est prête à vous accompagner dans tous vos projets, du concept à la réalisation.",
          },
          {
            button: {
              label: "Nous contacter",
              to: "/contact",
            },
          },
        ]}
      />

      <hr style={{ margin: "60px 0", border: "1px solid #e0e0e0" }} />

      <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
        Affichage continu (isContinious)
      </h3>
      <DescriptionComponent
        {...args}
        features={{ ...args.features, isContinious: true }}
        title="Section sans espacement supplémentaire"
        content={[
          {
            text: "L'option <strong>isContinious</strong> permet d'afficher la section sans padding vertical supplémentaire.",
          },
          {
            text: "Cela permet de créer un flux continu entre plusieurs sections adjacentes, idéal pour des designs épurés.",
          },
        ]}
      />
    </div>
  ),
};

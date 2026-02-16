import type { Meta, StoryObj } from "@storybook/react";

import ContactBanner from "./contactBanner.component";

const meta: Meta<typeof ContactBanner> = {
  title: "Components/ContactBanner",
  component: ContactBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Main title displayed at the top",
    },
    infoTitle: {
      control: "text",
      description: "Title for the information box",
    },
    media: {
      description: "Media data (image or video)",
    },
    content: {
      description: "Array of information items to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContactBanner>;

// Default Story with Image
export const Default: Story = {
  args: {
    title: "LE STUDIO.",
    media: {
      type: "image",
      src: "/assets/apt235/the_studio_image.jpg",
      alt: "Studio interior",
    },
    infoTitle: "INFORMATIONS",
    content: [
      {
        text: "APT.235 EST UN STUDIO DE TATOUAGE À BORDEAUX. NOS ARTISTES TATOUEURS RÉSIDENTS AINSI QUE NOS INVITÉS NATIONAUX ET INTERNATIONAUX AURONT LE PLAISIR DE VOUS ACCUEILLIR DANS UN ENDROIT SAFE, PROPRE ET MODERNE AVEC UNE PRESTATION DE QUALITÉ. ILS SERONT À VOTRE ÉCOUTE POUR RÉALISER VOS TATOUAGES PERSONNALISÉS AVEC RESPECT ET CONFIANCE.",
      },
      {
        text: "NOUS SOMMES OUVERTS AU PUBLIC UNIQUEMENT SUR RENDEZ-VOUS. RETROUVEZ TOUTES LES INFORMATIONS VIA INSTAGRAM @APT.235",
      },
    ],
  },
};

// Story with Video
export const WithVideo: Story = {
  args: {
    title: "LE STUDIO.",
    media: {
      type: "video",
      src: "/assets/apt235/the_studio.mp4",
      extension: "mp4",
      alt: "Studio video tour",
    },
    infoTitle: "CONTACT",
    content: [
      {
        text: "123 Rue Example, 33000 Bordeaux, France",
      },
      {
        text: "Ouvert du Lundi au Vendredi : 10h-19h",
      },
      {
        text: "Samedi : 10h-18h",
      },
      {
        text: "Dimanche : Fermé",
      },
      {
        text: "Téléphone : +33 1 23 45 67 89",
      },
      {
        text: "Email : contact@apt235.com",
      },
    ],
  },
};

// Story with Multiple Info Items
export const MultipleInfoItems: Story = {
  args: {
    title: "NOTRE EMPLACEMENT",
    media: {
      type: "image",
      src: "/assets/apt235/the_studio_image.jpg",
      alt: "Studio location",
    },
    infoTitle: "DÉTAILS",
    content: [
      { text: "📍 Adresse : 123 Rue Example, Bordeaux" },
      { text: "📞 Téléphone : +33 1 23 45 67 89" },
      { text: "📧 Email : contact@apt235.com" },
      { text: "🕐 Lun-Ven : 10h-19h" },
      { text: "🕐 Sam : 10h-18h" },
      { text: "🕐 Dim : Fermé" },
      { text: "💳 Paiement : CB, Espèces" },
      { text: "🅿️ Parking : Disponible" },
    ],
  },
};

// Story with Short Content
export const ShortContent: Story = {
  args: {
    title: "CONTACTEZ-NOUS",
    media: {
      type: "image",
      src: "/assets/apt235/the_studio_image.jpg",
      alt: "Contact us",
    },
    infoTitle: "HORAIRES",
    content: [
      { text: "Lundi - Vendredi : 10h-19h" },
      { text: "Samedi : 10h-18h" },
    ],
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    title: "LE STUDIO.",
    media: {
      type: "image",
      src: "/assets/apt235/the_studio_image.jpg",
      alt: "Studio",
    },
    infoTitle: "INFORMATIONS",
    content: [
      { text: "Première ligne d'information" },
      { text: "Deuxième ligne d'information" },
      { text: "Troisième ligne d'information" },
    ],
  },
};

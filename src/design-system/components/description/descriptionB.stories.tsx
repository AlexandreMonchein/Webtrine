// DescriptionB.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { DescriptionB } from "./descriptionB.component";
import type { DescriptionBProps } from "./descriptionB.types";

const meta: Meta<typeof DescriptionB> = {
  title: "Design System/Components/Description/DescriptionB",
  component: DescriptionB,
  parameters: {
    docs: {
      description: {
        component:
          'Implementation example (JSON):\n\n"<folder—name>-1": {\n  "type": "DescriptionB",\n  "features": { "feature1": true },\n  "title": null,\n  "subTitle": null,\n  "content": {\n    "leftImage": { "src": "/images/left.jpg", "alt": "Studio reception", "width": 1200, "height": 1600 },\n    "rightImage": { "src": "/images/right.jpg", "alt": "Tattoo chair", "width": 1200, "height": 1600 },\n    "leftBox": { "title": "PRENDRE RENDEZ-VOUS", "description": "Prenez rendez-vous avec votre artiste pour réaliser votre projet de tatouage.", "ctaLabel": "Découvrir", "ctaHref": "/rendez-vous" },\n    "rightBox": { "title": "LES ARTISTES", "description": "Regardez nos différents artistes et prenez rendez-vous avec celui qui correspond à votre projet.", "ctaLabel": "Voir les artistes", "ctaHref": "/artistes" }\n  }\n}',
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof DescriptionB>;

export const Default: Story = {
  args: {
    id: "description-b",
    title: "",
    subTitle: "",
    content: {
      leftImage: {
        src: "https://picsum.photos/id/1025/1200/1600",
        alt: "Carte de visite posée sur un bureau",
        width: 1200,
        height: 1600,
      },
      rightImage: {
        src: "https://picsum.photos/id/1040/1200/1600",
        alt: "Chaise de tatouage dans un studio",
        width: 1200,
        height: 1600,
      },
      leftBox: {
        title: "PRENDRE RENDEZ-VOUS",
        description:
          "PRENEZ RENDEZ-VOUS AVEC VOTRE ARTISTE POUR RÉALISER VOTRE PROJET DE TATOUAGE",
        ctaLabel: "En savoir plus",
        ctaHref: "#",
      },
      rightBox: {
        title: "LES ARTISTES",
        description:
          "REGARDEZ NOS DIFFÉRENTS ARTISTES ET PRENEZ RENDEZ-VOUS AVEC CELUI QUI CORRESPOND À VOTRE PROJET",
        ctaLabel: "Découvrir",
        ctaHref: "#",
      },
    },
  } as DescriptionBProps,
};

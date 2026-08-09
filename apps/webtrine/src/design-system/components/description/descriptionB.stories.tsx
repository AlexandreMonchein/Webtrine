import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import i18n from "../../../i18n";
import store from "../../../store";
import DescriptionB from "./descriptionB.component";

const meta = {
  title: "Components/Description/DescriptionB",
  component: DescriptionB,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DescriptionB>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleDescription = [
  {
    text: "Je m'appelle Océane Michel. Ma profession principale est la réalisation de prothèse dentaire, un métier que j'exerce au sein d'un laboratoire. J'aime travailler de mes mains et créer avec précision.",
  },
  {
    text: "Cette profession m'a appris le sens du détail, la rigueur, la patience ainsi que l'importance de l'hygiène, des qualités essentielles que je mets également au service lors de mes gardes d'animaux.",
  },
  {
    text: "Depuis toujours, les animaux occupent une place essentielle dans ma vie. J'ai grandi entourée de chats, ce qui m'a beaucoup apporté durant mon enfance.",
  },
];

const shortDescription = [
  {
    text: "Un paragraphe court pour tester le composant avec moins de contenu.",
  },
];

const longDescription = [
  {
    text: "Premier paragraphe d'une longue description qui contient beaucoup d'informations détaillées sur le sujet traité.",
  },
  {
    text: "Deuxième paragraphe apportant des précisions supplémentaires et développant davantage le propos initial.",
  },
  {
    text: "Troisième paragraphe continuant l'explication avec encore plus de détails techniques et pratiques.",
  },
  {
    text: "Quatrième paragraphe pour démontrer la gestion de multiples paragraphes dans le composant.",
  },
  {
    text: "Cinquième et dernier paragraphe concluant cette longue description de manière claire et concise.",
  },
];

/**
 * Default story with image media
 */
export const Default: Story = {
  args: {
    datas: {
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
        alt: "Image de présentation",
      },
      title: "Qui suis-je ?",
      description: sampleDescription,
    },
  },
};

/**
 * Story with video media (MP4)
 */
export const WithVideo: Story = {
  args: {
    datas: {
      media: {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        extension: "mp4",
        alt: "Vidéo de présentation",
      },
      title: "Notre Studio",
      description: sampleDescription,
    },
  },
};

/**
 * Story with short description
 */
export const ShortContent: Story = {
  args: {
    datas: {
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        alt: "Équipe de travail",
      },
      title: "Description courte",
      description: shortDescription,
    },
  },
};

/**
 * Story with long description (multiple paragraphs)
 */
export const LongContent: Story = {
  args: {
    datas: {
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        alt: "Espace de travail",
      },
      title: "Description détaillée",
      description: longDescription,
    },
  },
};

/**
 * Story with different title
 */
export const CustomTitle: Story = {
  args: {
    datas: {
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
        alt: "Studio créatif",
      },
      title: "Notre Histoire et Notre Passion",
      description: sampleDescription,
    },
  },
};

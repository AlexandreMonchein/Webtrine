import type { Meta, StoryObj } from "@storybook/react";

import { Team } from "./team.component";
import type { TeamProps } from "./team.types";

// Default members pour réutilisation
const defaultMembers: TeamProps["members"] = [
  {
    name: "Alexandre Dupont",
    position: "CEO & Founder",
    image: "square_image_1",
    imageAlt: "Alexandre Dupont profile picture",
  },
  {
    name: "Marie Laurent",
    position: "Chief Technology Officer",
    image: "square_image_2",
    imageAlt: "Marie Laurent profile picture",
  },
  {
    name: "Thomas Bernard",
    position: "Lead Designer",
    image: "square_image_3",
    imageAlt: "Thomas Bernard profile picture",
  },
];

// Args par défaut réutilisables
const defaultArgs: TeamProps = {
  type: "team",
  preTitle: "Meet the team",
  title: "Our Amazing Team",
  description:
    "We are a group of passionate professionals dedicated to creating exceptional experiences for our clients.",
  members: defaultMembers,
};

const meta: Meta<typeof Team> = {
  title: "Design System/Components/Description/Team",
  component: Team,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    preTitle: {
      control: "text",
      description: "Pré-titre optionnel affiché au-dessus du titre principal",
    },
    title: {
      control: "text",
      description: "Titre principal de la section (h2)",
    },
    description: {
      control: "text",
      description: "Description optionnelle de la section",
    },
    members: {
      control: "object",
      description: "Tableau de membres de l'équipe avec nom, poste et image",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Team>;

// Story par défaut avec tous les éléments
export const Default: Story = {
  args: defaultArgs,
};

// Story sans pré-titre (feature: preTitle optionnel)
export const WithoutPreTitle: Story = {
  args: {
    ...defaultArgs,
    preTitle: undefined,
  },
};

// Story sans description (feature: description optionnelle)
export const WithoutDescription: Story = {
  args: {
    ...defaultArgs,
    description: undefined,
  },
};

// Story sans titre (feature: title optionnel)
export const WithoutTitle: Story = {
  args: {
    ...defaultArgs,
    title: undefined,
  },
};

// Story sans postes (feature: position optionnelle dans members)
export const WithoutPositions: Story = {
  args: {
    ...defaultArgs,
    members: defaultMembers.map(({ name, image, imageAlt }) => ({
      name,
      image,
      imageAlt,
    })),
  },
};

// Story avec petite équipe (feature: responsive 2 membres)
export const SmallTeam: Story = {
  args: {
    ...defaultArgs,
    members: defaultMembers.slice(0, 2),
  },
};

// Story avec grande équipe (feature: responsive grid 4 colonnes)
export const LargeTeam: Story = {
  args: {
    ...defaultArgs,
    members: [
      ...defaultMembers,
      {
        name: "Sophie Martin",
        position: "Marketing Director",
        image: "square_image_1",
        imageAlt: "Sophie Martin profile picture",
      },
      {
        name: "Paul Dubois",
        position: "Sales Director",
        image: "square_image_2",
        imageAlt: "Paul Dubois profile picture",
      },
      {
        name: "Julie Mercier",
        position: "Product Manager",
        image: "square_image_3",
        imageAlt: "Julie Mercier profile picture",
      },
      {
        name: "Lucas Petit",
        position: "UX Researcher",
        image: "square_image_1",
        imageAlt: "Lucas Petit profile picture",
      },
      {
        name: "Emma Rousseau",
        position: "Developer",
        image: "square_image_2",
        imageAlt: "Emma Rousseau profile picture",
      },
    ],
  },
};

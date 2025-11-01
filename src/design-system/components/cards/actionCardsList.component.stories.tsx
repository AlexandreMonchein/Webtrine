import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ActionCardsList from "./actionCardsList.component";
import { ActionCardsListProps } from "./actionCardsList.types";

const meta: Meta<typeof ActionCardsList> = {
  title: "Design System/Components/Cards/ActionCardsList",
  component: ActionCardsList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
### Implementation Example (JSON)
\`\`\`json
"cards-1": {
  "type": "actionCardsList",
  "features": {},
  "title": "Les Prestations Animaute",
  "content": {
    "cards": [
      {
        "id": "1",
        "title": "Garde d'animaux en famille",
        "description": "Plus de 250 000 pet sitters attentionnés partout en France.",
        "imageSrc": "/assets/images/card-placeholder-1.jpg",
        "buttons": [
          { "label": "Garde d'animaux", "route": "/animaux" },
          { "label": "Garde de chien", "route": "/chien" },
          { "label": "Garde de chat", "route": "/chat" }
        ]
      }
    ]
  }
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ActionCardsListProps>;

export const Default: Story = {
  args: {
    title: "Les Prestations Animaute",
    cards: [
      {
        id: "1",
        title: "Garde d'animaux en famille",
        description:
          "Plus de 250 000 pet sitters attentionnés partout en France. La meilleure alternative à la pension pour chien et à la pension pour chat.",
        imageSrc: "vertical_image",
        buttons: [
          { label: "Garde d'animaux", type: "pet_care", route: "/animaux" },
          { label: "Garde de chien", type: "dog_care", route: "/chien" },
          { label: "Garde de chat", type: "cat_care", route: "/chat" },
        ],
      },
      {
        id: "2",
        title: "Promenade de chien",
        description:
          "Vous n'avez pas le temps de promener votre toutou ? Nos promeneurs s'en occupent !",
        imageSrc: "vertical_image",
        buttons: [{ label: "Promenade de chien", type: "dog_walking", route: "/promenade" }],
      },
      {
        id: "3",
        title: "Visite de chat",
        description:
          "Pendant votre absence, un cat sitter rend visite à votre chat pour le nourrir et entretenir sa litière.",
        imageSrc: "vertical_image",
        buttons: [{ label: "Visite de chat", type: "cat_visits", route: "/visite" }],
      },
      {
        id: "4",
        title: "Garde de NAC",
        description:
          "Lapin, furet, oiseau... nos pet sitters s'adaptent à leurs besoins spécifiquement.",
        imageSrc: "vertical_image",
        buttons: [{ label: "Garde de NAC", type: "nac_care", route: "/nac" }],
      },
    ],
  },
};

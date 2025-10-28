import type { Meta, StoryObj } from "@storybook/react";
import { ActionCardsList } from "./actionCardsList.component";
import { ActionCardsListProps } from "./actionCardsList.types";

const meta: Meta<typeof ActionCardsList> = {
  title: "Design System/Components/Cards/ActionCardsList",
  component: ActionCardsList,
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
    sectionTitle: "Les Prestations Animaute",
    cards: [
      {
        id: "1",
        title: "Garde d'animaux en famille",
        description:
          "Plus de 250 000 pet sitters attentionnés partout en France. La meilleure alternative à la pension pour chien et à la pension pour chat.",
        imageSrc: "action_card_image_1",
        buttons: [
          { label: "Garde d'animaux", route: "/animaux" },
          { label: "Garde de chien", route: "/chien" },
          { label: "Garde de chat", route: "/chat" },
        ],
      },
      {
        id: "2",
        title: "Promenade de chien",
        description:
          "Vous n'avez pas le temps de promener votre toutou ? Nos promeneurs s'en occupent !",
        imageSrc: "action_card_image_2",
        buttons: [{ label: "Promenade de chien", route: "/promenade" }],
      },
      {
        id: "3",
        title: "Visite de chat",
        description:
          "Pendant votre absence, un cat sitter rend visite à votre chat pour le nourrir et entretenir sa litière.",
        imageSrc: "action_card_image_3",
        buttons: [{ label: "Visite de chat", route: "/visite" }],
      },
      {
        id: "4",
        title: "Garde de NAC",
        description:
          "Lapin, furet, oiseau... nos pet sitters s'adaptent à leurs besoins spécifiquement.",
        imageSrc: "action_card_image_4",
        buttons: [{ label: "Garde de NAC", route: "/nac" }],
      },
    ],
  },
};

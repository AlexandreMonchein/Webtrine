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
  "title": "actionCardsList h2 title data-1",
  "content": {
    "cards": [
      {
        "id": "1",
        "title": "actionCardsList h3 card-title data-1",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "imageSrc": "vertical_image",
        "buttons": [
          { "id": "btn-1", "label": "actionCardsList button label data-1-1", "route": "/animaux" },
          { "id": "btn-2", "label": "actionCardsList button label data-1-2", "route": "/chien" },
          { "id": "btn-3", "label": "actionCardsList button label data-1-3", "route": "/chat" }
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
    title: "actionCardsList h2 title data-1",
    cards: [
      {
        id: "1",
        title: "actionCardsList h3 card-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imageSrc: "vertical_image",
        buttons: [
          {
            id: "pet_care",
            label: "actionCardsList button label data-1-1",
            type: "pet_care",
            route: "/animaux",
          },
          {
            id: "dog_care",
            label: "actionCardsList button label data-1-2",
            type: "dog_care",
            route: "/chien",
          },
          {
            id: "cat_care",
            label: "actionCardsList button label data-1-3",
            type: "cat_care",
            route: "/chat",
          },
        ],
      },
      {
        id: "2",
        title: "actionCardsList h3 card-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imageSrc: "vertical_image",
        buttons: [
          {
            id: "dog_walking",
            label: "actionCardsList button label data-2-1",
            type: "dog_walking",
            route: "/promenade",
          },
        ],
      },
      {
        id: "3",
        title: "actionCardsList h3 card-title data-3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imageSrc: "vertical_image",
        buttons: [
          {
            id: "cat_visits",
            label: "actionCardsList button label data-3-1",
            type: "cat_visits",
            route: "/visite",
          },
        ],
      },
      {
        id: "4",
        title: "actionCardsList h3 card-title data-4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        imageSrc: "vertical_image",
        buttons: [
          {
            id: "nac_care",
            label: "actionCardsList button label data-4-1",
            type: "nac_care",
            route: "/nac",
          },
        ],
      },
    ],
  },
};

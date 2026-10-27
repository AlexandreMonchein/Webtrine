import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initialState, stateReducer } from "../../../store/state.reducer";
import { TattooContact } from "./tattooContact.component";

// Mock Redux store : le composant lit client.contact.mailTemplate
const mockStore = configureStore({
  reducer: stateReducer,
  preloadedState: {
    ...initialState,
    client: {
      name: "showcase",
      contact: { mailTemplate: "template_storybook" },
    },
  } as any,
});

const meta: Meta<typeof TattooContact> = {
  title: "Components/Contact/TattooContact",
  component: TattooContact,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "TattooContact component allows clients to select an artist from a dropdown menu (select) and submit a tattoo request with detailed information including photos. If an artist has no email configured, it displays a mailto button instead of the full form.",
      },
    },
  },
  argTypes: {
    datas: {
      control: "object",
      description:
        "Configuration object containing artists, service IDs, and email settings",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TattooContact>;

// Default story with multiple artists having emails
export const Default: Story = {
  args: {
    datas: {
      logo: "webtrine_logo_2_blanc_noTitle",
      artists: [
        { artistName: "John Doe", mail: "john.doe@example.com" },
        { artistName: "Jane Smith", mail: "jane.smith@example.com" },
        { artistName: "Mike Johnson", mail: "mike.johnson@example.com" },
      ],
    },
  },
};

// Story with one artist without email
export const WithArtistWithoutEmail: Story = {
  args: {
    datas: {
      logo: "webtrine_logo_2_blanc_noTitle",
      artists: [
        { artistName: "John Doe", mail: "john.doe@example.com" },
        { artistName: "Jane Smith", mail: null },
        { artistName: "Mike Johnson", mail: "mike.johnson@example.com" },
      ],
    },
  },
};

// Story with many artists (useful to test datalist scrolling)
export const ManyArtists: Story = {
  args: {
    datas: {
      logo: "webtrine_logo_2_blanc_noTitle",
      artists: [
        { artistName: "John Doe", mail: "john.doe@example.com" },
        { artistName: "Jane Smith", mail: "jane.smith@example.com" },
        { artistName: "Mike Johnson", mail: "mike.johnson@example.com" },
        { artistName: "Sarah Williams", mail: "sarah.williams@example.com" },
        { artistName: "David Brown", mail: "david.brown@example.com" },
        { artistName: "Emma Davis", mail: "emma.davis@example.com" },
      ],
    },
  },
};

// Story with single artist
export const SingleArtist: Story = {
  args: {
    datas: {
      logo: "webtrine_logo_2_blanc_noTitle",
      artists: [{ artistName: "John Doe", mail: "john.doe@example.com" }],
    },
  },
};

// Story with only artists without emails
export const OnlyArtistsWithoutEmail: Story = {
  args: {
    datas: {
      logo: "webtrine_logo_2_blanc_noTitle",
      artists: [
        { artistName: "John Doe", mail: null },
        { artistName: "Jane Smith", mail: null },
        { artistName: "Mike Johnson", mail: null },
      ],
    },
  },
};

import { configureStore } from "@reduxjs/toolkit";
import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import i18n from "../../../i18n";
import { stateReducer } from "../../../store/state.reducer";
import DoubleImageDescription from "./doubleImageDescription.component";

// Create a mock Redux store with minimal state
const mockStore = configureStore({
  reducer: stateReducer as any,
  preloadedState: {
    client: {
      name: "showcase",
      fullName: "Showcase Inc",
      contact: {
        email: "contact@showcase.com",
        phone: "+33123456789",
        mailTemplate: "template_showcase",
      },
      socials: {},
    },
    layout: {
      templates: [],
    },
    style: {},
  } as any,
});

const meta = {
  title: "Design System/Components/Description/DoubleImageDescription",
  component: DoubleImageDescription,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    leftText: {
      description: "Text block for the left column (overlays top of image)",
      control: { type: "object" },
    },
    leftImage: {
      description: "Image configuration for the left column",
      control: { type: "object" },
    },
    rightImage: {
      description: "Image configuration for the right column (offset upward)",
      control: { type: "object" },
    },
    rightText: {
      description: "Text block for the right column (overlays bottom of image)",
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof DoubleImageDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftText: {
      title: "PRENDRE RENDEZ-VOUS",
      description:
        "Prenez rendez-vous avec votre artiste et laissez vous guider tout au long de votre séance",
      link: "/book",
    },
    leftImage: {
      image: "vertical_image_1",
      imageAlt: "Business card",
    },
    rightImage: {
      image: "vertical_image_1",
      imageAlt: "Studio photo",
    },
    rightText: {
      title: "LES ARTISTES",
      description:
        "Regardez nos différents artistes, tous passionnés et prêts à vous offrir la meilleure expérience",
      link: "/artists",
    },
  },
};

export const CustomContent: Story = {
  args: {
    leftText: {
      title: "DISCOVER OUR SERVICES",
      description:
        "Explore our wide range of professional services tailored to your needs",
      link: "/services",
    },
    leftImage: {
      image: "service-image",
      imageAlt: "Our services",
    },
    rightImage: {
      image: "team-photo",
      imageAlt: "Our team",
    },
    rightText: {
      title: "MEET THE TEAM",
      description: "Get to know the talented people behind our success",
      link: "/team",
    },
  },
};

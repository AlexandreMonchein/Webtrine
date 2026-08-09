import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "../src/classicButton.component";

const meta = {
  title: "Design System/Buttons/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  displayedText: "Click me",
  hiddenText: "+33 1 23 45 67 89",
};

export const CallType: Story = {
  args: {
    ...defaultArgs,
    type: "call",
    displayedText: "Show phone number",
    hiddenText: "+33 1 23 45 67 89",
  },
};

export const RedirectType: Story = {
  args: {
    ...defaultArgs,
    type: "redirect",
    displayedText: "Contact us",
    hiddenText: "Redirecting...",
  },
};

export const LongText: Story = {
  args: {
    ...defaultArgs,
    type: "call",
    displayedText: "Click to reveal our contact information",
    hiddenText: "contact@example.com - +33 1 23 45 67 89",
  },
};

export const ShortText: Story = {
  args: {
    ...defaultArgs,
    type: "call",
    displayedText: "Call",
    hiddenText: "123",
  },
};

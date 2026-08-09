import type { Meta, StoryObj } from "@storybook/react";

import { Example } from "./example.component";
import type { ExampleProps } from "./example.types";

// defaultArgs : Définir UNE FOIS, réutiliser partout
const defaultArgs: ExampleProps = {
  title: "Example Component",
  description: "This is an example component demonstrating CSS Modules pattern",
  variant: "default",
  children: "Example content",
};

const meta: Meta<typeof Example> = {
  title: "Design System/Example/Example",
  component: Example,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary"],
      description: "Visual variant of the component",
    },
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Example>;

// 1 story = 1 feature
export const Default: Story = {
  args: defaultArgs,
};

export const Primary: Story = {
  args: {
    ...defaultArgs,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    ...defaultArgs,
    variant: "secondary",
  },
};

export const WithoutTitle: Story = {
  args: {
    ...defaultArgs,
    title: undefined,
  },
};

export const WithoutDescription: Story = {
  args: {
    ...defaultArgs,
    description: undefined,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Playground: Story = {
  args: defaultArgs,
};

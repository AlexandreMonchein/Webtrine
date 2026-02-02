import type { Meta, StoryObj } from "@storybook/react";

import { Example } from "./example.component";

const meta: Meta<typeof Example> = {
  title: "example/Example",
  component: Example,
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Playground: Story = {
  args: {
    children: "Hello Example",
  },
};

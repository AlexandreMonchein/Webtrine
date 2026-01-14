// DescriptionB.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { DescriptionB } from "./descriptionB.component";
import type { DescriptionBProps } from "./descriptionB.types";

const meta: Meta<typeof DescriptionB> = {
  title: "Design System/Components/Description/DescriptionB",
  component: DescriptionB,
  parameters: {
    docs: {
      description: {
        component:
          'Implementation example (JSON):\n\n"<folder—name>-1": {\n  "type": "DescriptionB",\n  "features": { "feature1": true },\n  "title": "descriptionB h2 title data-1",\n  "subTitle": "descriptionB p subtitle data-1",\n  "content": {\n    "leftImage": { "src": "vertical_image", "alt": "descriptionB img alt data-1", "width": 1200, "height": 1600 },\n    "rightImage": { "src": "vertical_image", "alt": "descriptionB img alt data-2", "width": 1200, "height": 1600 },\n    "leftBox": { "title": "descriptionB h3 box-title data-1", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "ctaLabel": "descriptionB button label data-1", "ctaHref": "/link-1" },\n    "rightBox": { "title": "descriptionB h3 box-title data-2", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "ctaLabel": "descriptionB button label data-2", "ctaHref": "/link-2" }\n  }\n}',
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof DescriptionB>;

export const Default: Story = {
  args: {
    id: "description-b",
    title: "descriptionB h2 title data-1",
    subTitle: "descriptionB p subtitle data-1",
    content: {
      leftImage: {
        src: "vertical_image_1",
        alt: "descriptionB img alt data-1",
        width: 1200,
        height: 1600,
      },
      rightImage: {
        src: "vertical_image_1",
        alt: "descriptionB img alt data-2",
        width: 1200,
        height: 1600,
      },
      leftBox: {
        title: "descriptionB h3 box-title data-1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ctaLabel: "descriptionB button label data-1",
        ctaHref: "#",
      },
      rightBox: {
        title: "descriptionB h3 box-title data-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ctaLabel: "descriptionB button label data-2",
        ctaHref: "#",
      },
    },
  } as DescriptionBProps,
};

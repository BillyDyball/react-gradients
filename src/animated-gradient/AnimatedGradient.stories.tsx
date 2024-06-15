import type { Meta, StoryObj } from "@storybook/react";
import AnimatedGradient from "./AnimatedGradient";

const meta = {
  title: "Animated Gradient",
  component: AnimatedGradient,
  parameters: {
    layout: "fullscreen",

    backgrounds: {
      default: "twitter",
      values: [
        {
          name: "twitter",
          value: "#05041f",
        },
      ],
    },
  },
  tags: ["autodocs"],
  args: { style: { height: "100%", width: "100%", position: "absolute" } },

  decorators: (Story) => <Story />,
} satisfies Meta<typeof AnimatedGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};

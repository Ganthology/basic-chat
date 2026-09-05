import { type Meta, type StoryObj } from "@storybook/react-native";

import { Paragraph } from "./Paragraph";

const meta = {
  title: "ui/Paragraph",
  component: Paragraph,
  args: {
    children: "See you at 6?",
    size: "md",
    tone: "default",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
    tone: {
      control: { type: "select" },
      options: ["default", "secondary", "tertiary"],
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { tone: "secondary", children: "Open thread" },
};

export const Tertiary: Story = {
  args: { size: "sm", tone: "tertiary", children: "9:41 AM" },
};

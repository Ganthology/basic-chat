import { type Meta, type StoryObj } from "@storybook/react-native";

import { Heading } from "./Heading";

const meta = {
  title: "ui/Heading",
  component: Heading,
  args: {
    children: "Chats",
    size: "2xl",
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
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeTitle: Story = {
  args: { size: "3xl", children: "Chats" },
};

export const Secondary: Story = {
  args: { tone: "secondary", children: "Contact" },
};

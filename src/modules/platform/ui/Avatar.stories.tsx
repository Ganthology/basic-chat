import { type Meta, type StoryObj } from "@storybook/react-native";

import { Avatar } from "./Avatar";

const meta = {
  title: "ui/Avatar",
  component: Avatar,
  args: {
    initials: "MC",
    size: "md",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "xl"],
    },
    initials: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Small: Story = {
  args: { size: "sm", initials: "NP" },
};

export const ExtraLarge: Story = {
  args: { size: "xl", initials: "ER" },
};

export const Image: Story = {
  args: { accessibilityLabel: "Maya Chen" },
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Image source="https://i.pravatar.cc/208" />
    </Avatar>
  ),
};

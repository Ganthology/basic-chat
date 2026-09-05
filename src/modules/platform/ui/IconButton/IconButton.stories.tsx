import { type Meta, type StoryObj } from "@storybook/react-native";
import { Plus, Send } from "lucide-react-native";

import { IconButton } from "./IconButton";

const meta = {
  title: "ui/IconButton",
  component: IconButton,
  args: {
    accessibilityLabel: "Start a conversation",
    children: <IconButton.Icon icon={Plus} />,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["container", "filled"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Container: Story = {
  args: { variant: "container" },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    size: "sm",
    accessibilityLabel: "Send",
    children: <IconButton.Icon icon={Send} />,
  },
};

export const Selected: Story = {
  args: { variant: "container", selected: true },
};

export const Disabled: Story = {
  args: {
    variant: "filled",
    disabled: true,
    accessibilityLabel: "Send",
    children: <IconButton.Icon icon={Send} />,
  },
};

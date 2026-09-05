import { type Meta, type StoryObj } from "@storybook/react-native";
import { Text } from "react-native";

import { COLOR } from "@/modules/platform/style/COLOR";

import { IconButton } from "./IconButton";

const plus = <Text style={markStyle(COLOR.light.accent)}>+</Text>;
const send = <Text style={markStyle(COLOR.light.accentText)}>↑</Text>;

const meta = {
  title: "ui/IconButton",
  component: IconButton,
  args: {
    accessibilityLabel: "Start a conversation",
    children: plus,
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
    children: send,
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
    children: send,
  },
};

function markStyle(color: string) {
  return { color, fontSize: 22, fontWeight: "600" as const, lineHeight: 24 };
}

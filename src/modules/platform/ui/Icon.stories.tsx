import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Icon } from "./Icon";

const meta = {
  title: "ui/Icon",
  component: Icon,
  args: {
    name: "plus",
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: ["plus", "send"],
    },
    tone: {
      control: { type: "select" },
      options: ["default", "accent", "accentText", "secondary", "tertiary"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Plus: Story = {
  args: { name: "plus", tone: "accent" },
};

export const Send: Story = {
  args: { name: "send", tone: "accent" },
};

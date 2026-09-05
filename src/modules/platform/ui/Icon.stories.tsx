import { type Meta, type StoryObj } from "@storybook/react-native";
import { Plus, Send } from "lucide-react-native";
import { View } from "react-native";

import { Icon } from "./Icon";

const meta = {
  title: "ui/Icon",
  component: Icon,
  args: {
    icon: Plus,
    tone: "accent",
  },
  argTypes: {
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

export const PlusIcon: Story = {
  args: { icon: Plus, tone: "accent" },
};

export const SendIcon: Story = {
  args: { icon: Send, tone: "accent" },
};

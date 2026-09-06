import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { ChatMessage } from "./ChatMessage";

const meta = {
  title: "chat/ChatMessage",
  component: ChatMessage,
  args: {
    from: "other",
    children: "On my way to the cafe",
  },
  argTypes: {
    from: {
      control: { type: "select" },
      options: ["other", "user"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ width: "100%", paddingHorizontal: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ChatMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Other: Story = {
  args: { from: "other" },
};

export const User: Story = {
  args: { from: "user", children: "Same — grabbing a table" },
};

export const Grow: Story = {
  render: () => (
    <ChatMessage.Grow>
      <ChatMessage from="user">Yes. Corner booth.</ChatMessage>
    </ChatMessage.Grow>
  ),
};

export const LongWrap: Story = {
  args: {
    from: "user",
    children:
      "Yes. Corner booth by the window if it is free, otherwise the one near the pastry case.",
  },
};

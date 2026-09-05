import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { ChatMessage, type ChatMessageFrom } from "./ChatMessage";
import { ChatRoom } from "./ChatRoom";

type StoryMessage = {
  id: string;
  from: ChatMessageFrom;
  body: string;
  optimistic?: boolean;
};

const THREAD: StoryMessage[] = [
  { id: "1", from: "other", body: "On my way to the cafe" },
  { id: "2", from: "user", body: "Same — grabbing a table" },
  { id: "3", from: "other", body: "See you at 6?" },
  { id: "4", from: "user", body: "Yes. Corner booth." },
];

const THREAD_WITH_LONG: StoryMessage[] = [
  ...THREAD,
  {
    id: "5",
    from: "user",
    body: "Yes. Corner booth by the window if it is free, otherwise the one near the pastry case.",
  },
];

const meta = {
  title: "chat/ChatRoom",
  component: ChatRoom,
  decorators: [
    (Story) => (
      <View style={{ width: "100%", height: 420 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ChatRoom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Thread: Story = {
  render: () => (
    <ChatRoom
      data={THREAD}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatMessage from={item.from} optimistic={item.optimistic}>
          {item.body}
        </ChatMessage>
      )}
    />
  ),
};

export const LongOutgoing: Story = {
  render: () => (
    <ChatRoom
      data={THREAD_WITH_LONG}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatMessage from={item.from} optimistic={item.optimistic}>
          {item.body}
        </ChatMessage>
      )}
    />
  ),
};

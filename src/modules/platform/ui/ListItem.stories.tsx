import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Avatar } from "./Avatar";
import { Heading } from "./Heading";
import { ListItem } from "./ListItem";
import { ListItemContent } from "./ListItemContent";
import { ListItemHeadline } from "./ListItemHeadline";
import { Paragraph } from "./Paragraph";

const meta = {
  title: "ui/ListItem",
  component: ListItem,
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  render: () => (
    <ListItem onPress={() => undefined}>
      <Avatar initials="MC" />
      <ListItemContent showSeparator={false}>
        <ListItemHeadline
          trailing={
            <Paragraph size="sm" tone="tertiary">
              9:41 AM
            </Paragraph>
          }
        >
          <Heading size="lg" numberOfLines={1}>
            Maya Chen
          </Heading>
        </ListItemHeadline>
        <Paragraph size="md" tone="secondary" numberOfLines={1}>
          See you at 6?
        </Paragraph>
      </ListItemContent>
    </ListItem>
  ),
};

export const Selected: Story = {
  render: () => (
    <ListItem selected onPress={() => undefined}>
      <Avatar initials="NP" />
      <ListItemContent showSeparator={false}>
        <ListItemHeadline
          trailing={
            <Paragraph size="sm" tone="tertiary">
              Yesterday
            </Paragraph>
          }
        >
          <Heading size="lg" numberOfLines={1}>
            Noah Patel
          </Heading>
        </ListItemHeadline>
        <Paragraph size="md" tone="secondary" numberOfLines={1}>
          Sent the files
        </Paragraph>
      </ListItemContent>
    </ListItem>
  ),
};

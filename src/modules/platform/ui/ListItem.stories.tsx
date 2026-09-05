import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Heading } from "./Heading";
import { ListItem } from "./ListItem";
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
    <ListItem.Group>
      <ListItem onPress={() => undefined}>
        <ListItem.Avatar initials="MC" />
        <ListItem.Content showSeparator={false}>
          <ListItem.Headline
            trailing={
              <Paragraph size="sm" tone="tertiary">
                9:41 AM
              </Paragraph>
            }
          >
            <Heading size="lg" numberOfLines={1}>
              Maya Chen
            </Heading>
          </ListItem.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            See you at 6?
          </Paragraph>
        </ListItem.Content>
      </ListItem>
    </ListItem.Group>
  ),
};

export const Selected: Story = {
  render: () => (
    <ListItem.Group>
      <ListItem selected onPress={() => undefined}>
        <ListItem.Avatar initials="NP" />
        <ListItem.Content showSeparator={false}>
          <ListItem.Headline
            trailing={
              <Paragraph size="sm" tone="tertiary">
                Yesterday
              </Paragraph>
            }
          >
            <Heading size="lg" numberOfLines={1}>
              Noah Patel
            </Heading>
          </ListItem.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            Sent the files
          </Paragraph>
        </ListItem.Content>
      </ListItem>
    </ListItem.Group>
  ),
};

export const Group: Story = {
  render: () => (
    <ListItem.Group>
      <ListItem onPress={() => undefined}>
        <ListItem.Avatar initials="MC" />
        <ListItem.Content>
          <ListItem.Headline
            trailing={
              <Paragraph size="sm" tone="tertiary">
                9:41 AM
              </Paragraph>
            }
          >
            <Heading size="lg" numberOfLines={1}>
              Maya Chen
            </Heading>
          </ListItem.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            See you at 6?
          </Paragraph>
        </ListItem.Content>
      </ListItem>
      <ListItem selected onPress={() => undefined}>
        <ListItem.Avatar initials="NP" />
        <ListItem.Content showSeparator={false}>
          <ListItem.Headline
            trailing={
              <Paragraph size="sm" tone="tertiary">
                Yesterday
              </Paragraph>
            }
          >
            <Heading size="lg" numberOfLines={1}>
              Noah Patel
            </Heading>
          </ListItem.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            Sent the files
          </Paragraph>
        </ListItem.Content>
      </ListItem>
    </ListItem.Group>
  ),
};

import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Heading } from "./Heading";
import { ListGroup } from "./ListGroup";
import { Paragraph } from "./Paragraph";

const meta = {
  title: "ui/ListGroup",
  component: ListGroup,
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ListGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  render: () => (
    <ListGroup>
      <ListGroup.Item onPress={() => undefined}>
        <ListGroup.Item.Avatar initials="MC" />
        <ListGroup.Item.Content showSeparator={false}>
          <ListGroup.Item.Headline>
            <Heading size="lg" numberOfLines={1}>
              Maya Chen
            </Heading>
            <ListGroup.Item.Trailing>
              <Paragraph size="sm" tone="tertiary">
                9:41 AM
              </Paragraph>
            </ListGroup.Item.Trailing>
          </ListGroup.Item.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            See you at 6?
          </Paragraph>
        </ListGroup.Item.Content>
      </ListGroup.Item>
    </ListGroup>
  ),
};

export const Selected: Story = {
  render: () => (
    <ListGroup>
      <ListGroup.Item selected onPress={() => undefined}>
        <ListGroup.Item.Avatar initials="NP" />
        <ListGroup.Item.Content showSeparator={false}>
          <ListGroup.Item.Headline>
            <Heading size="lg" numberOfLines={1}>
              Noah Patel
            </Heading>
            <ListGroup.Item.Trailing>
              <Paragraph size="sm" tone="tertiary">
                Yesterday
              </Paragraph>
            </ListGroup.Item.Trailing>
          </ListGroup.Item.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            Sent the files
          </Paragraph>
        </ListGroup.Item.Content>
      </ListGroup.Item>
    </ListGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ListGroup>
      <ListGroup.Item onPress={() => undefined}>
        <ListGroup.Item.Avatar initials="MC" />
        <ListGroup.Item.Content>
          <ListGroup.Item.Headline>
            <Heading size="lg" numberOfLines={1}>
              Maya Chen
            </Heading>
            <ListGroup.Item.Trailing>
              <Paragraph size="sm" tone="tertiary">
                9:41 AM
              </Paragraph>
            </ListGroup.Item.Trailing>
          </ListGroup.Item.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            See you at 6?
          </Paragraph>
        </ListGroup.Item.Content>
      </ListGroup.Item>
      <ListGroup.Item selected onPress={() => undefined}>
        <ListGroup.Item.Avatar initials="NP" />
        <ListGroup.Item.Content showSeparator={false}>
          <ListGroup.Item.Headline>
            <Heading size="lg" numberOfLines={1}>
              Noah Patel
            </Heading>
            <ListGroup.Item.Trailing>
              <Paragraph size="sm" tone="tertiary">
                Yesterday
              </Paragraph>
            </ListGroup.Item.Trailing>
          </ListGroup.Item.Headline>
          <Paragraph size="md" tone="secondary" numberOfLines={1}>
            Sent the files
          </Paragraph>
        </ListGroup.Item.Content>
      </ListGroup.Item>
    </ListGroup>
  ),
};

import { type Meta, type StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { Heading } from "./Heading";
import { ListGroup } from "./ListGroup";
import { Paragraph } from "./Paragraph";
import { Toggle } from "./Toggle";

const meta = {
  title: "ui/Toggle",
  component: Toggle,
  args: {
    accessibilityLabel: "Block contact",
    value: false,
  },
  argTypes: {
    value: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { value: false },
};

export const On: Story = {
  args: { value: true },
};

export const Disabled: Story = {
  args: { value: false, disabled: true },
};

export const Interactive: Story = {
  render: function InteractiveToggle() {
    const [value, setValue] = useState(false);

    return <Toggle accessibilityLabel="Block contact" value={value} onValueChange={setValue} />;
  },
};

export const InListGroup: Story = {
  render: function ProfileToggle() {
    const [blocked, setBlocked] = useState(false);

    return (
      <ListGroup rounded>
        <ListGroup.Item>
          <ListGroup.Item.Content>
            <ListGroup.Item.Headline>
              <Heading size="lg">Phone</Heading>
              <ListGroup.Item.Trailing>
                <Paragraph size="md" tone="secondary">
                  +1 (415) 555-0142
                </Paragraph>
              </ListGroup.Item.Trailing>
            </ListGroup.Item.Headline>
          </ListGroup.Item.Content>
        </ListGroup.Item>
        <ListGroup.Item>
          <ListGroup.Item.Content showSeparator={false}>
            <Heading size="lg">Block</Heading>
          </ListGroup.Item.Content>
          <Toggle accessibilityLabel="Block contact" value={blocked} onValueChange={setBlocked} />
        </ListGroup.Item>
      </ListGroup>
    );
  },
};

import { type Meta, type StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { GroupedTable } from "./GroupedTable";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Toggle } from "./Toggle";

const meta = {
  title: "ui/GroupedTable",
  component: GroupedTable,
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof GroupedTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Values: Story = {
  render: () => (
    <GroupedTable>
      <GroupedTable.Row>
        <Heading size="lg">Name</Heading>
        <GroupedTable.Row.Value>
          <Paragraph tone="secondary">You</Paragraph>
        </GroupedTable.Row.Value>
      </GroupedTable.Row>
      <GroupedTable.Row>
        <Heading size="lg">Version</Heading>
        <GroupedTable.Row.Value>
          <Paragraph tone="secondary">1.0.0</Paragraph>
        </GroupedTable.Row.Value>
      </GroupedTable.Row>
    </GroupedTable>
  ),
};

export const WithToggle: Story = {
  render: function ToggleRows() {
    const [blocked, setBlocked] = useState(false);

    return (
      <GroupedTable>
        <GroupedTable.Row>
          <Heading size="lg">Phone</Heading>
          <GroupedTable.Row.Value>
            <Paragraph tone="secondary">+1-202-555-0101</Paragraph>
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
        <GroupedTable.Row>
          <Heading size="lg">Block</Heading>
          <GroupedTable.Row.Value>
            <Toggle
              accessibilityLabel="Block contact"
              value={blocked}
              onValueChange={setBlocked}
            />
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
      </GroupedTable>
    );
  },
};

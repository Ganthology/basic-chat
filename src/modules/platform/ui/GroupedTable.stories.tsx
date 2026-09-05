import { type Meta, type StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { GroupedTable } from "./GroupedTable";

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
        <GroupedTable.Row.Heading>Name</GroupedTable.Row.Heading>
        <GroupedTable.Row.Value>
          <GroupedTable.Row.Paragraph>You</GroupedTable.Row.Paragraph>
        </GroupedTable.Row.Value>
      </GroupedTable.Row>
      <GroupedTable.Row>
        <GroupedTable.Row.Heading>Version</GroupedTable.Row.Heading>
        <GroupedTable.Row.Value>
          <GroupedTable.Row.Paragraph>1.0.0</GroupedTable.Row.Paragraph>
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
          <GroupedTable.Row.Heading>Phone</GroupedTable.Row.Heading>
          <GroupedTable.Row.Value>
            <GroupedTable.Row.Paragraph>+1-202-555-0101</GroupedTable.Row.Paragraph>
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
        <GroupedTable.Row>
          <GroupedTable.Row.Heading>Block</GroupedTable.Row.Heading>
          <GroupedTable.Row.Toggle
            accessibilityLabel="Block contact"
            value={blocked}
            onValueChange={setBlocked}
          />
        </GroupedTable.Row>
      </GroupedTable>
    );
  },
};

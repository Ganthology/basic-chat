import { type Meta, type StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";

import { GroupedTable } from "../GroupedTable";
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

export const InGroupedTable: Story = {
  render: function ProfileToggle() {
    const [blocked, setBlocked] = useState(false);

    return (
      <GroupedTable>
        <GroupedTable.Row>
          <GroupedTable.Row.Heading>Phone</GroupedTable.Row.Heading>
          <GroupedTable.Row.Value>
            <GroupedTable.Row.Paragraph>+1 (415) 555-0142</GroupedTable.Row.Paragraph>
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

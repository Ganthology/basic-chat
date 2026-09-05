import { type Meta, type StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { COLOR } from "@/modules/platform/style/COLOR";
import { IconButton } from "@/modules/platform/ui/IconButton";

import { Composer } from "./Composer";

const send = (
  <Text style={{ color: COLOR.light.accentText, fontSize: 22, fontWeight: "600", lineHeight: 24 }}>
    ↑
  </Text>
);

const meta = {
  title: "chat/Composer",
  component: Composer,
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Composer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => (
    <Composer>
      <Composer.Input />
      <IconButton variant="filled" size="sm" accessibilityLabel="Send" disabled>
        {send}
      </IconButton>
    </Composer>
  ),
};

export const Typed: Story = {
  render: function TypedComposer() {
    const [value, setValue] = useState("See you at 6?");

    return (
      <Composer>
        <Composer.Input value={value} onChangeText={setValue} />
        <IconButton
          variant="filled"
          size="sm"
          accessibilityLabel="Send"
          disabled={value.trim().length === 0}
        >
          {send}
        </IconButton>
      </Composer>
    );
  },
};

export const DisabledSend: Story = {
  render: () => (
    <Composer>
      <Composer.Input value="" editable={false} />
      <IconButton variant="filled" size="sm" accessibilityLabel="Send" disabled>
        {send}
      </IconButton>
    </Composer>
  ),
};

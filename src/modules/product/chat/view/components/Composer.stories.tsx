import { type Meta, type StoryObj } from "@storybook/react-native";
import { Send } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import { Composer } from "./Composer";

const meta = {
  title: "chat/Composer",
  component: Composer,
  decorators: [
    (Story) => (
      <View style={{ width: "100%", padding: 16 }}>
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
      <Composer.Trailing>
        <Composer.IconButton accessibilityLabel="Send" disabled>
          <Composer.IconButton.Icon icon={Send} />
        </Composer.IconButton>
      </Composer.Trailing>
    </Composer>
  ),
};

export const Typed: Story = {
  render: function TypedComposer() {
    const [value, setValue] = useState("See you at 6?");

    return (
      <Composer>
        <Composer.Input value={value} onChangeText={setValue} />
        <Composer.Trailing>
          <Composer.IconButton accessibilityLabel="Send" disabled={value.trim().length === 0}>
            <Composer.IconButton.Icon icon={Send} />
          </Composer.IconButton>
        </Composer.Trailing>
      </Composer>
    );
  },
};

export const DisabledSend: Story = {
  render: () => (
    <Composer>
      <Composer.Input value="" editable={false} />
      <Composer.Trailing>
        <Composer.IconButton accessibilityLabel="Send" disabled>
          <Composer.IconButton.Icon icon={Send} />
        </Composer.IconButton>
      </Composer.Trailing>
    </Composer>
  ),
};

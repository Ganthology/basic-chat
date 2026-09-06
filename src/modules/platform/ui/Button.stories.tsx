import { type Meta, type StoryObj } from "@storybook/react-native";

import { Button } from "./Button";

const meta = {
  title: "ui/Button",
  component: Button,
  args: {
    children: "New chat",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["container", "filled"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { variant: "filled" },
};

export const Container: Story = {
  args: { variant: "container" },
};

export const Small: Story = {
  args: { variant: "filled", size: "sm" },
};

export const Disabled: Story = {
  args: { variant: "filled", disabled: true },
};

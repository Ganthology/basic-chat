import { type Meta, type StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { Avatar } from "../Avatar";
import { Heading } from "../Heading";
import { ListItem } from "../ListGroup/ListItem";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "ui/Skeleton",
  component: Skeleton.View,
  decorators: [
    (Story) => (
      <View style={{ width: "100%" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Skeleton.View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListRows: Story = {
  render: () => (
    <Skeleton.View>
      <ListItem.Skeleton />
      <ListItem.Skeleton />
      <ListItem.Skeleton />
    </Skeleton.View>
  ),
};

export const HeaderTitle: Story = {
  render: () => (
    <Skeleton.View style={styles.title}>
      <Avatar.Skeleton size="sm" />
      <Heading.Skeleton size="md" width={96} />
    </Skeleton.View>
  ),
};

const styles = createStyles(({ spacing }) => ({
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
}));

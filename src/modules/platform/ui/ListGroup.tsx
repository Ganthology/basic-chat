import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { ListItem } from "./ListItem";

export type ListGroupProps = ViewProps & {
  rounded?: boolean;
};

function ListGroupRoot({ rounded = false, style, ...rest }: ListGroupProps) {
  return (
    <View
      accessibilityRole="list"
      {...rest}
      style={[styles.root, rounded && styles.rounded, style]}
    />
  );
}

const styles = createStyles(({ color, radius }) => ({
  root: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: color.container,
  },
  rounded: {
    borderRadius: radius.lg,
  },
}));

export const ListGroup = Object.assign(ListGroupRoot, {
  Item: ListItem,
});

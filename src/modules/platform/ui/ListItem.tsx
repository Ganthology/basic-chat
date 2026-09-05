import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { Avatar } from "./Avatar";
import { ListGroup } from "./ListGroup";
import { ListItemContent } from "./ListItemContent";
import { ListItemHeadline } from "./ListItemHeadline";

export type ListItemProps = Omit<PressableProps, "style"> & {
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

function ListItemRoot({ selected = false, disabled, style, children, ...rest }: ListItemProps) {
  return (
    <Pressable
      accessibilityRole={rest.onPress ? "button" : undefined}
      accessibilityState={{ disabled: disabled ?? false, selected }}
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.root,
        (selected || (pressed && rest.onPress != null)) && styles.selected,
        disabled && styles.disabled,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    width: "100%",
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
  },
  selected: {
    backgroundColor: color.containerSelected,
  },
  disabled: {
    opacity: 0.4,
  },
}));

export const ListItem = Object.assign(ListItemRoot, {
  Group: ListGroup,
  Avatar,
  Content: ListItemContent,
  Headline: ListItemHeadline,
});

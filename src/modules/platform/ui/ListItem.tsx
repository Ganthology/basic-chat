import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type ListItemProps = Omit<PressableProps, "style"> & {
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ListItem({ selected = false, disabled, style, children, ...rest }: ListItemProps) {
  return (
    <Pressable
      accessibilityRole={rest.onPress ? "button" : undefined}
      accessibilityState={{ disabled: disabled ?? false, selected }}
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.root,
        selected && styles.selected,
        pressed && rest.onPress != null && styles.pressed,
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
    backgroundColor: color.container,
  },
  selected: {
    backgroundColor: color.containerSelected,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.4,
  },
}));

import { Children, isValidElement, type ReactNode } from "react";
import { Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { GroupedTableRowValue } from "./GroupedTableRowValue";

export type GroupedTableRowProps = Omit<PressableProps, "style" | "children"> & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

function GroupedTableRowRoot({
  disabled,
  style,
  children,
  ...rest
}: GroupedTableRowProps) {
  const { leading, value } = splitRowChildren(children);

  return (
    <Pressable
      accessibilityRole={rest.onPress ? "button" : undefined}
      accessibilityState={{ disabled: disabled ?? false }}
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.root,
        pressed && rest.onPress != null && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.leading}>{leading}</View>
      {value}
    </Pressable>
  );
}

function splitRowChildren(children: ReactNode): {
  leading: ReactNode[];
  value: ReactNode;
} {
  const leading: ReactNode[] = [];
  let value: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === GroupedTableRowValue) {
      value = child;
      return;
    }
    leading.push(child);
  });

  return { leading, value };
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    minHeight: 44,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    width: "100%",
  },
  leading: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    backgroundColor: color.containerSelected,
  },
  disabled: {
    opacity: 0.4,
  },
}));

export const GroupedTableRow = Object.assign(GroupedTableRowRoot, {
  Value: GroupedTableRowValue,
});

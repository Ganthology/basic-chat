import { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { IconButtonContext } from "./IconButtonContext";
import { IconButtonIcon } from "./IconButtonIcon";

export type IconButtonVariant = "container" | "filled";
export type IconButtonSize = "sm" | "md";

export type IconButtonProps = Omit<PressableProps, "style" | "children"> & {
  accessibilityLabel: string;
  children: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

function IconButtonRoot({
  accessibilityLabel,
  children,
  variant = "container",
  size = "md",
  selected = false,
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  return (
    <IconButtonContext.Provider value={{ variant }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled ?? false, selected }}
        disabled={disabled}
        {...rest}
        style={({ pressed }) => [
          styles.root,
          variantStyles(variant),
          sizeStyles(size),
          variant === "container" && selected && styles.selected,
          variant === "filled" && pressed && styles.filledPressed,
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
      >
        {children}
      </Pressable>
    </IconButtonContext.Provider>
  );
}

export const IconButton = Object.assign(IconButtonRoot, {
  Icon: IconButtonIcon,
});

function variantStyles(variant: IconButtonVariant) {
  switch (variant) {
    case "container":
      return styles.container;
    case "filled":
      return styles.filled;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function sizeStyles(size: IconButtonSize) {
  switch (size) {
    case "sm":
      return styles.sm;
    case "md":
      return styles.md;
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

const styles = createStyles(({ color, radius }) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  container: {
    backgroundColor: color.container,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.separator,
  },
  filled: {
    backgroundColor: color.accent,
  },
  filledPressed: {
    backgroundColor: color.accentPressed,
  },
  selected: {
    backgroundColor: color.containerSelected,
  },
  sm: {
    width: 36,
    height: 36,
  },
  md: {
    width: 38,
    height: 38,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.4,
  },
}));

import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type ButtonVariant = "container" | "filled";
export type ButtonSize = "sm" | "md";

export type ButtonProps = Omit<PressableProps, "style" | "children"> & {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  children,
  variant = "filled",
  size = "md",
  disabled,
  accessibilityLabel,
  style,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? children}
      accessibilityState={{ disabled: disabled ?? false }}
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.root,
        variantStyles(variant),
        sizeStyles(size),
        variant === "filled" && pressed && styles.filledPressed,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, labelVariantStyles(variant), labelSizeStyles(size)]}>
        {children}
      </Text>
    </Pressable>
  );
}

function variantStyles(variant: ButtonVariant) {
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

function sizeStyles(size: ButtonSize) {
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

function labelVariantStyles(variant: ButtonVariant) {
  switch (variant) {
    case "container":
      return styles.labelContainer;
    case "filled":
      return styles.labelFilled;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function labelSizeStyles(size: ButtonSize) {
  switch (size) {
    case "sm":
      return styles.labelSm;
    case "md":
      return styles.labelMd;
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

const styles = createStyles(({ color, fontFamily, fontSize, padding, radius }) => ({
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
  sm: {
    minHeight: 36,
    paddingHorizontal: padding.md,
    paddingVertical: padding.xs,
  },
  md: {
    minHeight: 44,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
  },
  label: {
    fontFamily: fontFamily.display.semibold,
  },
  labelContainer: {
    color: color.text,
  },
  labelFilled: {
    color: color.accentText,
  },
  labelSm: {
    fontSize: fontSize.sm,
  },
  labelMd: {
    fontSize: fontSize.md,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.4,
  },
}));

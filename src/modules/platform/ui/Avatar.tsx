import { Image, type ImageProps } from "expo-image";
import { type ReactNode } from "react";
import { Text, View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type AvatarSize = "sm" | "md" | "xl";

export type AvatarProps = ViewProps & {
  size?: AvatarSize;
  initials?: string;
  source?: ImageProps["source"];
  children?: ReactNode;
};

export function Avatar({ size = "md", initials, source, children, style, ...rest }: AvatarProps) {
  const sizeStyles = sizeStylesFor(size);

  return (
    <View
      {...rest}
      accessible={rest.accessible ?? rest.accessibilityLabel != null}
      accessibilityRole={rest.accessibilityRole ?? (rest.accessibilityLabel ? "image" : undefined)}
      style={[styles.root, sizeStyles.root, { backgroundColor: hueFill(initials) }, style]}
    >
      {children ??
        (source != null ? (
          <Image source={source} style={styles.image} contentFit="cover" />
        ) : initials != null && initials.length > 0 ? (
          <Text style={[styles.initials, sizeStyles.initials]}>{initials}</Text>
        ) : null)}
    </View>
  );
}

function sizeStylesFor(size: AvatarSize) {
  switch (size) {
    case "sm":
      return { root: styles.sm, initials: styles.initialsSm };
    case "md":
      return { root: styles.md, initials: styles.initialsMd };
    case "xl":
      return { root: styles.xl, initials: styles.initialsXl };
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

function hueFill(initials: string | undefined): string {
  const hue = initials == null || initials.length === 0 ? 220 : hueFromInitials(initials);
  return `hsl(${hue}, 62%, 52%)`;
}

function hueFromInitials(initials: string): number {
  let hash = 0;
  for (const char of initials) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return hash;
}

const styles = createStyles(({ fontFamily, fontSize, radius }) => ({
  root: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 52,
    height: 52,
  },
  xl: {
    width: 104,
    height: 104,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initials: {
    color: "#ffffff",
    fontFamily: fontFamily.body.semibold,
  },
  initialsSm: {
    fontSize: fontSize.xs,
  },
  initialsMd: {
    fontSize: fontSize.lg,
  },
  initialsXl: {
    fontSize: fontSize["3xl"],
  },
}));

import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Children, isValidElement, type ReactNode } from "react";
import { type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { ComposerIconButton } from "./ComposerIconButton";
import { ComposerInput } from "./ComposerInput";
import { ComposerTrailing } from "./ComposerTrailing";

export type ComposerProps = ViewProps & {
  children?: ReactNode;
};

function ComposerRoot({ children, style, ...rest }: ComposerProps) {
  const { input, trailing } = splitComposerChildren(children);

  return (
    <ComposerChrome {...rest} style={[styles.root, style]}>
      {input}
      {trailing}
    </ComposerChrome>
  );
}

function ComposerChrome({ children, style, ...rest }: ViewProps) {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView {...rest} style={style}>
        {children}
      </GlassView>
    );
  }

  return (
    <BlurView {...rest} intensity={80} tint="systemMaterial" style={style}>
      {children}
    </BlurView>
  );
}

function splitComposerChildren(children: ReactNode): {
  input: ReactNode;
  trailing: ReactNode;
} {
  let input: ReactNode = null;
  let trailing: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === ComposerInput) {
      input = child;
      return;
    }
    if (isValidElement(child) && child.type === ComposerTrailing) {
      trailing = child;
      return;
    }
  });

  return { input, trailing };
}

const styles = createStyles(({ padding, radius, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "stretch",
    overflow: "hidden",
    gap: spacing.sm,
    paddingLeft: padding.md,
    paddingRight: padding.xs,
    paddingVertical: padding.xs,
    borderRadius: radius.xl,
  },
}));

export const Composer = Object.assign(ComposerRoot, {
  Input: ComposerInput,
  Trailing: ComposerTrailing,
  IconButton: ComposerIconButton,
});

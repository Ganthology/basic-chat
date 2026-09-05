import { Children, isValidElement, type ReactNode } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import Animated, { Easing, FadeIn, Keyframe, useReducedMotion } from "react-native-reanimated";

import { createStyles } from "@/modules/platform/style/createStyles";

import { ComposerIconButton } from "./ComposerIconButton";
import { ComposerInput } from "./ComposerInput";

export type ComposerProps = ViewProps & {
  children?: ReactNode;
};

const ENTER_MS = 240;
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const enteringReduced = FadeIn.duration(180);
const enteringFromBottom = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: "100%" }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: "0%" }],
    easing: EASE_OUT,
  },
}).duration(ENTER_MS);

function ComposerRoot({ children, style, ...rest }: ComposerProps) {
  const reduceMotion = useReducedMotion();
  const { input, actions } = splitComposerChildren(children);

  return (
    <Animated.View
      {...rest}
      entering={reduceMotion ? enteringReduced : enteringFromBottom}
      style={[styles.root, style]}
    >
      {input}
      {actions}
    </Animated.View>
  );
}

function splitComposerChildren(children: ReactNode): {
  input: ReactNode;
  actions: ReactNode[];
} {
  const actions: ReactNode[] = [];
  let input: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === ComposerInput) {
      input = child;
      return;
    }
    if (isValidElement(child) && child.type === ComposerIconButton) {
      actions.push(child);
      return;
    }
  });

  return { input, actions };
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    backgroundColor: color.container,
    borderTopColor: color.separator,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
}));

export const Composer = Object.assign(ComposerRoot, {
  Input: ComposerInput,
  IconButton: ComposerIconButton,
});

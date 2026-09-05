import { Children, isValidElement, type ReactNode } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { ComposerInput } from "./ComposerInput";

export type ComposerProps = ViewProps & {
  children?: ReactNode;
};

function ComposerRoot({ children, style, ...rest }: ComposerProps) {
  const { input, actions } = splitComposerChildren(children);

  return (
    <View {...rest} style={[styles.root, style]}>
      {input}
      {actions}
    </View>
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
    actions.push(child);
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
});

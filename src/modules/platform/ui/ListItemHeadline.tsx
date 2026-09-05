import { Children, isValidElement, type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { ListItemTrailing } from "./ListItemTrailing";

export type ListItemHeadlineProps = ViewProps & {
  children: ReactNode;
};

export function ListItemHeadline({ children, style, ...rest }: ListItemHeadlineProps) {
  const { leading, trailing } = splitHeadlineChildren(children);

  return (
    <View {...rest} style={[styles.root, style]}>
      <View style={styles.leading}>{leading}</View>
      {trailing}
    </View>
  );
}

function splitHeadlineChildren(children: ReactNode): {
  leading: ReactNode[];
  trailing: ReactNode;
} {
  const leading: ReactNode[] = [];
  let trailing: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === ListItemTrailing) {
      trailing = child;
      return;
    }
    leading.push(child);
  });

  return { leading, trailing };
}

const styles = createStyles(({ spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  leading: {
    flex: 1,
    minWidth: 0,
  },
}));

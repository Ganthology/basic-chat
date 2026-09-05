import { type ReactNode } from "react";
import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type ListItemHeadlineProps = ViewProps & {
  children: ReactNode;
  trailing?: ReactNode;
};

export function ListItemHeadline({ children, trailing, style, ...rest }: ListItemHeadlineProps) {
  return (
    <View {...rest} style={[styles.root, style]}>
      <View style={styles.leading}>{children}</View>
      {trailing}
    </View>
  );
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

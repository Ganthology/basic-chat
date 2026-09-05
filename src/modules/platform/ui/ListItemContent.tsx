import { StyleSheet, View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type ListItemContentProps = ViewProps & {
  showSeparator?: boolean;
};

export function ListItemContent({ showSeparator = true, style, ...rest }: ListItemContentProps) {
  return <View {...rest} style={[styles.root, showSeparator && styles.separator, style]} />;
}

const styles = createStyles(({ color, spacing }) => ({
  root: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.xs,
    gap: spacing.xxs,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.separator,
  },
}));

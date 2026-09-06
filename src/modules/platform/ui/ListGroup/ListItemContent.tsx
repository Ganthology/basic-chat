import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type ListItemContentProps = ViewProps;

export function ListItemContent({ style, ...rest }: ListItemContentProps) {
  return <View {...rest} style={[styles.root, style]} />;
}

const styles = createStyles(({ spacing }) => ({
  root: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.xs,
    gap: spacing.xxs,
  },
}));

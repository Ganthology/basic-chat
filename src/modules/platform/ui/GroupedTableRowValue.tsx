import { View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export type GroupedTableRowValueProps = ViewProps;

export function GroupedTableRowValue({ style, ...rest }: GroupedTableRowValueProps) {
  return <View {...rest} style={[styles.root, style]} />;
}

const styles = createStyles(() => ({
  root: {
    flexShrink: 0,
    alignItems: "flex-end",
    justifyContent: "center",
  },
}));

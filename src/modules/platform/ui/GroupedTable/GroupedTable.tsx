import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

import { GroupedTableRow, type GroupedTableRowProps } from "./GroupedTableRow";

export type GroupedTableProps = ViewProps;

function GroupedTableRoot({ children, style, ...rest }: GroupedTableProps) {
  const rows = collectRows(children);

  return (
    <View accessibilityRole="list" {...rest} style={[styles.root, style]}>
      {rows.map((row, index) => (
        <Fragment key={row.key ?? index}>
          {index > 0 ? <View style={styles.separator} /> : null}
          {row}
        </Fragment>
      ))}
    </View>
  );
}

function collectRows(children: ReactNode): ReactElement<GroupedTableRowProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<GroupedTableRowProps> =>
      isValidElement(child) && child.type === GroupedTableRow,
  );
}

const styles = createStyles(({ color, padding, radius }) => ({
  root: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: color.container,
    borderRadius: radius.lg,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.separator,
    marginStart: padding.lg,
  },
}));

export const GroupedTable = Object.assign(GroupedTableRoot, {
  Row: GroupedTableRow,
});

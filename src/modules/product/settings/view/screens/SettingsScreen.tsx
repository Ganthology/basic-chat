import { type ReactNode } from "react";
import { ScrollView } from "react-native";

import { getAppVersion } from "@/modules/platform/config/getAppVersion";
import { createStyles } from "@/modules/platform/style/createStyles";
import { GroupedTable } from "@/modules/platform/ui/GroupedTable";

type SettingsScreenProps = {
  children?: ReactNode;
};

export function SettingsScreen({ children }: SettingsScreenProps) {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <GroupedTable>
        <GroupedTable.Row>
          <GroupedTable.Row.Heading>Name</GroupedTable.Row.Heading>
          <GroupedTable.Row.Value>
            <GroupedTable.Row.Paragraph>You</GroupedTable.Row.Paragraph>
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
        <GroupedTable.Row>
          <GroupedTable.Row.Heading>Version</GroupedTable.Row.Heading>
          <GroupedTable.Row.Value>
            <GroupedTable.Row.Paragraph>{getAppVersion()}</GroupedTable.Row.Paragraph>
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
      </GroupedTable>
      {children}
    </ScrollView>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.background,
  },
  content: {
    padding: padding.lg,
    gap: spacing.lg,
  },
}));

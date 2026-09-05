import { ScrollView } from "react-native";

import { getAppVersion } from "@/modules/platform/config/getAppVersion";
import { createStyles } from "@/modules/platform/style/createStyles";
import { GroupedTable } from "@/modules/platform/ui/GroupedTable";

export function SettingsScreen() {
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
    </ScrollView>
  );
}

const styles = createStyles(({ color, padding }) => ({
  root: {
    flex: 1,
    backgroundColor: color.background,
  },
  content: {
    padding: padding.lg,
  },
}));

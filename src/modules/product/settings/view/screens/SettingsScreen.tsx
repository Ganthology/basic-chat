import { ScrollView } from "react-native";

import { getAppVersion } from "@/modules/platform/config/getAppVersion";
import { createStyles } from "@/modules/platform/style/createStyles";
import { GroupedTable } from "@/modules/platform/ui/GroupedTable";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

export function SettingsScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <GroupedTable>
        <GroupedTable.Row>
          <Heading size="lg">Name</Heading>
          <GroupedTable.Row.Value>
            <Paragraph tone="secondary">You</Paragraph>
          </GroupedTable.Row.Value>
        </GroupedTable.Row>
        <GroupedTable.Row>
          <Heading size="lg">Version</Heading>
          <GroupedTable.Row.Value>
            <Paragraph tone="secondary">{getAppVersion()}</Paragraph>
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

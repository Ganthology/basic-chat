import { ScrollView, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

export function SettingsScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.row}>
        <Paragraph>Name</Paragraph>
        <Paragraph size="sm" tone="secondary">
          You
        </Paragraph>
      </View>
      <View style={styles.row}>
        <Paragraph>Version</Paragraph>
        <Paragraph size="sm" tone="secondary">
          1.0.0
        </Paragraph>
      </View>
    </ScrollView>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
  },
  content: {
    padding: padding.lg,
    gap: spacing.md,
  },
  row: {
    backgroundColor: color.surface,
    borderRadius: padding.sm,
    padding: padding.lg,
    gap: spacing.xs,
  },
}));

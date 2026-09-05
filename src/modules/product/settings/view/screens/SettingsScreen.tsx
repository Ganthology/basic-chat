import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

export function SettingsScreen() {
  return (
    <View style={styles.root}>
      <Heading size="3xl">Settings</Heading>
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
    </View>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
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

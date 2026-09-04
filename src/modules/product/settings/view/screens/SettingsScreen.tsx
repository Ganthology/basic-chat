import { Text, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

export function SettingsScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Name</Text>
        <Text style={styles.rowMeta}>You</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Version</Text>
        <Text style={styles.rowMeta}>1.0.0</Text>
      </View>
    </View>
  );
}

const styles = createStyles(({ color, fontFamily, fontSize, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
    padding: padding.lg,
    gap: spacing.md,
  },
  title: {
    color: color.text,
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize.xl,
  },
  row: {
    backgroundColor: color.surface,
    borderRadius: padding.sm,
    padding: padding.lg,
    gap: spacing.xs,
  },
  rowLabel: {
    color: color.text,
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
  },
  rowMeta: {
    color: color.textSecondary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
  },
}));

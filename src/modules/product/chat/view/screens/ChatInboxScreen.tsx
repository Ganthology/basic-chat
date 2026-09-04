import { Pressable, Text, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

const PLACEHOLDER_CONVERSATION_ID = "demo";

type ChatInboxScreenProps = {
  onOpenChat: (conversationId: string) => void;
};

export function ChatInboxScreen({ onOpenChat }: ChatInboxScreenProps) {
  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        onPress={() => onOpenChat(PLACEHOLDER_CONVERSATION_ID)}
        style={styles.row}
      >
        <Text style={styles.rowTitle}>Demo conversation</Text>
        <Text style={styles.rowMeta}>Open thread</Text>
      </Pressable>
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
  row: {
    backgroundColor: color.surface,
    borderRadius: padding.sm,
    padding: padding.lg,
    gap: spacing.xs,
  },
  rowTitle: {
    color: color.text,
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.lg,
  },
  rowMeta: {
    color: color.textSecondary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
  },
}));

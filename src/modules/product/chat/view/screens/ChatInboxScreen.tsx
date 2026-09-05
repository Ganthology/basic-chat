import { Pressable, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

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
        <Heading size="lg">Demo conversation</Heading>
        <Paragraph size="sm" tone="secondary">
          Open thread
        </Paragraph>
      </Pressable>
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

import { Pressable, ScrollView } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

const PLACEHOLDER_CONVERSATION_ID = "demo";

type ChatInboxScreenProps = {
  onOpenChat: (conversationId: string) => void;
};

export function ChatInboxScreen({ onOpenChat }: ChatInboxScreenProps) {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
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
    gap: spacing.md,
  },
  row: {
    backgroundColor: color.container,
    borderRadius: padding.sm,
    padding: padding.lg,
    gap: spacing.xs,
  },
}));

import { Pressable, ScrollView, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

type ChatScreenProps = {
  conversationId: string;
  onOpenProfile: () => void;
};

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  return (
    <View collapsable={false} style={styles.root}>
      <ScrollView
        style={styles.thread}
        contentContainerStyle={styles.threadContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open contact profile"
          onPress={onOpenProfile}
          style={styles.contact}
        >
          <View style={styles.avatar} />
          <View style={styles.contactCopy}>
            <Heading size="md">Contact</Heading>
            <Paragraph size="sm" tone="tertiary">
              {conversationId}
            </Paragraph>
          </View>
        </Pressable>
        <View style={styles.empty}>
          <Paragraph size="xl" tone="tertiary">
            No messages
          </Paragraph>
        </View>
      </ScrollView>
      <View style={styles.composer}>
        <Paragraph tone="secondary">Composer</Paragraph>
      </View>
    </View>
  );
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
  },
  thread: {
    flex: 1,
  },
  threadContent: {
    flexGrow: 1,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: color.surface,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomColor: color.separator,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.surface,
  },
  contactCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: padding.lg,
  },
  composer: {
    backgroundColor: color.surface,
    padding: padding.lg,
    borderTopColor: color.separator,
    borderTopWidth: 1,
  },
}));

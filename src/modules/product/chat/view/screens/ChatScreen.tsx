import { Pressable, Text, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";

type ChatScreenProps = {
  conversationId: string;
  onOpenProfile: () => void;
};

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open contact profile"
        onPress={onOpenProfile}
        style={styles.contact}
      >
        <View style={styles.avatar} />
        <View style={styles.contactCopy}>
          <Text style={styles.contactName}>Contact</Text>
          <Text style={styles.contactMeta}>{conversationId}</Text>
        </View>
      </Pressable>
      <View style={styles.thread}>
        <Text style={styles.emptyMark}>No messages</Text>
      </View>
      <View style={styles.composer}>
        <Text style={styles.composerHint}>Composer</Text>
      </View>
    </View>
  );
}

const styles = createStyles(({ color, fontFamily, fontSize, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.canvas,
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
  contactName: {
    color: color.text,
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.md,
  },
  contactMeta: {
    color: color.textTertiary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.sm,
  },
  thread: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: padding.lg,
  },
  emptyMark: {
    color: color.textTertiary,
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.lg,
  },
  composer: {
    backgroundColor: color.surface,
    padding: padding.lg,
    borderTopColor: color.separator,
    borderTopWidth: 1,
  },
  composerHint: {
    color: color.textSecondary,
    fontFamily: fontFamily.body.regular,
    fontSize: fontSize.md,
  },
}));

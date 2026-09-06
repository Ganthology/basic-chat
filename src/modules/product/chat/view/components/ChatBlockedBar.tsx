import { Pressable, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

type ChatBlockedBarProps = {
  onUnblock: () => void;
};

export function ChatBlockedBar({ onUnblock }: ChatBlockedBarProps) {
  return (
    <View testID="chat-blocked" style={styles.root}>
      <Paragraph tone="secondary">Blocked</Paragraph>
      <Pressable
        testID="chat-unblock"
        accessibilityRole="button"
        accessibilityLabel="Unblock contact"
        hitSlop={8}
        onPress={onUnblock}
      >
        <Paragraph>Unblock</Paragraph>
      </Pressable>
    </View>
  );
}

const styles = createStyles(({ padding, spacing }) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    gap: spacing.sm,
  },
}));

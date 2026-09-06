import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Button } from "@/modules/platform/ui/Button";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

type ConversationListEmptyProps = {
  onPress?: () => void;
};

export function ConversationListEmpty({ onPress }: ConversationListEmptyProps) {
  return (
    <View style={styles.root}>
      <Heading size="xl" style={styles.copy}>
        No conversations
      </Heading>
      <Paragraph tone="secondary" style={styles.copy}>
        Start a chat to see it here.
      </Paragraph>
      <Button onPress={onPress}>New chat</Button>
    </View>
  );
}

const styles = createStyles(({ padding, spacing }) => ({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    padding: padding.lg,
  },
  copy: {
    textAlign: "center",
  },
}));

import { View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

type ProfileScreenProps = {
  userId: string;
};

export function ProfileScreen({ userId }: ProfileScreenProps) {
  return (
    <View style={styles.root}>
      <View style={styles.identity}>
        <View style={styles.avatar} />
        <Heading size="3xl">Contact</Heading>
        <Paragraph tone="secondary">Phone</Paragraph>
        <Paragraph size="sm" tone="tertiary">
          {userId}
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
  },
  identity: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: padding.xxl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: color.surface,
  },
}));

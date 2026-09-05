import { useState } from "react";
import { ScrollView, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Heading } from "@/modules/platform/ui/Heading";
import { ListGroup } from "@/modules/platform/ui/ListGroup";
import { Paragraph } from "@/modules/platform/ui/Paragraph";
import { Toggle } from "@/modules/platform/ui/Toggle";

type ProfileScreenProps = {
  userId: string;
};

export function ProfileScreen({ userId }: ProfileScreenProps) {
  const [blocked, setBlocked] = useState(false);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.identity}>
        <View style={styles.avatar} />
        <Heading size="3xl">Contact</Heading>
        <Paragraph tone="secondary">Phone</Paragraph>
        <Paragraph size="sm" tone="tertiary">
          {userId}
        </Paragraph>
      </View>
      <ListGroup rounded>
        <ListGroup.Item>
          <ListGroup.Item.Content showSeparator={false}>
            <Heading size="lg">Block</Heading>
          </ListGroup.Item.Content>
          <Toggle accessibilityLabel="Block contact" value={blocked} onValueChange={setBlocked} />
        </ListGroup.Item>
      </ListGroup>
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
    backgroundColor: color.container,
  },
}));

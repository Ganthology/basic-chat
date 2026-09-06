import { ActivityIndicator, ScrollView, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Avatar } from "@/modules/platform/ui/Avatar";
import { GroupedTable } from "@/modules/platform/ui/GroupedTable";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

import { useProfileScreenVM } from "../viewModel/useProfileScreenVM";

type ProfileScreenProps = {
  userId: string;
};

export function ProfileScreen({ userId }: ProfileScreenProps) {
  const { user, isPending, isError, blocked, setBlocked, showEmptyChat, setShowEmptyChat } =
    useProfileScreenVM(userId);
  const name = user?.name ?? "Contact";
  const phone = user?.phone ?? "—";
  const avatar = user?.avatar ?? "";
  const initials = initialsFromName(name);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.identity}>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <>
            <Avatar size="xl" initials={initials} accessibilityLabel={name}>
              {avatar.length > 0 ? <Avatar.Image source={avatar} /> : null}
            </Avatar>
            <Heading size="3xl">{name}</Heading>
            {isError ? <Paragraph tone="secondary">Could not load contact</Paragraph> : null}
          </>
        )}
      </View>
      {isPending ? null : (
        <GroupedTable>
          <GroupedTable.Row>
            <GroupedTable.Row.Heading>Phone</GroupedTable.Row.Heading>
            <GroupedTable.Row.Value>
              <GroupedTable.Row.Paragraph>{phone}</GroupedTable.Row.Paragraph>
            </GroupedTable.Row.Value>
          </GroupedTable.Row>
          <GroupedTable.Row>
            <GroupedTable.Row.Heading>Block</GroupedTable.Row.Heading>
            <GroupedTable.Row.Toggle
              accessibilityLabel="Block contact"
              value={blocked}
              onValueChange={setBlocked}
            />
          </GroupedTable.Row>
          <GroupedTable.Row>
            <GroupedTable.Row.Heading>Empty chat</GroupedTable.Row.Heading>
            <GroupedTable.Row.Toggle
              accessibilityLabel="Show empty chat"
              value={showEmptyChat}
              onValueChange={setShowEmptyChat}
            />
          </GroupedTable.Row>
        </GroupedTable>
      )}
    </ScrollView>
  );
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
}

const styles = createStyles(({ color, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.background,
  },
  content: {
    padding: padding.lg,
    gap: spacing.lg,
  },
  identity: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: padding.xxl,
  },
}));

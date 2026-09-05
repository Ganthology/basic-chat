import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Avatar } from "@/modules/platform/ui/Avatar";
import { Heading } from "@/modules/platform/ui/Heading";
import { IconButton } from "@/modules/platform/ui/IconButton";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

import { ChatMessage } from "../components/ChatMessage";
import { ChatRoom } from "../components/ChatRoom";
import { Composer } from "../components/Composer";
import { useChatScreenVM } from "../viewModel/useChatScreenVM";

type ChatScreenProps = {
  conversationId: string;
  onOpenProfile: () => void;
};

const NAV_BAR_HEIGHT = 44;

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  const insets = useSafeAreaInsets();
  const { messages, contact, draft, setDraft, send, canSend, isPending, isError } =
    useChatScreenVM(conversationId);

  const rows = isPending || (isError && messages.length === 0) ? [] : messages;
  const name = contact?.name ?? "Contact";
  const avatar = contact?.avatar ?? "";
  const initials = initialsFromName(name);

  return (
    <View collapsable={false} style={[styles.root, { paddingBottom: insets.bottom }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open contact profile"
        onPress={onOpenProfile}
        style={[styles.contact, { paddingTop: insets.top + NAV_BAR_HEIGHT }]}
      >
        <Avatar size="sm" initials={initials} accessibilityLabel={name}>
          {avatar.length > 0 ? <Avatar.Image source={avatar} /> : null}
        </Avatar>
        <View style={styles.contactCopy}>
          <Heading size="md" numberOfLines={1}>
            {name}
          </Heading>
          {contact == null ? (
            <Paragraph size="sm" tone="tertiary">
              {conversationId}
            </Paragraph>
          ) : null}
        </View>
      </Pressable>
      <ChatRoom
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage from={item.from} optimistic={item.optimistic}>
            {item.body}
          </ChatMessage>
        )}
        alignItemsAtEnd={rows.length > 0}
        contentContainerStyle={rows.length === 0 ? styles.emptyContent : undefined}
        ListEmptyComponent={
          <View style={styles.status}>
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Paragraph tone="secondary">
                {isError ? "Could not load messages" : "No messages"}
              </Paragraph>
            )}
          </View>
        }
      />
      <Composer>
        <Composer.Input
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={send}
          returnKeyType="send"
          enablesReturnKeyAutomatically
        />
        <IconButton
          variant="filled"
          size="sm"
          accessibilityLabel="Send"
          disabled={!canSend}
          onPress={send}
        >
          <Text style={styles.sendIcon}>↑</Text>
        </IconButton>
      </Composer>
    </View>
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

const styles = createStyles(({ color, fontSize, padding, spacing }) => ({
  root: {
    flex: 1,
    backgroundColor: color.background,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: color.container,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    borderBottomColor: color.separator,
    borderBottomWidth: 1,
  },
  contactCopy: {
    flex: 1,
    gap: spacing.xxs,
  },
  emptyContent: {
    flexGrow: 1,
  },
  status: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: padding.lg,
  },
  sendIcon: {
    color: color.accentText,
    fontSize: fontSize.xl,
    fontWeight: "600",
    lineHeight: 24,
  },
}));

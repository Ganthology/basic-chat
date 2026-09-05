import { useKeyboardChatComposerInset } from "@legendapp/list/keyboard";
import { type LegendListRef } from "@legendapp/list/react-native";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useRef } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Avatar } from "@/modules/platform/ui/Avatar";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

import { ChatMessage } from "../components/ChatMessage";
import { ChatRoom } from "../components/ChatRoom";
import { Composer } from "../components/Composer";
import { useChatScreenVM } from "../viewModel/useChatScreenVM";

type ChatScreenProps = {
  conversationId: string;
  onOpenProfile: () => void;
};

type ChatScreenTitleProps = {
  name: string;
  avatar: string;
  initials: string;
  onPress: () => void;
};

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const listRef = useRef<LegendListRef>(null);
  const composerRef = useRef<View>(null);
  const { contentInsetEndAdjustment, onComposerLayout } = useKeyboardChatComposerInset(
    listRef,
    composerRef,
  );
  const { messages, contact, draft, setDraft, send, canSend, isPending, isError } =
    useChatScreenVM(conversationId);

  const rows = isPending || (isError && messages.length === 0) ? [] : messages;
  const name = contact?.name ?? "Contact";
  const avatar = contact?.avatar ?? "";
  const initials = initialsFromName(name);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "transparent" },
      headerTitle: () => (
        <ChatScreenTitle name={name} avatar={avatar} initials={initials} onPress={onOpenProfile} />
      ),
    });
  }, [avatar, initials, name, navigation, onOpenProfile]);

  return (
    <View style={styles.root}>
      <ChatRoom
        ref={listRef}
        data={rows}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage from={item.from} optimistic={item.optimistic}>
            {item.body}
          </ChatMessage>
        )}
        alignItemsAtEnd={rows.length > 0}
        contentContainerStyle={rows.length === 0 ? styles.emptyContent : undefined}
        contentInsetEndAdjustment={contentInsetEndAdjustment}
        keyboardOffset={insets.bottom}
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
      <View style={[styles.composerDock, { paddingBottom: insets.bottom }]}>
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
          <View ref={composerRef} onLayout={onComposerLayout}>
            <Composer>
              <Composer.Input
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={send}
                returnKeyType="send"
                enablesReturnKeyAutomatically
              />
              <Composer.IconButton accessibilityLabel="Send" disabled={!canSend} onPress={send}>
                <Composer.IconButton.Icon name="send" />
              </Composer.IconButton>
            </Composer>
          </View>
        </KeyboardStickyView>
      </View>
    </View>
  );
}

function ChatScreenTitle({ name, avatar, initials, onPress }: ChatScreenTitleProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open contact profile"
      hitSlop={8}
      onPress={onPress}
      style={styles.title}
    >
      <Avatar size="sm" initials={initials} accessibilityLabel={name}>
        {avatar.length > 0 ? <Avatar.Image source={avatar} /> : null}
      </Avatar>
      <Heading size="md" numberOfLines={1}>
        {name}
      </Heading>
    </Pressable>
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
  composerDock: {
    backgroundColor: color.container,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    maxWidth: 220,
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
}));

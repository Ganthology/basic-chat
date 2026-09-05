import { useKeyboardChatComposerInset, useKeyboardScrollToEnd } from "@legendapp/list/keyboard";
import { type LegendListRef } from "@legendapp/list/react-native";
import { useNavigation } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ActivityIndicator, Pressable, View, type TextInput } from "react-native";
import { KeyboardController, KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PADDING } from "@/modules/platform/style/PADDING";
import { createStyles } from "@/modules/platform/style/createStyles";
import { Avatar } from "@/modules/platform/ui/Avatar";
import { Heading } from "@/modules/platform/ui/Heading";
import { ListGroup } from "@/modules/platform/ui/ListGroup";
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

const blockedEntering = FadeIn.springify();
const blockedExiting = FadeOut.springify();
const composerEntering = SlideInDown.springify();
const COMPOSER_PILL_ESTIMATE = 48;

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const listRef = useRef<LegendListRef>(null);
  const composerRef = useRef<View>(null);
  const inputRef = useRef<TextInput>(null);
  const { freeze, scrollMessageToEnd } = useKeyboardScrollToEnd({ listRef });
  const { contentInsetEndAdjustment, onComposerLayout } = useKeyboardChatComposerInset(
    listRef,
    composerRef,
    insets.bottom + PADDING.md + COMPOSER_PILL_ESTIMATE,
  );
  const {
    messages,
    contact,
    draft,
    setDraft,
    send,
    canSend,
    isBlocked,
    unblock,
    isPending,
    isError,
  } = useChatScreenVM(conversationId);

  useEffect(() => {
    if (!isBlocked) {
      return;
    }

    contentInsetEndAdjustment.value = 0;
    listRef.current?.reportContentInset({ bottom: 0 });
  }, [contentInsetEndAdjustment, isBlocked]);

  function handleSend() {
    send();
    KeyboardController.setFocusTo("current");
    inputRef.current?.focus();
    void scrollMessageToEnd({ animated: true, closeKeyboard: false });
  }

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
        freeze={freeze}
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
      {isBlocked ? (
        <Animated.View
          key="blocked"
          entering={blockedEntering}
          exiting={blockedExiting}
          style={[styles.blockedDock, { paddingBottom: insets.bottom }]}
        >
          <Heading size="lg">You blocked this contact</Heading>
          <Paragraph tone="secondary">Unblock to send messages.</Paragraph>
          <ListGroup rounded>
            <ListGroup.Item accessibilityLabel="Unblock" onPress={unblock}>
              <ListGroup.Item.Content>
                <ListGroup.Item.Headline>
                  <Heading size="lg">Unblock</Heading>
                </ListGroup.Item.Headline>
              </ListGroup.Item.Content>
            </ListGroup.Item>
          </ListGroup>
        </Animated.View>
      ) : (
        <Animated.View
          key="composer"
          entering={composerEntering}
          exiting={SlideOutDown.duration(220)}
          style={styles.composerDock}
        >
          <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
            <View
              ref={composerRef}
              onLayout={onComposerLayout}
              style={[styles.composerMeasure, { paddingBottom: insets.bottom + PADDING.md }]}
            >
              <Composer>
                <Composer.Input
                  ref={inputRef}
                  value={draft}
                  onChangeText={setDraft}
                  onSubmitEditing={handleSend}
                  returnKeyType="send"
                  enablesReturnKeyAutomatically
                />
                <Composer.Trailing>
                  <Composer.IconButton accessibilityLabel="Send" disabled={!canSend} onPress={handleSend}>
                    <Composer.IconButton.Icon icon={Send} />
                  </Composer.IconButton>
                </Composer.Trailing>
              </Composer>
            </View>
          </KeyboardStickyView>
        </Animated.View>
      )}
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
    position: "absolute",
    right: padding.md,
    bottom: 0,
    left: padding.md,
  },
  composerMeasure: {
    width: "100%",
  },
  blockedDock: {
    paddingHorizontal: padding.lg,
    paddingTop: padding.md,
    gap: spacing.sm,
    backgroundColor: color.background,
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

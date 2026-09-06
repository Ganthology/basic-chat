import { type LegendListRef } from "@legendapp/list/react-native";
import { useNavigation } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  View,
  type LayoutChangeEvent,
  type TextInput,
} from "react-native";
import {
  KeyboardController,
  KeyboardStickyView,
  useKeyboardState,
} from "react-native-keyboard-controller";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PADDING } from "@/modules/platform/style/PADDING";
import { createStyles } from "@/modules/platform/style/createStyles";
import { Avatar } from "@/modules/platform/ui/Avatar";
import { Heading } from "@/modules/platform/ui/Heading";
import { Paragraph } from "@/modules/platform/ui/Paragraph";
import { Skeleton } from "@/modules/platform/ui/Skeleton";

import { chatMessageItemType } from "../chatMessageItemType";
import { ChatBlockedBar } from "../components/ChatBlockedBar";
import { ChatMessage } from "../components/ChatMessage";
import { ChatRoom } from "../components/ChatRoom";
import { ChatThreadEmpty } from "../components/ChatThreadEmpty";
import { Composer } from "../components/Composer";
import { useChatScreenVM } from "../viewModel/useChatScreenVM";

type ChatScreenProps = {
  conversationId: string;
  onOpenProfile: () => void;
};

type ChatScreenTitleProps = {
  loading: boolean;
  name: string;
  avatar: string;
  initials: string;
  onPress: () => void;
};

const COMPOSER_PILL_ESTIMATE = 48;

export function ChatScreen({ conversationId, onOpenProfile }: ChatScreenProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const listRef = useRef<LegendListRef>(null);
  const inputRef = useRef<TextInput>(null);
  const keyboardHeight = useKeyboardState((state) => (state.isVisible ? state.height : 0));
  const [composerOverlayHeight, setComposerOverlayHeight] = useState(
    insets.bottom + PADDING.md + COMPOSER_PILL_ESTIMATE,
  );
  const {
    messages,
    contact,
    draft,
    setDraft,
    send,
    canSend,
    blocked,
    unblock,
    isPending,
    isContactPending,
    isError,
  } = useChatScreenVM(conversationId);

  const rows = isPending || (isError && messages.length === 0) ? [] : messages;
  const loadedIdsRef = useRef<ReadonlySet<string> | null>(null);
  if (loadedIdsRef.current == null && !isPending) {
    loadedIdsRef.current = new Set(messages.map((message) => message.id));
  }
  const name = isContactPending ? "" : (contact?.name ?? "Contact");
  const avatar = contact?.avatar ?? "";
  const initials = initialsFromName(name);
  const listEndSpacer = blocked
    ? 0
    : threadEndSpacer(composerOverlayHeight, keyboardHeight, insets.bottom);

  useEffect(() => {
    if (blocked) {
      return;
    }

    const list = listRef.current;
    if (list?.getState().isWithinMaintainScrollAtEndThreshold) {
      void list.scrollToEnd({ animated: true });
    }
  }, [blocked, listEndSpacer]);

  function onSend() {
    send();
    KeyboardController.setFocusTo("current");
    inputRef.current?.focus();
  }

  function onComposerOverlayLayout(event: LayoutChangeEvent) {
    setComposerOverlayHeight(event.nativeEvent.layout.height);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitle: () => (
        <ChatScreenTitle
          loading={isContactPending}
          name={name}
          avatar={avatar}
          initials={initials}
          onPress={onOpenProfile}
        />
      ),
    });
  }, [avatar, initials, isContactPending, name, navigation, onOpenProfile]);

  return (
    <View testID="chat-screen" style={styles.root}>
      <ChatRoom
        ref={listRef}
        data={rows}
        keyExtractor={(item) => item.id}
        getItemType={(item) => chatMessageItemType(item.body)}
        renderItem={({ item }) => {
          const message = <ChatMessage from={item.from}>{item.body}</ChatMessage>;
          const isNewSend =
            item.from === "user" &&
            loadedIdsRef.current != null &&
            !loadedIdsRef.current.has(item.id);
          if (!isNewSend) {
            return message;
          }

          return <ChatMessage.Grow>{message}</ChatMessage.Grow>;
        }}
        alignItemsAtEnd={rows.length > 0}
        contentContainerStyle={rows.length === 0 ? styles.emptyContent : undefined}
        extraData={listEndSpacer}
        keyboardLiftBehavior="never"
        ListFooterComponent={listEndSpacer > 0 ? <View style={{ height: listEndSpacer }} /> : undefined}
        ListEmptyComponent={
          isPending ? (
            <View style={styles.status}>
              <ActivityIndicator />
            </View>
          ) : isError ? (
            <View style={styles.status}>
              <Paragraph tone="secondary">Could not load messages</Paragraph>
            </View>
          ) : (
            <ChatThreadEmpty />
          )
        }
      />
      {blocked ? (
        <View style={[styles.blockedDock, { paddingBottom: insets.bottom }]}>
          <ChatBlockedBar onUnblock={unblock} />
        </View>
      ) : (
        <Animated.View
          entering={SlideInDown.springify()}
          exiting={SlideOutDown.duration(220)}
          style={styles.composerDock}
        >
          <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
            <View
              onLayout={onComposerOverlayLayout}
              style={[styles.composerMeasure, { paddingBottom: insets.bottom + PADDING.md }]}
            >
              <Composer>
                <Composer.Input
                  ref={inputRef}
                  testID="composer-input"
                  value={draft}
                  onChangeText={setDraft}
                />
                <Composer.Trailing>
                  <Composer.IconButton
                    testID="composer-send"
                    accessibilityLabel="Send"
                    disabled={!canSend}
                    onPress={onSend}
                  >
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

function ChatScreenTitle({ loading, name, avatar, initials, onPress }: ChatScreenTitleProps) {
  return (
    <Pressable
      testID="chat-header"
      accessibilityRole="button"
      accessibilityLabel={loading ? "Loading contact" : "Open contact profile"}
      accessibilityState={{ busy: loading }}
      hitSlop={8}
      onPress={onPress}
      style={styles.title}
    >
      {loading ? (
        <Skeleton.View style={styles.title}>
          <Avatar.Skeleton size="sm" />
          <Heading.Skeleton size="md" width={96} />
        </Skeleton.View>
      ) : (
        <>
          <Avatar size="sm" initials={initials} accessibilityLabel={name}>
            {avatar.length > 0 ? <Avatar.Image source={avatar} /> : null}
          </Avatar>
          <Heading size="md" numberOfLines={1}>
            {name}
          </Heading>
        </>
      )}
    </Pressable>
  );
}

function threadEndSpacer(overlayHeight: number, keyboardHeight: number, bottomInset: number): number {
  return overlayHeight + Math.max(0, keyboardHeight - bottomInset);
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

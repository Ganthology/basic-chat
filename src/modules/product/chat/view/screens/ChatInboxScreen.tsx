import { ActivityIndicator, FlatList, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { ListItem } from "@/modules/platform/ui/ListGroup/ListItem";
import { Paragraph } from "@/modules/platform/ui/Paragraph";
import { Skeleton } from "@/modules/platform/ui/Skeleton";

import { ChatInboxRow } from "../components/ChatInboxRow";
import { ConversationListEmpty } from "../components/ConversationListEmpty";
import { useChatInboxScreenVM } from "../viewModel/useChatInboxScreenVM";

const INBOX_SKELETON_COUNT = 8;

type ChatInboxScreenProps = {
  onOpenChat: (conversationId: string) => void;
};

export function ChatInboxScreen({ onOpenChat }: ChatInboxScreenProps) {
  const { conversations, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useChatInboxScreenVM();

  const rows = isPending || (isError && conversations.length === 0) ? [] : conversations;

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={rows.length === 0 && !isPending ? styles.emptyContent : undefined}
      data={rows}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ChatInboxRow
          name={item.name}
          avatar={item.avatar}
          onPress={() => onOpenChat(String(item.id))}
        />
      )}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        isPending ? (
          <Skeleton.View>
            {Array.from({ length: INBOX_SKELETON_COUNT }, (_, index) => (
              <ListItem.Skeleton key={index} />
            ))}
          </Skeleton.View>
        ) : isError ? (
          <View style={styles.status}>
            <Paragraph tone="secondary">Could not load conversations</Paragraph>
          </View>
        ) : (
          <ConversationListEmpty />
        )
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ) : null
      }
    />
  );
}

const styles = createStyles(({ color, padding }) => ({
  root: {
    flex: 1,
    backgroundColor: color.background,
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
  footer: {
    paddingVertical: padding.lg,
    alignItems: "center",
  },
}));

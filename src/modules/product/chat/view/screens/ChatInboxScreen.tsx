import { ActivityIndicator, FlatList, View } from "react-native";

import { createStyles } from "@/modules/platform/style/createStyles";
import { Paragraph } from "@/modules/platform/ui/Paragraph";

import { ChatInboxRow } from "../components/ChatInboxRow";
import { useChatInboxScreenVM } from "../viewModel/useChatInboxScreenVM";

type ChatInboxScreenProps = {
  onOpenChat: (conversationId: string) => void;
};

export function ChatInboxScreen({ onOpenChat }: ChatInboxScreenProps) {
  const {
    conversations,
    isPending,
    isError,
    isFetchingNextPage,
    enterOrder,
    onEndReached,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onContentSizeChange,
    onEndReachedThreshold,
  } = useChatInboxScreenVM();

  const rows = isPending || (isError && conversations.length === 0) ? [] : conversations;

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={rows.length === 0 ? styles.emptyContent : undefined}
      data={rows}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => (
        <ChatInboxRow
          name={item.name}
          avatar={item.avatar}
          onPress={() => onOpenChat(String(item.id))}
          enterOrder={enterOrder(index)}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      onScroll={onScroll}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      onContentSizeChange={onContentSizeChange}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        <View style={styles.status}>
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Paragraph tone="secondary">
              {isError ? "Could not load conversations" : "No conversations"}
            </Paragraph>
          )}
        </View>
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

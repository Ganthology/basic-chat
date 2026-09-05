import type { Page } from "@/modules/platform/network/Page";
import { useInfiniteQuery } from "@/modules/platform/query/useInfiniteQuery";
import type { User } from "@/modules/product/user/data/entities/User";

import { useInboxEndReached } from "../hooks/useInboxEndReached";
import { conversationsQueryOptions } from "../query/conversationsQueryOptions";

export function useChatInboxScreenVM() {
  const query = useInfiniteQuery(conversationsQueryOptions());
  const endReached = useInboxEndReached({
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  return {
    conversations: flattenConversationPages(query.data?.pages),
    isPending: query.isPending,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    ...endReached,
  };
}

function flattenConversationPages(pages: Page<User>[] | undefined): User[] {
  if (pages == null) {
    return [];
  }

  return pages.flatMap((page) => page.items);
}

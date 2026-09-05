import type { Page } from "@/modules/platform/network/Page";
import { useInfiniteQuery } from "@/modules/platform/query/useInfiniteQuery";
import type { User } from "@/modules/product/user/data/entities/User";

import { conversationsQueryOptions } from "../query/conversationsQueryOptions";

export function useChatInboxScreenVM() {
  const query = useInfiniteQuery(conversationsQueryOptions());

  return {
    conversations: flattenConversationPages(query.data?.pages),
    isPending: query.isPending,
    isError: query.isError,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}

function flattenConversationPages(pages: Page<User>[] | undefined): User[] {
  if (pages == null) {
    return [];
  }

  return pages.flatMap((page) => page.items);
}

import { useFeatureFlag } from "@/modules/platform/featureFlag/useFeatureFlag";
import type { Page } from "@/modules/platform/network/Page";
import { useInfiniteQuery } from "@/modules/platform/query/useInfiniteQuery";
import type { ChatFeatureFlagRepository } from "@/modules/product/chat/data/repository/ChatFeatureFlagRepository";
import { ChatFeatureFlagRepositoryImpl } from "@/modules/product/chat/data/repositoryImpl/ChatFeatureFlagRepositoryImpl";
import type { User } from "@/modules/product/user/data/entities/User";

import { conversationsQueryOptions } from "../query/conversationsQueryOptions";

const chatFeatureFlagRepository: ChatFeatureFlagRepository = new ChatFeatureFlagRepositoryImpl();

export function useChatInboxScreenVM() {
  const query = useInfiniteQuery(conversationsQueryOptions());
  const showEmptyConversationList = useFeatureFlag(
    chatFeatureFlagRepository,
    "showEmptyConversationList",
  );
  const items = flattenConversationPages(query.data?.pages);
  const conversations =
    !query.isPending && !query.isError && showEmptyConversationList ? [] : items;

  return {
    conversations,
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

import { getNextPageParam } from "@/modules/platform/network/getNextPageParam";
import { infiniteQueryOptions } from "@/modules/platform/query/infiniteQueryOptions";

import { ChatRepositoryImpl } from "../../data/repositoryImpl/ChatRepositoryImpl";

const chatRepository = new ChatRepositoryImpl();
const PAGE_SIZE = 20;

export function messagesQueryOptions(conversationId: string, pageSize = PAGE_SIZE) {
  return infiniteQueryOptions({
    queryKey: ["messages", conversationId, pageSize],
    queryFn: ({ pageParam }) => chatRepository.listMessages(conversationId, pageParam),
    initialPageParam: { limit: pageSize, offset: 0 },
    getNextPageParam,
  });
}

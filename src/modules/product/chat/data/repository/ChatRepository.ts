import type { ListParams } from "@/modules/platform/network/ListParams";
import type { Page } from "@/modules/platform/network/Page";

import type { Post } from "../entities/Post";

export type ChatRepository = {
  listMessages(conversationId: string, page: ListParams): Promise<Page<Post>>;
  sendMessage(conversationId: string, body: string): Promise<Post>;
};

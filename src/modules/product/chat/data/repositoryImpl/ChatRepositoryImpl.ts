import type { ListParams } from "@/modules/platform/network/ListParams";
import type { Page } from "@/modules/platform/network/Page";
import { toPage } from "@/modules/platform/network/toPage";

import { postToChatAdapter } from "../adapters/postToChatAdapter";
import type { Post } from "../entities/Post";
import type { ChatRepository } from "../repository/ChatRepository";
import { postApi } from "../services/postApi";

export class ChatRepositoryImpl implements ChatRepository {
  constructor(
    private readonly api = postApi,
    private readonly adapter = postToChatAdapter,
  ) {}

  async listMessages(conversationId: string, page: ListParams): Promise<Page<Post>> {
    const response = await this.api.listPosts({ userId: conversationId, ...page });
    return toPage(response);
  }

  async sendMessage(conversationId: string, body: string): Promise<Post> {
    return this.api.createPost(this.adapter.toCreatePost({ userId: conversationId, body }));
  }
}

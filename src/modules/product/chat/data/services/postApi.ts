import type { ListParams } from "@/modules/platform/network/ListParams";
import type { ListResponse } from "@/modules/platform/network/ListResponse";
import { network } from "@/modules/platform/network/network";

import type { Post } from "../entities/Post";

const POST_ROUTES = {
  posts: "/api/posts",
} as const;

export const postApi = {
  /**
   * GET /api/posts
   *
   * @example
   * {
   *   total: 100,
   *   limit: 1,
   *   offset: 0,
   *   results: [
   *     {
   *       id: 1,
   *       userId: 5,
   *       title: "Exploring REST APIs in 2025",
   *       body: "REST APIs continue to be the backbone of modern web development.",
   *       tags: ["1", "16", "15"],
   *       category: "API Design",
   *       createdAt: "2025-07-01T10:12:00Z"
   *     }
   *   ]
   * }
   */
  async listPosts({ userId, limit, offset }: ListParams & { userId: string }) {
    const response = await network.get<ListResponse<Post>>(POST_ROUTES.posts, {
      query: { userId, limit, offset },
    });
    return response.data;
  },

  /**
   * POST /api/posts
   *
   * @example
   * {
   *   id: 101,
   *   userId: 1,
   *   title: "Hello",
   *   slug: "hello",
   *   body: "Hi there",
   *   tags: [],
   *   category: "General",
   *   createdAt: "2026-09-05T02:30:23.887Z"
   * }
   */
  async createPost(body: { userId: number; title: string; body: string }) {
    const response = await network.post<Post>(POST_ROUTES.posts, body);
    return response.data;
  },
};

import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, useSyncExternalStore } from "react";

import type { Page } from "@/modules/platform/network/Page";
import { useInfiniteQuery } from "@/modules/platform/query/useInfiniteQuery";
import { useQuery } from "@/modules/platform/query/useQuery";
import type { Post } from "@/modules/product/chat/data/entities/Post";
import { ChatRepositoryImpl } from "@/modules/product/chat/data/repositoryImpl/ChatRepositoryImpl";
import { BlockedUsersRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/BlockedUsersRepositoryImpl";
import { userQueryOptions } from "@/modules/product/user/view/query/userQueryOptions";

import type { ChatMessageFrom } from "../components/ChatMessage";
import { messagesQueryOptions } from "../query/messagesQueryOptions";

const chatRepository = new ChatRepositoryImpl();
const blockedUsersRepository = new BlockedUsersRepositoryImpl();

type MessagesData = InfiniteData<Page<Post>>;

export type ChatThreadMessage = {
  id: string;
  body: string;
  from: ChatMessageFrom;
  createdAt: string;
};

export function useChatScreenVM(conversationId: string) {
  const queryClient = useQueryClient();
  const messagesQuery = useInfiniteQuery(messagesQueryOptions(conversationId));
  const contactQuery = useQuery(userQueryOptions(conversationId));
  const messagesQueryKey = messagesQueryOptions(conversationId).queryKey;
  // Repository port, not Zustand. RFC 0002 / ADR 0008.
  const isBlocked = useSyncExternalStore(
    (onStoreChange) => blockedUsersRepository.subscribe(onStoreChange),
    () => blockedUsersRepository.isBlocked(conversationId),
    () => blockedUsersRepository.isBlocked(conversationId),
  );
  const [sentIds, setSentIds] = useState<ReadonlySet<number>>(() => new Set());

  const messages = useMemo(
    () => flattenMessagePages(messagesQuery.data?.pages).map((post) => toThreadMessage(post, sentIds)),
    [messagesQuery.data?.pages, sentIds],
  );

  const sendMutation = useMutation({
    mutationFn: (body: string) => chatRepository.sendMessage(conversationId, body),
    onMutate: async (body) => {
      const post = createPostedMessage(conversationId, body);
      await queryClient.cancelQueries({ queryKey: messagesQueryKey });
      const previous = queryClient.getQueryData<MessagesData>(messagesQueryKey);
      queryClient.setQueryData<MessagesData>(messagesQueryKey, (current) =>
        appendMessagePage(current, post),
      );
      setSentIds((current) => new Set(current).add(post.id));
      return { previous, id: post.id };
    },
    onError: (_error, _body, context) => {
      if (context?.previous != null) {
        queryClient.setQueryData(messagesQueryKey, context.previous);
      }
      if (context?.id != null) {
        setSentIds((current) => {
          const next = new Set(current);
          next.delete(context.id);
          return next;
        });
      }
    },
  });

  function sendMessage(body: string): Promise<Post> {
    return sendMutation.mutateAsync(body);
  }

  function unblock(): void {
    blockedUsersRepository.unblock(conversationId);
  }

  return {
    messages,
    contact: contactQuery.data,
    sendMessage,
    isBlocked,
    unblock,
    isPending: messagesQuery.isPending,
    isError: messagesQuery.isError,
  };
}

function toThreadMessage(post: Post, sentIds: ReadonlySet<number>): ChatThreadMessage {
  return {
    id: String(post.id),
    body: post.body,
    from: sentIds.has(post.id) ? "user" : "other",
    createdAt: post.createdAt,
  };
}

function createPostedMessage(conversationId: string, body: string): Post {
  const title = body.trim().slice(0, 80);
  return {
    id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    userId: Number(conversationId),
    title: title.length > 0 ? title : "Message",
    body,
    tags: [],
    category: "General",
    createdAt: new Date().toISOString(),
  };
}

function appendMessagePage(data: MessagesData | undefined, post: Post): MessagesData {
  if (data == null || data.pages.length === 0) {
    return {
      pages: [{ items: [post], total: 1, limit: 20, offset: 0 }],
      pageParams: [{ limit: 20, offset: 0 }],
    };
  }

  const last = data.pages.length - 1;
  return {
    ...data,
    pages: data.pages.map((page, index) =>
      index === last ? { ...page, items: [...page.items, post], total: page.total + 1 } : page,
    ),
  };
}

function flattenMessagePages(pages: Page<Post>[] | undefined): Post[] {
  if (pages == null) {
    return [];
  }

  const seen = new Set<number>();
  const posts: Post[] = [];
  for (const page of pages) {
    for (const post of page.items) {
      if (seen.has(post.id)) {
        continue;
      }
      seen.add(post.id);
      posts.push(post);
    }
  }
  return posts;
}

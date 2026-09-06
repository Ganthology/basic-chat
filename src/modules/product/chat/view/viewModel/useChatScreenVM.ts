import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

import type { Page } from "@/modules/platform/network/Page";
import { queryOptions } from "@/modules/platform/query/queryOptions";
import { useInfiniteQuery } from "@/modules/platform/query/useInfiniteQuery";
import { useQuery } from "@/modules/platform/query/useQuery";
import type { Post } from "@/modules/product/chat/data/entities/Post";
import { ChatRepositoryImpl } from "@/modules/product/chat/data/repositoryImpl/ChatRepositoryImpl";
import { BlockedUsersRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/BlockedUsersRepositoryImpl";
import { UserFeatureFlagRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/UserFeatureFlagRepositoryImpl";
import { userQueryOptions } from "@/modules/product/user/view/query/userQueryOptions";

import type { ChatMessageFrom } from "../components/ChatMessage";
import { messagesQueryOptions } from "../query/messagesQueryOptions";

const chatRepository = new ChatRepositoryImpl();
const blockedUsersRepository = new BlockedUsersRepositoryImpl();
const userFeatureFlagRepository = new UserFeatureFlagRepositoryImpl();

export type ChatThreadMessage = {
  id: string;
  body: string;
  from: ChatMessageFrom;
  createdAt: string;
};

export function useChatScreenVM(conversationId: string) {
  const queryClient = useQueryClient();
  const messageOptions = messagesQueryOptions(conversationId);
  const sentOptions = sentIdsQueryOptions(conversationId);
  const messagesQuery = useInfiniteQuery(messageOptions);
  const sentIdsQuery = useQuery(sentOptions);
  const contactQuery = useQuery(userQueryOptions(conversationId));

  const [draft, setDraft] = useState("");
  const [growingIds, setGrowingIds] = useState<ReadonlySet<string>>(() => new Set());
  const sentIds = sentIdsQuery.data ?? EMPTY_SENT_IDS;
  const subscribeBlocked = useCallback(
    (onStoreChange: () => void) => blockedUsersRepository.subscribe(onStoreChange),
    [],
  );
  const blocked = useSyncExternalStore(
    subscribeBlocked,
    () => blockedUsersRepository.isBlocked(conversationId),
    () => blockedUsersRepository.isBlocked(conversationId),
  );
  const subscribeFlags = useCallback(
    (onStoreChange: () => void) => userFeatureFlagRepository.subscribe(onStoreChange),
    [],
  );
  const showEmptyChat = useSyncExternalStore(
    subscribeFlags,
    () => userFeatureFlagRepository.getShowEmptyChat(conversationId),
    () => userFeatureFlagRepository.getShowEmptyChat(conversationId),
  );

  const messages = useMemo(() => {
    const merged = mergeThreadMessages(flattenMessagePages(messagesQuery.data?.pages), sentIds);
    if (!messagesQuery.isPending && !messagesQuery.isError && showEmptyChat) {
      return [];
    }
    return merged;
  }, [messagesQuery.data?.pages, messagesQuery.isError, messagesQuery.isPending, sentIds, showEmptyChat]);

  const sendMutation = useMutation({
    mutationFn: (body: string) => chatRepository.sendMessage(conversationId, body),
  });

  function send() {
    const body = draft.trim();
    if (blocked || body.length === 0) {
      return;
    }

    const localId = Date.now();
    const localKey = String(localId);
    const localPost = createLocalPost(localId, conversationId, body);

    queryClient.setQueryData(messageOptions.queryKey, (current) => appendPageItem(current, localPost));
    queryClient.setQueryData(sentOptions.queryKey, (current: ReadonlySet<string> | undefined) =>
      new Set(current).add(localKey),
    );
    setGrowingIds((current) => new Set(current).add(localKey));
    setDraft("");

    sendMutation.mutate(body, {
      onError: () => {
        queryClient.setQueryData(messageOptions.queryKey, (current) => removePageItem(current, localId));
        queryClient.setQueryData(sentOptions.queryKey, (current: ReadonlySet<string> | undefined) => {
          const next = new Set(current);
          next.delete(localKey);
          return next;
        });
        setGrowingIds((current) => {
          const next = new Set(current);
          next.delete(localKey);
          return next;
        });
        setDraft((current) => (current.length === 0 ? body : current));
      },
    });
  }

  return {
    messages,
    contact: contactQuery.data,
    draft,
    setDraft,
    send,
    canSend: !blocked && draft.trim().length > 0,
    blocked,
    unblock: () => {
      blockedUsersRepository.unblock(conversationId);
    },
    growingIds,
    isPending: messagesQuery.isPending,
    isContactPending: contactQuery.isPending,
    isError: messagesQuery.isError,
  };
}

function sentIdsQueryOptions(conversationId: string) {
  return queryOptions({
    queryKey: ["messages", conversationId, "sentIds"] as const,
    queryFn: () => new Set<string>(),
    initialData: () => new Set<string>(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
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

function mergeThreadMessages(posts: Post[], sentIds: ReadonlySet<string>): ChatThreadMessage[] {
  return posts
    .map((post) => {
      const id = String(post.id);
      return {
        id,
        body: post.body,
        from: sentIds.has(id) ? "user" : "other",
        createdAt: post.createdAt,
      };
    })
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
}

function createLocalPost(id: number, conversationId: string, body: string): Post {
  const title = body.trim().slice(0, 80);
  return {
    id,
    userId: Number(conversationId),
    title: title.length > 0 ? title : "Message",
    body,
    tags: [],
    category: "General",
    createdAt: new Date().toISOString(),
  };
}

function appendPageItem(
  data: InfiniteData<Page<Post>> | undefined,
  post: Post,
): InfiniteData<Page<Post>> {
  if (data == null || data.pages.length === 0) {
    return {
      pages: [{ items: [post], total: 1, limit: 20, offset: 0 }],
      pageParams: [{ limit: 20, offset: 0 }],
    };
  }

  const last = data.pages.length - 1;
  return {
    ...data,
    pages: data.pages.map((page, index) => {
      if (index !== last || page.items.some((item) => item.id === post.id)) {
        return page;
      }
      return { ...page, items: [...page.items, post], total: page.total + 1 };
    }),
  };
}

function removePageItem(
  data: InfiniteData<Page<Post>> | undefined,
  postId: number,
): InfiniteData<Page<Post>> | undefined {
  if (data == null) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      items: page.items.filter((item) => item.id !== postId),
    })),
  };
}

const EMPTY_SENT_IDS: ReadonlySet<string> = new Set();

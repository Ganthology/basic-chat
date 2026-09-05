import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export type ChatThreadMessage = {
  id: string;
  body: string;
  from: ChatMessageFrom;
  createdAt: string;
  optimistic?: boolean;
  confirmedId?: string;
};

export function useChatScreenVM(conversationId: string) {
  const queryClient = useQueryClient();
  const messagesQuery = useInfiniteQuery(messagesQueryOptions(conversationId));
  const contactQuery = useQuery(userQueryOptions(conversationId));
  // Repository port, not Zustand. RFC 0002 / ADR 0008.
  const isBlocked = useSyncExternalStore(
    (onStoreChange) => blockedUsersRepository.subscribe(onStoreChange),
    () => blockedUsersRepository.isBlocked(conversationId),
    () => blockedUsersRepository.isBlocked(conversationId),
  );

  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatThreadMessage[]>([]);
  const [sentIds, setSentIds] = useState<ReadonlySet<string>>(() => new Set());

  const messages = useMemo(
    () =>
      mergeThreadMessages(flattenMessagePages(messagesQuery.data?.pages), localMessages, sentIds),
    [localMessages, messagesQuery.data?.pages, sentIds],
  );

  const sendMutation = useMutation({
    mutationFn: (body: string) => chatRepository.sendMessage(conversationId, body),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  function enqueueOutgoing(body: string): string {
    const id = createLocalId();
    setLocalMessages((current) => [
      ...current,
      {
        id,
        body,
        from: "user",
        createdAt: new Date().toISOString(),
        optimistic: true,
      },
    ]);
    return id;
  }

  function confirmOutgoing(localId: string, post: Post): void {
    const confirmedId = String(post.id);
    setSentIds((current) => new Set(current).add(confirmedId));
    setLocalMessages((current) =>
      current.map((message) =>
        message.id === localId
          ? {
              ...message,
              body: post.body,
              createdAt: post.createdAt,
              confirmedId,
              optimistic: false,
            }
          : message,
      ),
    );
  }

  function dropOutgoing(localId: string): void {
    setLocalMessages((current) => current.filter((message) => message.id !== localId));
  }

  function sendMessage(body: string): Promise<Post> {
    return sendMutation.mutateAsync(body);
  }

  function unblock(): void {
    blockedUsersRepository.unblock(conversationId);
  }

  return {
    messages,
    contact: contactQuery.data,
    draft,
    setDraft,
    enqueueOutgoing,
    confirmOutgoing,
    dropOutgoing,
    sendMessage,
    canSend: draft.trim().length > 0 && !isBlocked,
    isBlocked,
    unblock,
    isPending: messagesQuery.isPending,
    isError: messagesQuery.isError,
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

function mergeThreadMessages(
  posts: Post[],
  localMessages: ChatThreadMessage[],
  sentIds: ReadonlySet<string>,
): ChatThreadMessage[] {
  const fetched = posts.map((post) => {
    const id = String(post.id);
    return {
      id,
      body: post.body,
      from: senderFromSentIds(id, sentIds),
      createdAt: post.createdAt,
    };
  });
  const fetchedIds = new Set(fetched.map((message) => message.id));
  const pendingLocal = localMessages.filter((message) => !isLocalInFetched(message, fetchedIds));

  return [...fetched, ...pendingLocal].sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );
}

function isLocalInFetched(message: ChatThreadMessage, fetchedIds: ReadonlySet<string>): boolean {
  if (fetchedIds.has(message.id)) {
    return true;
  }
  return message.confirmedId != null && fetchedIds.has(message.confirmedId);
}

function senderFromSentIds(id: string, sentIds: ReadonlySet<string>): ChatMessageFrom {
  return sentIds.has(id) ? "user" : "other";
}

function createLocalId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

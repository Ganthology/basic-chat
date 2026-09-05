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

  function send() {
    const body = draft.trim();
    if (body.length === 0) {
      return;
    }

    const optimisticId = createLocalId();
    const optimistic: ChatThreadMessage = {
      id: optimisticId,
      body,
      from: "user",
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setLocalMessages((current) => [...current, optimistic]);
    setDraft("");

    sendMutation.mutate(body, {
      onSuccess: (post) => {
        const confirmedId = String(post.id);
        setSentIds((current) => new Set(current).add(confirmedId));
        setLocalMessages((current) =>
          current.map((message) =>
            message.id === optimisticId
              ? {
                  id: confirmedId,
                  body: post.body,
                  from: "user",
                  createdAt: post.createdAt,
                }
              : message,
          ),
        );
      },
      onError: () => {
        setLocalMessages((current) => current.filter((message) => message.id !== optimisticId));
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
    canSend: draft.trim().length > 0 && !isBlocked,
    isBlocked,
    unblock: () => {
      blockedUsersRepository.unblock(conversationId);
    },
    isPending: messagesQuery.isPending,
    isError: messagesQuery.isError,
  };
}

function flattenMessagePages(pages: Page<Post>[] | undefined): Post[] {
  if (pages == null) {
    return [];
  }

  return pages.flatMap((page) => page.items);
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
  const pendingLocal = localMessages.filter((message) => !fetchedIds.has(message.id));

  return [...fetched, ...pendingLocal].sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt),
  );
}

function senderFromSentIds(id: string, sentIds: ReadonlySet<string>): ChatMessageFrom {
  return sentIds.has(id) ? "user" : "other";
}

function createLocalId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

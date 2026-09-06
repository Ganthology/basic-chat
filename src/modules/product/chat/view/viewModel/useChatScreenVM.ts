import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

import type { Page } from "@/modules/platform/network/Page";
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
  confirmedId?: string;
};

export function useChatScreenVM(conversationId: string) {
  const queryClient = useQueryClient();
  const messagesQuery = useInfiniteQuery(messagesQueryOptions(conversationId));
  const contactQuery = useQuery(userQueryOptions(conversationId));

  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatThreadMessage[]>([]);
  const [sentIds, setSentIds] = useState<ReadonlySet<string>>(() => new Set());
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
    const merged = mergeThreadMessages(
      flattenMessagePages(messagesQuery.data?.pages),
      localMessages,
      sentIds,
    );
    if (!messagesQuery.isPending && !messagesQuery.isError && showEmptyChat) {
      return [];
    }
    return merged;
  }, [
    localMessages,
    messagesQuery.data?.pages,
    messagesQuery.isError,
    messagesQuery.isPending,
    sentIds,
    showEmptyChat,
  ]);

  const sendMutation = useMutation({
    mutationFn: (body: string) => chatRepository.sendMessage(conversationId, body),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });

  function send() {
    const body = draft.trim();
    if (blocked || body.length === 0) {
      return;
    }

    const localId = createLocalId();
    const local: ChatThreadMessage = {
      id: localId,
      body,
      from: "user",
      createdAt: new Date().toISOString(),
    };

    setLocalMessages((current) => [...current, local]);
    setDraft("");

    sendMutation.mutate(body, {
      onSuccess: (post) => {
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
                }
              : message,
          ),
        );
      },
      onError: () => {
        setLocalMessages((current) => current.filter((message) => message.id !== localId));
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
    isPending: messagesQuery.isPending,
    isContactPending: contactQuery.isPending,
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

const LOCAL_ID_PREFIX = "local-";

export function isLocalMessageId(id: string): boolean {
  return id.startsWith(LOCAL_ID_PREFIX);
}

function createLocalId(): string {
  return `${LOCAL_ID_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

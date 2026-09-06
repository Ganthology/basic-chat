import { useCallback, useSyncExternalStore } from "react";

import { useQuery } from "@/modules/platform/query/useQuery";
import { BlockedUsersRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/BlockedUsersRepositoryImpl";
import { UserFeatureFlagRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/UserFeatureFlagRepositoryImpl";

import { userQueryOptions } from "../query/userQueryOptions";

const blockedUsersRepository = new BlockedUsersRepositoryImpl();
const userFeatureFlagRepository = new UserFeatureFlagRepositoryImpl();

export function useProfileScreenVM(userId: string) {
  const userQuery = useQuery(userQueryOptions(userId));
  const subscribeBlocked = useCallback(
    (onStoreChange: () => void) => blockedUsersRepository.subscribe(onStoreChange),
    [],
  );
  const blocked = useSyncExternalStore(
    subscribeBlocked,
    () => blockedUsersRepository.isBlocked(userId),
    () => blockedUsersRepository.isBlocked(userId),
  );
  const subscribeFlags = useCallback(
    (onStoreChange: () => void) => userFeatureFlagRepository.subscribe(onStoreChange),
    [],
  );
  const showEmptyChat = useSyncExternalStore(
    subscribeFlags,
    () => userFeatureFlagRepository.getShowEmptyChat(userId),
    () => userFeatureFlagRepository.getShowEmptyChat(userId),
  );

  return {
    user: userQuery.data,
    isPending: userQuery.isPending,
    isError: userQuery.isError,
    blocked,
    setBlocked: (value: boolean) => {
      if (value) {
        blockedUsersRepository.block(userId);
        return;
      }

      blockedUsersRepository.unblock(userId);
    },
    showEmptyChat,
    setShowEmptyChat: (value: boolean) => {
      userFeatureFlagRepository.setShowEmptyChat(userId, value);
    },
  };
}

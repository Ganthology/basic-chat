import { useCallback, useState, useSyncExternalStore } from "react";

import { useQuery } from "@/modules/platform/query/useQuery";
import { UserFeatureFlagRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/UserFeatureFlagRepositoryImpl";

import { userQueryOptions } from "../query/userQueryOptions";

const userFeatureFlagRepository = new UserFeatureFlagRepositoryImpl();

export function useProfileScreenVM(userId: string) {
  const userQuery = useQuery(userQueryOptions(userId));
  const [blocked, setBlocked] = useState(false);
  const subscribe = useCallback(
    (onStoreChange: () => void) => userFeatureFlagRepository.subscribe(onStoreChange),
    [],
  );
  const showEmptyChat = useSyncExternalStore(
    subscribe,
    () => userFeatureFlagRepository.getShowEmptyChat(userId),
    () => userFeatureFlagRepository.getShowEmptyChat(userId),
  );

  return {
    user: userQuery.data,
    isPending: userQuery.isPending,
    isError: userQuery.isError,
    blocked,
    setBlocked,
    showEmptyChat,
    setShowEmptyChat: (value: boolean) => {
      userFeatureFlagRepository.setShowEmptyChat(userId, value);
    },
  };
}

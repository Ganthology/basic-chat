import { useSyncExternalStore } from "react";

import { useQuery } from "@/modules/platform/query/useQuery";

import { BlockedUsersRepositoryImpl } from "../../data/repositoryImpl/BlockedUsersRepositoryImpl";
import { userQueryOptions } from "../query/userQueryOptions";

const blockedUsersRepository = new BlockedUsersRepositoryImpl();

export function useProfileScreenVM(userId: string) {
  const userQuery = useQuery(userQueryOptions(userId));
  // Repository port, not Zustand. RFC 0002 / ADR 0008.
  const blocked = useSyncExternalStore(
    (onStoreChange) => blockedUsersRepository.subscribe(onStoreChange),
    () => blockedUsersRepository.isBlocked(userId),
    () => blockedUsersRepository.isBlocked(userId),
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
  };
}

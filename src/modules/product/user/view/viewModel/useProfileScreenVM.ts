import { useStore } from "zustand";

import { useQuery } from "@/modules/platform/query/useQuery";

import { BlockedUsersRepositoryImpl } from "../../data/repositoryImpl/BlockedUsersRepositoryImpl";
import { blockedUsersStore } from "../../data/stores/blockedUsersStore";
import { userQueryOptions } from "../query/userQueryOptions";

const blockedUsersRepository = new BlockedUsersRepositoryImpl();

export function useProfileScreenVM(userId: string) {
  const userQuery = useQuery(userQueryOptions(userId));
  const blocked = useStore(blockedUsersStore, (state) => state.ids[userId] === true);

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

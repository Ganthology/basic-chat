import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type BlockedUsersState = {
  ids: Record<string, true>;
  block: (id: string) => void;
  unblock: (id: string) => void;
};

export const blockedUsersStore = createStore<BlockedUsersState>()(
  persist(
    (set) => ({
      ids: {},
      block: (id) =>
        set((state) => ({
          ids: { ...state.ids, [id]: true },
        })),
      unblock: (id) =>
        set((state) => {
          const ids = { ...state.ids };
          delete ids[id];
          return { ids };
        }),
    }),
    {
      name: "blocked-users",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

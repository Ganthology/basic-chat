import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { zustandStorage } from "@/modules/platform/storage/zustandStorage";

type FeatureFlagState = {
  flags: Record<string, boolean>;
  setFlag: (key: string, value: boolean) => void;
};

export const featureFlagStore = createStore<FeatureFlagState>()(
  persist(
    (set) => ({
      flags: {},
      setFlag: (key, value) =>
        set((state) => ({
          flags: { ...state.flags, [key]: value },
        })),
    }),
    {
      name: "feature-flags",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

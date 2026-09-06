import { useCallback, useSyncExternalStore } from "react";

import type { FeatureFlagRepository } from "./FeatureFlagRepository";

export function useFeatureFlag<TFlags extends Record<string, boolean>>(
  repo: FeatureFlagRepository<TFlags>,
  key: keyof TFlags & string,
): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => repo.subscribe(onStoreChange),
    [repo],
  );

  return useSyncExternalStore(
    subscribe,
    () => repo.get(key),
    () => repo.get(key),
  );
}

import { featureFlagStore } from "@/modules/platform/featureFlag/featureFlagStore";

import type { UserFeatureFlagRepository } from "../repository/UserFeatureFlagRepository";

const NAMESPACE = "user";

export class UserFeatureFlagRepositoryImpl implements UserFeatureFlagRepository {
  constructor(private readonly store = featureFlagStore) {}

  getShowEmptyChat(userId: string): boolean {
    return this.store.getState().flags[emptyChatKey(userId)] ?? false;
  }

  setShowEmptyChat(userId: string, value: boolean): void {
    this.store.getState().setFlag(emptyChatKey(userId), value);
  }

  subscribe(onStoreChange: () => void): () => void {
    return this.store.subscribe(onStoreChange);
  }
}

function emptyChatKey(userId: string): string {
  return `${NAMESPACE}.showEmptyChat.${userId}`;
}

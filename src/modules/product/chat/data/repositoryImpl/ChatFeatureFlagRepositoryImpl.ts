import { createFeatureFlagRepository } from "@/modules/platform/featureFlag/createFeatureFlagRepository";

import type { ChatFeatureFlags } from "../entities/ChatFeatureFlags";
import type { ChatFeatureFlagRepository } from "../repository/ChatFeatureFlagRepository";

const DEFAULTS: ChatFeatureFlags = {
  showEmptyConversationList: false,
};

export class ChatFeatureFlagRepositoryImpl implements ChatFeatureFlagRepository {
  constructor(
    private readonly repo = createFeatureFlagRepository<ChatFeatureFlags>({
      namespace: "chat",
      defaults: DEFAULTS,
    }),
  ) {}

  get<K extends keyof ChatFeatureFlags & string>(key: K): boolean {
    return this.repo.get(key);
  }

  set<K extends keyof ChatFeatureFlags & string>(key: K, value: boolean): void {
    this.repo.set(key, value);
  }

  subscribe(onStoreChange: () => void): () => void {
    return this.repo.subscribe(onStoreChange);
  }
}

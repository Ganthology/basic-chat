import type { CreateFeatureFlagRepositoryOptions } from "./CreateFeatureFlagRepositoryOptions";
import type { FeatureFlagRepository } from "./FeatureFlagRepository";
import { featureFlagStore } from "./featureFlagStore";

export class FeatureFlagRepositoryImpl<
  TFlags extends Record<string, boolean>,
> implements FeatureFlagRepository<TFlags> {
  constructor(
    private readonly options: CreateFeatureFlagRepositoryOptions<TFlags>,
    private readonly store = featureFlagStore,
  ) {}

  get<K extends keyof TFlags & string>(key: K): boolean {
    const stored = this.store.getState().flags[this.storageKey(key)];
    return stored ?? this.options.defaults[key];
  }

  set<K extends keyof TFlags & string>(key: K, value: boolean): void {
    this.store.getState().setFlag(this.storageKey(key), value);
  }

  subscribe(onStoreChange: () => void): () => void {
    return this.store.subscribe(onStoreChange);
  }

  private storageKey(key: string): string {
    return `${this.options.namespace}.${key}`;
  }
}

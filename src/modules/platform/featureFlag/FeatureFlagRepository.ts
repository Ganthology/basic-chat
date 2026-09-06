export type FeatureFlagRepository<TFlags extends Record<string, boolean>> = {
  get<K extends keyof TFlags & string>(key: K): boolean;
  set<K extends keyof TFlags & string>(key: K, value: boolean): void;
  subscribe(onStoreChange: () => void): () => void;
};

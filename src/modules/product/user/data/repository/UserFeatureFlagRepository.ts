export type UserFeatureFlagRepository = {
  getShowEmptyChat(userId: string): boolean;
  setShowEmptyChat(userId: string, value: boolean): void;
  subscribe(onStoreChange: () => void): () => void;
};

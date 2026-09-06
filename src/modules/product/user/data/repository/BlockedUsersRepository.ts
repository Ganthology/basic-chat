export type BlockedUsersRepository = {
  isBlocked(id: string): boolean;
  block(id: string): void;
  unblock(id: string): void;
  listIds(): string[];
  /** View observes through this port. Store/Zustand stay in the impl. RFC 0002. */
  subscribe(onStoreChange: () => void): () => void;
};

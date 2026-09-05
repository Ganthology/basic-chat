export type BlockedUsersRepository = {
  isBlocked(id: string): boolean;
  block(id: string): void;
  unblock(id: string): void;
  listIds(): string[];
};

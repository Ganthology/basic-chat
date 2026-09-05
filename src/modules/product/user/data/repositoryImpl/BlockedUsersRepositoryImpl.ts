import type { BlockedUsersRepository } from "../repository/BlockedUsersRepository";
import { blockedUsersStore } from "../stores/blockedUsersStore";

export class BlockedUsersRepositoryImpl implements BlockedUsersRepository {
  constructor(private readonly store = blockedUsersStore) {}

  isBlocked(id: string): boolean {
    return this.store.getState().ids[id] === true;
  }

  block(id: string): void {
    this.store.getState().block(id);
  }

  unblock(id: string): void {
    this.store.getState().unblock(id);
  }

  listIds(): string[] {
    return Object.keys(this.store.getState().ids);
  }
}

import type { ListParams } from "@/modules/platform/network/ListParams";
import type { Page } from "@/modules/platform/network/Page";

import type { User } from "../entities/User";

export type UserRepository = {
  listUsers(page: ListParams): Promise<Page<User>>;
  getUser(id: string): Promise<User>;
};

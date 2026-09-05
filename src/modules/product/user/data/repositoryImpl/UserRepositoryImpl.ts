import type { ListParams } from "@/modules/platform/network/ListParams";
import type { Page } from "@/modules/platform/network/Page";
import { toPage } from "@/modules/platform/network/toPage";

import type { User } from "../entities/User";
import type { UserRepository } from "../repository/UserRepository";
import { userApi } from "../services/userApi";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly api = userApi) {}

  async listUsers(page: ListParams): Promise<Page<User>> {
    const response = await this.api.listUsers(page);
    return toPage(response);
  }

  async getUser(id: string): Promise<User> {
    return this.api.getUser(id);
  }
}

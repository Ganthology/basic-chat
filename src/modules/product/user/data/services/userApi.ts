import type { ListParams } from "@/modules/platform/network/ListParams";
import type { ListResponse } from "@/modules/platform/network/ListResponse";
import { network } from "@/modules/platform/network/network";

import type { User } from "../entities/User";

export const userApi = {
  /**
   * GET /api/users
   *
   * @example
   * {
   *   total: 60,
   *   limit: 1,
   *   offset: 0,
   *   results: [
   *     {
   *       id: 1,
   *       name: "Alice Johnson",
   *       username: "alicej",
   *       email: "alice.johnson@example.com",
   *       avatar: "https://i.pravatar.cc/150?img=1",
   *       phone: "+1-202-555-0101",
   *       website: "https://alicejohnson.dev",
   *       address: { street: "123 Maple St", city: "Springfield", zipcode: "62704" }
   *     }
   *   ]
   * }
   */
  async listUsers({ limit, offset }: ListParams) {
    const response = await network.get<ListResponse<User>>("/api/users", {
      query: { limit, offset },
    });
    return response.data;
  },

  /**
   * GET /api/users/:id
   *
   * @example
   * {
   *   id: 1,
   *   name: "Alice Johnson",
   *   username: "alicej",
   *   email: "alice.johnson@example.com",
   *   avatar: "https://i.pravatar.cc/150?img=1",
   *   phone: "+1-202-555-0101",
   *   website: "https://alicejohnson.dev",
   *   address: { street: "123 Maple St", city: "Springfield", zipcode: "62704" }
   * }
   */
  async getUser(id: string) {
    const response = await network.get<User>(`/api/users/${id}`);
    return response.data;
  },
};

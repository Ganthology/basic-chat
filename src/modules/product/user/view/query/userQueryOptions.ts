import { queryOptions } from "@/modules/platform/query/queryOptions";

import { UserRepositoryImpl } from "../../data/repositoryImpl/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();

export function userQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["user", id],
    queryFn: () => userRepository.getUser(id),
  });
}

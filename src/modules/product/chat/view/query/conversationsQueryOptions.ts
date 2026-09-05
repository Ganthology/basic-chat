import { getNextPageParam } from "@/modules/platform/network/getNextPageParam";
import { infiniteQueryOptions } from "@/modules/platform/query/infiniteQueryOptions";
import { UserRepositoryImpl } from "@/modules/product/user/data/repositoryImpl/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const PAGE_SIZE = 20;

export function conversationsQueryOptions(pageSize = PAGE_SIZE) {
  return infiniteQueryOptions({
    queryKey: ["conversations", pageSize],
    queryFn: ({ pageParam }) => userRepository.listUsers(pageParam),
    initialPageParam: { limit: pageSize, offset: 0 },
    getNextPageParam,
  });
}

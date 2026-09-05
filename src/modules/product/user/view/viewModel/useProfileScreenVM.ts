import { useState } from "react";

import { useQuery } from "@/modules/platform/query/useQuery";

import { userQueryOptions } from "../query/userQueryOptions";

export function useProfileScreenVM(userId: string) {
  const userQuery = useQuery(userQueryOptions(userId));
  const [blocked, setBlocked] = useState(false);

  return {
    user: userQuery.data,
    isPending: userQuery.isPending,
    isError: userQuery.isError,
    blocked,
    setBlocked,
  };
}

import type { DefaultOptions } from "@tanstack/react-query";

export const QUERY_DEFAULTS = Object.freeze({
  queries: Object.freeze({
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  }),
  mutations: Object.freeze({
    retry: 0,
  }),
}) satisfies DefaultOptions;

import { QueryClient, type DefaultOptions, type QueryClientConfig } from "@tanstack/react-query";

import { QUERY_DEFAULTS } from "./QUERY_DEFAULTS";

export function createQueryClient(config?: QueryClientConfig): QueryClient {
  return new QueryClient({
    ...config,
    defaultOptions: mergeQueryDefaults(QUERY_DEFAULTS, config?.defaultOptions),
  });
}

function mergeQueryDefaults(base: DefaultOptions, override?: DefaultOptions): DefaultOptions {
  if (!override) {
    return base;
  }

  return {
    ...base,
    ...override,
    queries: {
      ...base.queries,
      ...override.queries,
    },
    mutations: {
      ...base.mutations,
      ...override.mutations,
    },
    hydrate: {
      ...base.hydrate,
      ...override.hydrate,
    },
    dehydrate: {
      ...base.dehydrate,
      ...override.dehydrate,
    },
  };
}

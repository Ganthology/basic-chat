import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

import { QUERY_DEFAULTS } from "./QUERY_DEFAULTS";

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: QUERY_DEFAULTS,
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

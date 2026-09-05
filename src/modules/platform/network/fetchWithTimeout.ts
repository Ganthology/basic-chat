import { NETWORK_DEFAULTS } from "./NETWORK_DEFAULTS";
import { runWithTimeout } from "./runWithTimeout";

export type FetchWithTimeoutInit = RequestInit & {
  timeoutMs?: number;
};

export async function fetchWithTimeout(
  input: string,
  init: FetchWithTimeoutInit = {},
): Promise<Response> {
  const { timeoutMs, signal, ...fetchInit } = init;

  return runWithTimeout(timeoutMs ?? NETWORK_DEFAULTS.timeoutMs, signal ?? undefined, (nextSignal) =>
    fetch(input, {
      ...fetchInit,
      signal: nextSignal,
    }),
  );
}

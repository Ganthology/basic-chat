import { createRequestSignal } from "./createRequestSignal";
import { toHttpError } from "./toHttpError";

export async function runWithTimeout<T>(
  timeoutMs: number,
  external: AbortSignal | undefined,
  run: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
  const requestSignal = createRequestSignal(timeoutMs, external);

  try {
    return await run(requestSignal.signal);
  } catch (error) {
    throw toHttpError(error, requestSignal.didTimeout());
  } finally {
    requestSignal.cleanup();
  }
}

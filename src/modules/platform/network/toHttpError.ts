import { HttpError } from "./HttpError";

export function toHttpError(error: unknown, timedOut: boolean): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  if (isAbortError(error)) {
    return new HttpError({
      kind: timedOut ? "timeout" : "abort",
      message: timedOut ? "Request timed out" : "Request aborted",
      cause: error,
    });
  }

  return new HttpError({
    kind: "network",
    message: error instanceof Error ? error.message : "Network request failed",
    cause: error,
  });
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

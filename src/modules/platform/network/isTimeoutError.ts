import { HttpError } from "./HttpError";

export function isTimeoutError(error: unknown): error is HttpError {
  return error instanceof HttpError && error.kind === "timeout";
}

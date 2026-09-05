import { HttpError } from "./HttpError";

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

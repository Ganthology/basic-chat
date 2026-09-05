export type HttpErrorKind = "http" | "timeout" | "abort" | "network";

type HttpErrorInit = {
  kind: HttpErrorKind;
  message: string;
  status?: number | null;
  data?: unknown;
  cause?: unknown;
};

export class HttpError extends Error {
  readonly name = "HttpError";
  readonly kind: HttpErrorKind;
  readonly status: number | null;
  readonly data: unknown;

  constructor(init: HttpErrorInit) {
    super(init.message, init.cause === undefined ? undefined : { cause: init.cause });
    this.kind = init.kind;
    this.status = init.status ?? null;
    this.data = init.data;
  }
}

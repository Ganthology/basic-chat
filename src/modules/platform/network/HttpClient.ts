import type { HttpError } from "./HttpError";
import type { HttpMethod } from "./HttpMethod";

export type HttpQuery = Readonly<Record<string, string | number | boolean | null | undefined>>;

export type HttpRequest<TBody = unknown> = {
  path: string;
  method?: HttpMethod;
  query?: HttpQuery;
  headers?: Readonly<Record<string, string>>;
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export type HttpRequestInit = Omit<HttpRequest, "path" | "method" | "body">;

export type HttpResponse<TData> = {
  data: TData;
  status: number;
  headers: Headers;
};

export type HttpClientConfig = {
  baseUrl?: string;
  headers?: Readonly<Record<string, string>>;
  timeoutMs?: number;
  interceptRequest?: (request: HttpRequest) => HttpRequest | Promise<HttpRequest>;
  interceptResponse?: <TData>(
    response: HttpResponse<TData>,
  ) => HttpResponse<TData> | Promise<HttpResponse<TData>>;
  interceptError?: (error: HttpError) => HttpError | Promise<HttpError>;
};

export type HttpClient = {
  request<TData, TBody = unknown>(request: HttpRequest<TBody>): Promise<HttpResponse<TData>>;
  get<TData>(path: string, init?: HttpRequestInit): Promise<HttpResponse<TData>>;
  post<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    init?: HttpRequestInit,
  ): Promise<HttpResponse<TData>>;
  put<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    init?: HttpRequestInit,
  ): Promise<HttpResponse<TData>>;
  patch<TData, TBody = unknown>(
    path: string,
    body?: TBody,
    init?: HttpRequestInit,
  ): Promise<HttpResponse<TData>>;
  delete<TData>(path: string, init?: HttpRequestInit): Promise<HttpResponse<TData>>;
  head(path: string, init?: HttpRequestInit): Promise<HttpResponse<undefined>>;
};

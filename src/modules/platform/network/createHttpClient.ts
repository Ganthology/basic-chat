import { buildRequestUrl } from "./buildRequestUrl";
import type { HttpClient, HttpClientConfig, HttpRequest, HttpResponse } from "./HttpClient";
import { HttpError } from "./HttpError";
import { NETWORK_DEFAULTS } from "./NETWORK_DEFAULTS";
import { runWithTimeout } from "./runWithTimeout";
import { toHttpError } from "./toHttpError";

export function createHttpClient(config: HttpClientConfig = {}): HttpClient {
  const baseUrl = config.baseUrl ?? NETWORK_DEFAULTS.baseUrl;
  const defaultTimeoutMs = config.timeoutMs ?? NETWORK_DEFAULTS.timeoutMs;

  async function request<TData, TBody = unknown>(
    requestInit: HttpRequest<TBody>,
  ): Promise<HttpResponse<TData>> {
    const prepared = config.interceptRequest
      ? await config.interceptRequest(requestInit)
      : requestInit;
    const timeoutMs = prepared.timeoutMs ?? defaultTimeoutMs;

    try {
      return await runWithTimeout(timeoutMs, prepared.signal, async (signal) => {
        const response = await fetch(buildRequestUrl(baseUrl, prepared.path, prepared.query), {
          method: prepared.method ?? "GET",
          headers: buildHeaders(config.headers, prepared.headers, prepared.body),
          body: serializeRequestBody(prepared.body),
          signal,
        });
        const data = await readJson<TData>(response);
        const result: HttpResponse<TData> = {
          data,
          status: response.status,
          headers: response.headers,
        };

        if (!response.ok) {
          throw new HttpError({
            kind: "http",
            status: response.status,
            data,
            message: `Request failed with status ${response.status}`,
          });
        }

        return config.interceptResponse ? await config.interceptResponse(result) : result;
      });
    } catch (error) {
      const httpError = toHttpError(error, false);

      if (config.interceptError) {
        throw await config.interceptError(httpError);
      }

      throw httpError;
    }
  }

  return {
    request,
    get: (path, init) => request({ ...init, path, method: "GET" }),
    post: (path, body, init) => request({ ...init, path, method: "POST", body }),
    put: (path, body, init) => request({ ...init, path, method: "PUT", body }),
    patch: (path, body, init) => request({ ...init, path, method: "PATCH", body }),
    delete: (path, init) => request({ ...init, path, method: "DELETE" }),
    head: (path, init) => request({ ...init, path, method: "HEAD" }),
  };
}

function buildHeaders(
  configHeaders: HttpClientConfig["headers"],
  requestHeaders: HttpRequest["headers"],
  body: unknown,
): Record<string, string> {
  const headers: Record<string, string> = {
    ...NETWORK_DEFAULTS.headers,
    ...configHeaders,
    ...requestHeaders,
  };

  if (shouldSetJsonContentType(body, headers)) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

function shouldSetJsonContentType(body: unknown, headers: Record<string, string>): boolean {
  return isJsonBody(body) && !Object.keys(headers).some((key) => key.toLowerCase() === "content-type");
}

function isJsonBody(body: unknown): boolean {
  if (body === undefined || typeof body === "string") {
    return false;
  }

  if (typeof FormData !== "undefined" && body instanceof FormData) {
    return false;
  }

  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) {
    return false;
  }

  if (typeof Blob !== "undefined" && body instanceof Blob) {
    return false;
  }

  if (body instanceof ArrayBuffer) {
    return false;
  }

  return true;
}

function serializeRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (typeof body === "string") {
    return body;
  }

  if (typeof FormData !== "undefined" && body instanceof FormData) {
    return body;
  }

  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) {
    return body;
  }

  if (typeof Blob !== "undefined" && body instanceof Blob) {
    return body;
  }

  if (body instanceof ArrayBuffer) {
    return body;
  }

  return JSON.stringify(body);
}

async function readJson<TData>(response: Response): Promise<TData> {
  const text = await response.text();

  if (text.length === 0) {
    return undefined as TData;
  }

  try {
    return JSON.parse(text) as TData;
  } catch (error) {
    throw new HttpError({
      kind: response.ok ? "network" : "http",
      status: response.status,
      data: text,
      message: response.ok
        ? "Response is not valid JSON"
        : `Request failed with status ${response.status}`,
      cause: error,
    });
  }
}

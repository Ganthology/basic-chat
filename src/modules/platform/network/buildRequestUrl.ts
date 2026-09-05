import type { HttpQuery } from "./HttpClient";

export function buildRequestUrl(baseUrl: string, path: string, query?: HttpQuery): string {
  const origin = isAbsoluteUrl(path) ? path : joinUrl(baseUrl, path);
  const search = toSearchParams(query);

  if (!search) {
    return origin;
  }

  return origin.includes("?") ? `${origin}&${search}` : `${origin}?${search}`;
}

function isAbsoluteUrl(path: string): boolean {
  return /^https?:\/\//i.test(path);
}

function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, "");
  const suffix = path.replace(/^\/+/, "");

  if (!base) {
    return suffix;
  }

  if (!suffix) {
    return base;
  }

  return `${base}/${suffix}`;
}

function toSearchParams(query?: HttpQuery): string {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) {
      continue;
    }

    params.append(key, String(value));
  }

  return params.toString();
}

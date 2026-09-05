# 0001. Platform network client

- Status: Accepted
- Date: 2026-09-05
- Author:

## Summary

Product talks to HTTP through platform `network`. The client is a small `fetch` wrapper we own. Axios, ky, and ofetch stay out of the dependency tree.

## Motivation

Chat will call `https://responserift.dev/` (`api/users`, `api/posts`). Product `data/services` need one way to send any HTTP request. Architecture already lists `platform/network`. TanStack Query owns cache and retry. The HTTP layer should not duplicate that, and it should not import a library that fights React Native's `fetch` / `AbortSignal` gaps.

## Proposal

First increment: native `fetch` + our timeout (`fetchWithTimeout`). `createHttpClient` sits on top for JSON REST.

`createHttpClient({ baseUrl, headers, timeoutMs, intercept* })` returns `{ request }`.

- JSON in / JSON out. `FormData` and other `BodyInit` values pass through.
- Timeout via `AbortController` + `setTimeout`. No `AbortSignal.timeout` / `AbortSignal.any` (missing or incomplete on RN).
- No stream API in this increment.
- Non-2xx, timeout, abort, and transport failures throw `HttpError`.
- Interceptors are optional hooks. Auth later wraps or intercepts; it does not live here.
- Absolute `path` values skip `baseUrl`. Query params drop `null` / `undefined`.
- Product never imports `fetch` or a third-party HTTP client.

Usage:

```ts
import { createHttpClient } from "@/modules/platform/network";

const http = createHttpClient({ baseUrl: "https://responserift.dev/" });

const users = await http.request<User[]>({ path: "api/users" });
await http.request({ method: "POST", path: "api/posts", body: payload });
```

## Alternatives

### Axios

Mature interceptors, upload progress (XHR), huge ecosystem. ~13 KB gzip. Extra deps (`follow-redirects`, etc.). Query already retries. Progress is not in the spec. RN uses XHR, not `fetch`.

Use when: existing axios codebase, upload/download progress, cookie/XHR quirks you already know.

Skip when: greenfield Expo + Query, bundle and surface area matter.

### ky

Tiny `fetch` wrapper. Hooks, timeout, retry. ~3–7 KB gzip. RN has opened issues on `AbortSignal.throwIfAborted` / `AbortSignal.timeout`. Retry overlaps Query.

Use when: browser SPA, you want ky's API and can polyfill AbortSignal.

Skip when: Expo/Hermes AbortSignal is incomplete and you do not want a polyfill tax.

### ofetch

Unjs client. Auto parse, `onRequest` / `onResponse`. ~3–4 KB gzip. RN reports `undefined` bodies (whatwg-fetch vs streams). Same retry overlap.

Use when: Nuxt / Nitro / Node + browser with a complete `fetch`.

Skip when: RN body handling is still a known footgun.

### Bare `fetch` in product services

Zero wrapper. Every service reimplements timeout, JSON, errors, headers.

Use when: one or two calls, no shared policy.

Skip when: more than one product service will hit the API.

### Native transport later (`react-native-nitro-fetch`)

Faster native stack, prefetch. Needs native bits and measurement on this app. Can sit under the same `HttpClient` later.

Use when: startup / TTFB is a measured problem.

Skip now: no native module budget, no numbers from this codebase.

## Open questions

- Base URL source (`EXPO_PUBLIC_API_URL` vs product constant). Not a platform concern yet.
- Online manager for Query (`@react-native-community/netinfo`) waits for a later `network` increment.
- Upload progress would force an XHR/axios (or native) adapter behind the same `HttpClient`.

## Consequences

If accepted, platform ships `createHttpClient` + `HttpError`. Product services call `request` only. Adding axios/ky/ofetch later needs a new ADR, not a silent import in `data/services`.

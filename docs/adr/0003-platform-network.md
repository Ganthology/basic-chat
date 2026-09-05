# 0003. Platform network

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC: [0001](../rfc/0001-platform-network-client.md)

## Context

Product needs one HTTP entry for REST. Query already owns cache and retry. Axios, ky, and ofetch each add either bundle, XHR, or React Native `fetch` / `AbortSignal` bugs. Comparison lives in the RFC.

## Decision

Platform `network` is native `fetch` plus our timeout. Product uses `network.get` / `post` / `put` / `patch` / `delete` / `head` / `request`.

Timeout covers fetch + body parse + response intercept. Timeout throws `HttpError` with `kind: "timeout"`. Client checks `isTimeoutError`. Default 15s. `timeoutMs: 0` disables.

Base URL is `process.env.EXPO_PUBLIC_API_URL` from `.env` (sample: `.env.example`). No hardcoded host. Missing env throws.

No axios, ky, or ofetch. No stream API yet. Product does not call `fetch`. Auth and NetInfo are later.

## Consequences

- HTTP policy is one package. Transport can change behind `HttpClient`.
- Upload progress and native prefetch need an adapter, not a product import.
- Query online manager still waits on a later network increment.

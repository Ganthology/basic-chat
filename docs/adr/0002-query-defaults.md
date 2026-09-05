# 0002. Query defaults

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

Product screens will fetch with TanStack Query. Need one client, shared defaults, and a way to override without forking the platform package.

## Decision

Platform `query` owns the `QueryClient`. Root layout mounts `QueryProvider`. Defaults live in `QUERY_DEFAULTS`:

- queries: `staleTime` 30s, `gcTime` 5m, `retry` 2, `refetchOnWindowFocus` false, `refetchOnReconnect` true
- mutations: `retry` 0

`QueryProvider` always builds the client from `QUERY_DEFAULTS`. Not configurable.

Per-query options on `useQuery` / `queryOptions` override those defaults. Import `useQuery` from platform `query`.

Product `view/query` owns `queryOptions`.

## Consequences

- App-wide fetch policy is one file.
- Screens override on the query call, not on the provider.
- Focus/online managers wait for `network`. Persistence waits for `storage`.

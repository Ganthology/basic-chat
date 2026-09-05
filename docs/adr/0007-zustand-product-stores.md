# 0007. Zustand product stores

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

Blocked users is client-only state. Many screens may subscribe later. React Query already owns server cache. Need a persistable store that stays out of platform.

## Decision

Use Zustand persist in product `data/stores`. Vanilla `createStore` — no React in data.

- Product modules own their slices. Platform does not host product stores.
- Repository contract wraps the store for writes/reads. View may subscribe to the store directly.
- Persist with Async Storage. mmkv is a later storage package.

## Consequences

- Chat can depend on `BlockedUsersRepository` without importing Zustand.
- A second store may extract a platform persist helper. Do not invent that now.
- Adding a platform `blocked` store would contradict ADR 0001.

# 0002. Blocked users storage

- Status: Draft
- Date: 2026-09-05
- Author:

## Summary

Block is a server relationship. Client-only persist (Zustand today) is a stand-in because the mock API has no block resource. The consume path stays `BlockedUsersRepository`. If Zustand goes before an API exists, the impl sits on MMKV. View does not change.

## Motivation

ADR 0007 added Zustand so a set of IDs could persist and notify. That leaked into VMs via `useStore`. ADR 0008 closed the leak: view talks to the repository only.

Two things still do not fit:

- **Zustand is optional plumbing.** A string set does not need a store library if `platform/storage` (MMKV) can hold it and the impl can notify listeners.
- **Client-owned block is the wrong model.** Block should survive reinstall, sync across devices, and drive inbox/thread from one source. Local Async Storage / MMKV will diverge.

## Proposal

Keep the port. Swap the impl when the source of truth changes.

| Phase | Source of truth | Impl | View |
| --- | --- | --- | --- |
| Now | Device | Zustand persist → Async Storage | `useSyncExternalStore(repo.subscribe, repo.isBlocked)` |
| No Zustand, still local | Device | MMKV + a listener set in `repositoryImpl` | same |
| API exists | Server | Service + React Query (cache / invalidate) | same writes; reads can move to `queryOptions` |

MMKV is already listed under platform `storage`. That package does not exist yet. Do not invent Zustand in platform.

Server phase: `block` / `unblock` hit the API. The repository impl calls the service. Query keys own the list or a flag on `User`. Local `ids` store goes away.

## Alternatives

- **Keep Zustand persist.** Fine as an impl detail. Not a view import. Not a reason to keep client-only block.
- **React Query as a local store now.** RQ is the server cache. A local-only `queryKey` until there is an API is the same lie with more machinery.
- **Stay client-only.** Devices and inbox disagree. Rejected for anything past the mock.

## Open questions

- Block API: one-way hide, bidirectional, or both?
- Optimistic write when the API is down?
- Drop Zustand when MMKV lands, or wait for the API and delete the store in one step?

## Consequences

- ADR 0007 (stores live in product data) and ADR 0008 (view uses the repository) stay.
- Chat and profile keep calling `BlockedUsersRepository`. Inbox filter later uses the same port, then the query.
- Accepting the server phase is a later ADR. Point it at this RFC. Do not copy the tables.

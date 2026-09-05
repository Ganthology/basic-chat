# 0008. Client state through repository

- Status: Accepted
- Date: 2026-09-05
- Supersedes: [0007](0007-zustand-product-stores.md) (consume path only)
- RFC:

## Context

ADR 0007 put Zustand in product `data/stores` and allowed view to subscribe to the store. That leaks the store into VMs. View should not care whether the impl is Zustand, mmkv, or memory.

## Decision

View and domain consume client state through the repository contract only.

- Repository owns reads, writes, and `subscribe`.
- View uses `useSyncExternalStore` against that port.
- `data/stores` and Zustand stay inside `repositoryImpl`. View does not import them.

Zustand remains the persist/notify engine. It is not a view dependency.

## Consequences

- Swapping Zustand later does not touch screens or VMs.
- Chat imports `BlockedUsersRepository` / impl, not `blockedUsersStore`.
- ADR 0007 still stands for where stores live and that they stay out of platform.

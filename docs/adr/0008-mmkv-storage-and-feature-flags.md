# 0008. MMKV storage and feature flags

- Status: Accepted
- Date: 2026-09-05
- Supersedes: [0007](0007-zustand-product-stores.md)
- RFC:

## Context

[ADR 0007](0007-zustand-product-stores.md) put Zustand persist on Async Storage and deferred mmkv. Query persistence also waits on platform `storage` ([ADR 0002](0002-query-defaults.md)). Inbox and thread empty-state previews need local, namespaced flags. Product modules must own their keys. Platform must not name product flags.

0007’s store-ownership rules stay: vanilla `createStore` in product `data/stores`, repository wraps the store, platform does not host product slices. This ADR replaces only the persist backend.

## Decision

Platform `storage` owns one MMKV instance (`id: "app"`) and a Zustand `StateStorage` adapter. Product stores persist with `createJSONStorage(() => zustandStorage)`.

Platform `featureFlag` is a generic namespaced repository:

- Zustand persist store (`name: "feature-flags"`) on that adapter
- `createFeatureFlagRepository({ namespace, defaults })` returns `FeatureFlagRepository<TFlags>`
- Keys stored as `${namespace}.${key}`
- Product modules add their own typed maps and repository wrappers
- No platform registry and no remote flags

Per-contact overrides (empty chat on a profile) use the same store with a product-owned key, not a global boolean map.

## Consequences

- Persist is sync. No hydrate flash.
- MMKV needs a development build. Not Expo Go. Prebuild after this lands.
- A second product store no longer invents its own persist helper.
- Adding a product flag does not change platform.

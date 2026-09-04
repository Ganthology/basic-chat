# 0001. Modular clean architecture

- Status: Accepted
- Date: 2026-09-04
- Supersedes:
- RFC:

## Context

Greenfield Expo app. Need a default for where code lives before the first feature lands: platform vs product, and how product modules split.

## Decision

Use platform modules as imported packages and product modules with `data → domain → view`, colocated by feature.

The folder tree, import rules, and layer roles live in [docs/agent/architecture.md](../agent/architecture.md). File names live in [docs/agent/naming.md](../agent/naming.md).

Do not duplicate those docs here.

## Consequences

- New work lands under `src/modules/platform` or `src/modules/product/<name>`.
- `src/app` stays thin routes over product screens.
- Changing this boundary requires a new ADR. Do not silently contradict this one.

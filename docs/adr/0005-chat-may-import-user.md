# 0005. Chat may import user

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

The mock API is users + posts, not conversations. Inbox and profile both read `GET /api/users`. Chat threads read posts. Product modules cannot import each other (ADR 0001), so chat would have to duplicate the user resource or own it.

## Decision

`chat` may import `user` (entities, repository contract, repository impl). `user` must not import `chat`.

Users stay in `user`. Posts stay on the wire; chat adapts writes onto posts.

Import rules live in [docs/agent/architecture.md](../agent/architecture.md).

## Consequences

- Chat view/query can use `UserRepository` for the inbox and thread header.
- `ChatRepository` stays messages only. It does not call `UserRepository`.
- A later identity/auth split that must stay isolated from chat needs a new ADR.

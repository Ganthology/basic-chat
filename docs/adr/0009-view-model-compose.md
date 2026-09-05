# 0009. View model is state plus compose functions

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

`useChatScreenVM.send` owned the whole send path: trim, optimistic row, clear draft, mutate, remap ids, restore draft on error. View could not attach keyboard, toast, or error UI without opening the VM. DummyJSON reusing `id: 101` also showed why the VM should not silently rewrite list keys as part of that bundle.

## Decision

View models hold state and expose single-purpose functions. View composes those functions and all UI side effects.

The rule lives in [docs/agent/view-model.md](../agent/view-model.md). Layer map stays in [docs/agent/architecture.md](../agent/architecture.md).

## Consequences

- `useChatScreenVM` splits send into `enqueueOutgoing`, `sendMessage`, `confirmOutgoing`, `dropOutgoing`. `ChatScreen` composes them.
- `useChatInboxScreenVM` already matches: state + `fetchNextPage`.
- `useProfileScreenVM.setBlocked` still branches block/unblock. Split when that screen grows a side effect.

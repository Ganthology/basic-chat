# View model

VM holds screen state. It also exposes functions the view composes. Each function does one thing. View owns UI side effects: toast, keyboard, error copy, navigation.

## State

Derived lists, draft, query flags, `canSend`. No toast text. No “what to show if X” besides raw flags (`isError`, `isPending`).

## Functions

One job. Same inputs, one kind of result.

| Kind | Does | Does not |
| --- | --- | --- |
| State write | Append, confirm, drop, set draft | Call the network |
| Command | Talk to repo / mutation | Change unrelated UI |
| Read | Return current state | Trigger a fetch as a side quest |

Wrong: `send()` that trims draft, enqueues optimistic, clears input, mutates, remaps ids, restores draft, and would show a toast.

Right: view composes.

```ts
const body = draft.trim();
if (body.length === 0 || isBlocked) {
  return;
}

const localId = enqueueOutgoing(body);
setDraft("");
keepKeyboard();

try {
  const post = await sendMessage(body);
  confirmOutgoing(localId, post);
} catch {
  dropOutgoing(localId);
  setDraft((current) => (current.length === 0 ? body : current));
  // toast / error UI here when we have it
}
```

## View

Map flags to UI. Compose functions. Keep keyboard, show toast, swap empty/error copy.

Do not hide those side effects inside the VM so a later screen cannot reuse the same writes.

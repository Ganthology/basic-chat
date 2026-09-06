# View model

VM holds screen state. It also exposes functions the view composes. Each function does one thing. View owns UI side effects: toast, keyboard, error copy, navigation.

## State

Query data, derived lists, flags (`isError`, `isPending`). No toast text. Composer text stays on the screen.

## Functions

One job. Same inputs, one kind of result.

| Kind | Does | Does not |
| --- | --- | --- |
| Command | One repo / mutation call. Mutation may append to the query cache. | Toast, keyboard, navigation |
| Read | Return current state | Trigger a fetch as a side quest |

Wrong: `send()` that owns draft, pending rows, id remaps, and a toast.

Right: view composes UI around one command.

```ts
const body = draft.trim();
if (body.length === 0 || isBlocked) {
  return;
}

setDraft("");
keepKeyboard();
void sendMessage(body);
```

## View

Map flags to UI. Hold composer draft. Keep keyboard, show toast, swap empty/error copy.

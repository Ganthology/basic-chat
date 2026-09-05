# Naming

Filename matches the export, written the same way you import or use it. One primary export per file.

| Kind      | File                 | Export            | Example                                                                   |
| --------- | -------------------- | ----------------- | ------------------------------------------------------------------------- |
| Component | `ComponentName.tsx`  | `ComponentName`   | `MessageBubble.tsx` → `<MessageBubble />`                                 |
| Screen    | `ScreenName.tsx`     | `ScreenName`      | `ChatScreen.tsx` → `<ChatScreen />`                                       |
| ViewModel | `useScreenNameVM.ts` | `useScreenNameVM` | `useChatScreenVM.ts`                                                      |
| Use case  | `nameUseCase.ts`     | `nameUseCase`     | `sendMessageUseCase.ts` — 1 file = 1 pure function                        |
| Entity    | `Entity.ts`          | `Entity`          | `Message.ts` (type) / `MessageStatus.ts` (enum) — 1 file = 1 type or enum |

ViewModel: screen-scoped = `use<ScreenName>VM.ts`. Shared across screens = `use<Concept>VM.ts` (still `use*VM`).

Use case: camelCase function + `UseCase` suffix. Not `SendMessageUseCase.ts`. No second helper in the same file — extract another `*UseCase.ts`.

Entity: type or enum only. No functions.

## Other files

Same filename = export rule.

| Kind                | File                    | Export               |
| ------------------- | ----------------------- | -------------------- |
| Hook                | `useThing.ts`           | `useThing`           |
| queryOptions        | `thingQueryOptions.ts`  | `thingQueryOptions`  |
| Service             | `chatApi.ts`            | `chatApi`            |
| Repository contract | `ChatRepository.ts`     | `ChatRepository`     |
| Repository impl     | `ChatRepositoryImpl.ts` | `ChatRepositoryImpl` |

Translation maps (`en.ts` / `chat.en.ts`) wait for an i18n decision.

`src/app` route files stay Expo kebab-case (`chat/[id].tsx`). Those are routes, not components.

No barrel `index.ts` unless a platform package or `ui` component folder needs a public entry. Import the file you mean.

Compound UI: one folder per root (`ui/GroupedTable/`), one file per part, attach on the parent (`Object.assign`). Public API is `Parent.Part`. Folder `index.ts` re-exports the root. See [composable-ui](../../.cursor/skills/composable-ui/SKILL.md).

Do not use kebab-case for components or screens (`message-bubble.tsx`).

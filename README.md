# basic-chat

Expo chat app against `https://responserift.dev/`.

## Run

```bash
cp .env.example .env
npm install
npx expo start
```

`EXPO_PUBLIC_API_URL` is already set in [.env.example](.env.example). iOS Simulator or Expo Go. Not Expo web ([docs/agent/verify.md](docs/agent/verify.md)).

```bash
npm run storybook
```

On-device Storybook. Swaps the app entry.

Direct deps are exact versions. See [ADR 0003](docs/adr/0003-exact-dependency-versions.md).

## Project structure

```
src/app/                  # Expo Router only
  (tabs)/                 # Chats, Settings
  chat/[id].tsx
  profile/[id].tsx
src/modules/platform/
  style/                  # design tokens
  ui/                     # composable design components + React components
    Avatar/ GroupedTable/ Heading/ Icon/
    IconButton/ ListGroup/ Paragraph/ Toggle/
  logger/                 # sentry
  query/                  # tanstack query
  network/
src/modules/product/
  chat/
  user/
  settings/
```

## Architecture notes

- Thin `src/app` routes → product screens
- Product modules: `chat`, `user`, `settings`. Each is `data → view` (domain unused)
- Platform: composable design components and React components (`style` + `ui`), logger (sentry), query (tanstack query), network
- React Query for server cache. Zustand persist for blocked IDs
- `chat` may import `user` ([ADR 0005](docs/adr/0005-chat-may-import-user.md))

Import rules: [docs/agent/architecture.md](docs/agent/architecture.md).

## Screenshots

Inbox

![Inbox](docs/review/inbox.png)

Chat

![Chat](docs/review/chat.png)

Profile

![Profile](docs/review/profile.png)

Settings

![Settings](docs/review/settings.png)

## How AI was used

- Cursor agents wrote stacked PRs (tokens, network, query, screens, block store)
- SPEC and agent docs drafted in Cursor
- Human review / merge on GitHub

## Docs

- [AGENTS.md](AGENTS.md)
- [docs/agent/architecture.md](docs/agent/architecture.md)
- [docs/adr/README.md](docs/adr/README.md)

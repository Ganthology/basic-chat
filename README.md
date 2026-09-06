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

Clean architecture keeps layers independently testable and swappable, so the app stays scalable. AI works on one layer at a time instead of mashing everything into one file. Review stays focused and regressions stay smaller — separation of concerns.

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

I use Cursor agent and Cursor cloud agent to create PRs. I usually have 3–5 agents running in parallel on different tasks/features. I already know the end state I want. They create the PR, I review, then I let the agent merge it.

For the initial UI, I get an agent to prototype different variants and themes so I can decide which to go with, then tweak until I'm satisfied with the layout and look. That part uses the Anthropic frontend-design skill.

Verification is Storybook, Expo Go for quick UI and behaviour checks, and a dev build to test native-required features. I also get agents to run Evan Bacon's [`serve-sim`](https://github.com/evanbacon/serve-sim) so they verify their work before reporting back.

## Docs

- [AGENTS.md](AGENTS.md)
- [docs/agent/architecture.md](docs/agent/architecture.md)
- [docs/adr/README.md](docs/adr/README.md)

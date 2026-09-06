# Maestro

UI flows live in `.maestro/`. CLI only — not an npm dep.

```sh
# once
curl -Ls "https://get.maestro.mobile.dev" | bash

# app already running on a booted iOS sim
npx expo run:ios
npm run test:e2e
```

Never Expo web. Same sim rule as [verify.md](verify.md).

## Commands

```sh
npm run test:e2e
maestro test .maestro --include-tags smoke
maestro test .maestro/journeys/settings.yaml
maestro test -e APP_ID=com.you.basicchat .maestro
```

Local `APP_ID` defaults to Expo Go (`host.exp.Exponent`). After a native binary exists, pass that bundle id. `launchApp` uses `stopApp: false` so Metro stays up.

`openLink` uses `basicchat://` to reset to inbox. If that fails in Expo Go, open the project on the sim first, or pass `-e APP_LINK=exp://127.0.0.1:8081/--/`.

## Flows

| Journey | What |
| --- | --- |
| `inbox-load-more` | Scroll inbox until page 2 (`inbox-row-21`, Uma Patel). Page size is 20. |
| `chat-send-message` | Open first chat, type, send. |
| `chat-block` | Header → profile → block → back → composer gone. Unblocks at the end. |
| `chat-unblock` | Same block path, then unblock and send. |
| `settings` | Tab → Name `You`, Version from `package.json`. Bump `APP_VERSION` in `.maestro/config.yaml` when the app version changes. |

Shared steps are in `.maestro/shared/`. Journeys only are discovered (`flows: journeys/*`).

## Selectors

Product screens own `testID`. Do not put domain names on platform tokens.

| id | Where |
| --- | --- |
| `inbox-list` | Inbox `FlatList` |
| `inbox-row-<id>` | Inbox row |
| `chat-screen` / `chat-header` | Thread |
| `composer-input` / `composer-send` | Composer |
| `chat-blocked` / `chat-unblock` | Blocked bar |
| `profile-screen` / `profile-block` | Profile |
| `settings-screen` / `settings-name` / `settings-version` | Settings |

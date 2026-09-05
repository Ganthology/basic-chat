# 0006. React Native BootSplash

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

The launch screen used `expo-splash-screen`. We need a native splash that stays up until JS is ready (fonts, first tree), then hides on command. BootSplash is that API. Expo's plugin is not.

## Decision

Use `react-native-bootsplash` for the native splash.

- Config plugin in `app.json`. Logo is `assets/images/splash-icon.png`. Background stays `#208AEF`.
- Platform `splash` owns hide. App does not import the library.
- Root layout hides after `useLoadFonts` returns true.
- Drop `expo-splash-screen`.
- Assets generate at prebuild (`assets/bootsplash`). Do not commit them.

## Consequences

- Prebuild is required after splash config or logo changes.
- Fade hide is the default. Custom JS exit animation is later (`useHideAnimation`).
- Dark-mode / brand splash needs a BootSplash license key.

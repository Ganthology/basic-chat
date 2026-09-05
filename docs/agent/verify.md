# Verify

This app is native. Do not verify UI with Expo web.

Never:

- `npx expo start --web` / `npm run web`
- Cursor browser against Metro web (`localhost:8081`, `:8082`, `:8083`, …)
- `react-native-web` as a stand-in for layout, press, or scroll

Use [serve-sim](https://github.com/evanbacon/serve-sim) against a booted iOS Simulator.

```sh
xcrun simctl list devices booted
npx serve-sim --list -q
# preview not on :3200 — run in the foreground (keep it alive):
npx serve-sim --fit
```

Preview: `http://127.0.0.1:3200`. `--detach` is helper-only (no preview UI). Do not use it when the goal is to see the sim. Reuse a live preview. Do not start a second one.

If no simulator is booted, boot one (`xcrun simctl boot "iPhone 16e"` or tell the user). Do not fall back to Expo web.

Drive the sim, not a website:

```sh
npx serve-sim tap 0.5 0.5          # coords 0..1, not pixels
curl http://localhost:3100/ax      # accessibility tree
```

`tap` for taps. `gesture` only for drag / swipe. `-q` when parsing CLI output.

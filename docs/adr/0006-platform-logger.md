# 0006. Platform logger

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

Product modules need one way to emit structured logs. Sentry is the sink. Product must not import `@sentry/react-native`. Each call must name the product module so logs can be filtered by feature.

## Decision

Platform `logger` owns Sentry init and the `Logger` base class.

Product extends `Logger` and sets `module`. Levels: `info`, `breadcrumb`, `warning`, `error`.

Messages are prefixed `[module]`. `module` is also a Sentry attribute and the breadcrumb category.

DSN is `process.env.EXPO_PUBLIC_SENTRY_DSN` (sample: `.env.example`). Missing DSN still inits; the SDK stays disabled.

Root layout calls `initLogger()` and exports `wrapRoot(RootLayout)`. Product and `src/app` do not import Sentry.

No Expo config plugin in this increment. Native crashes, source maps, and replay wait on a Sentry project and prebuild.

## Consequences

- One logging API. A product module names itself by extending `Logger`.
- Breadcrumbs attach to later issues. `info` / `warning` / `error` go to Sentry Logs. Passing an `Error` to `error` also captures an exception.
- Native upload and a dedicated Sentry project are later.

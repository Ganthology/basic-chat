# Agents

Read only what the task needs.

- Expo SDK 57: https://docs.expo.dev/versions/v57.0.0/
- Commits: [docs/agent/commits.md](docs/agent/commits.md)
- Architecture: [docs/agent/architecture.md](docs/agent/architecture.md)
- Naming: [docs/agent/naming.md](docs/agent/naming.md)
- Deps: [docs/agent/deps.md](docs/agent/deps.md)
- Docs (ADR/RFC): [docs/agent/docs.md](docs/agent/docs.md)
- Storybook: `npm run storybook` (iOS sim, entry swap). Stories next to platform UI (`*.stories.tsx`).
- Verify UI: [docs/agent/verify.md](docs/agent/verify.md) — iOS sim + `npx serve-sim`. Never Expo web.
- Composable UI: [.cursor/skills/composable-ui/SKILL.md](.cursor/skills/composable-ui/SKILL.md)
- Platform tokens/UI are role-generic. No product or domain names in `COLOR`, `style`, or `platform/ui` (`incoming`, `outgoing`, unread, blocked). Map meaning in product compose onto existing roles (`container`, `accent`, …).

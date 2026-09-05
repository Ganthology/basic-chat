# 0003. Exact dependency versions

- Status: Accepted
- Date: 2026-09-05
- Supersedes:
- RFC:

## Context

Semver ranges in `package.json` let installs drift. The lockfile pins the tree today, but `^` / `~` invite silent upgrades on the next install and hide what we chose. Need one write rule for direct deps.

## Decision

Direct `dependencies` and `devDependencies` use exact versions. Bump by editing the number. No `^`, `~`, ranges, or dist-tags.

| Do | Do not |
| --- | --- |
| `"expo": "57.0.19"` | `"expo": "~57.0.19"` |
| `npm install --save-exact <pkg>` | Leave a range after install |
| Edit the version, then install | Rely on a range to pick a newer patch |

`.npmrc` has `save-exact=true`. `npx expo install` still writes `~`. Pin after it runs.

`npm run lint` fails if a direct dep is not exact.

## Consequences

- `package.json` is the version we run, not a range.
- `npx expo install` must be followed by a pin.
- Patch upgrades are a deliberate `chore(deps)` commit.

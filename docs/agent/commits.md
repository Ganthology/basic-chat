# Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <summary>
```

Read this file before committing. If the change set spans layers or modules, split. Same scope on two commits is fine.

## Types

| Type | Use |
| --- | --- |
| `feat` | New behavior |
| `fix` | Bug fix |
| `docs` | Docs only (AGENTS, ADR, RFC, doc comments) |
| `style` | Formatting / lint autofix. Not UI styling. |
| `refactor` | No behavior change |
| `perf` | Performance |
| `test` | Tests only |
| `build` | Tooling, native gen config, bundler |
| `ci` | CI workflows |
| `chore` | Deps, repo chores, leftover |
| `revert` | Revert a commit |

Breaking: `feat(chat)!: drop old message payload` or a `BREAKING CHANGE:` footer.

## Scope

One flat area name. Not a module/layer path.

- Product or platform module: `chat`, `user`, `auth`, `storage`, `network`, `query`, `design`, `splash`
- Cross-cutting: `app` (thin routes / root layout), `docs`, `deps`, `repo`

Omit scope only when the change is repo-wide and has no better label.

Do not write `chat/view`, `chat/data`, or `platform/auth`.

## Split

One concern per commit. Usually one module and one layer.

- Do not mix `view` with `data` / `domain`.
- Do not mix product modules.
- Do not mix platform and product. Platform commit first, then product.
- UI / layout / visual styling is not logic / data / hooks / query.
- A thin `src/app` route that only wires a screen is the same view concern as that screen. Use the product scope (`feat(chat): ...`), not `app`, unless the change is route-tree only.
- A cross-cutting rename or type change may be one commit if it is one concern. Do not sneak a feature in.

Layer is a content rule. Do not encode `view` / `data` / `domain` in the message.

## Examples

```
feat(chat): message list empty state
feat(chat): chat api client
feat(auth): session bootstrap
docs(repo): commit convention
chore(deps): add mmkv
```

Wrong: `feat(chat/view): ...` — scope is not a layer.

Wrong: one commit that adds the API client and the empty state.

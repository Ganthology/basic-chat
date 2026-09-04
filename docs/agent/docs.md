# Docs

Write an RFC before a cross-cutting change when more than one valid approach exists. Write an ADR when a decision has landed.

Do not ADR every commit. ADR for boundaries, dependencies, storage, navigation model, i18n, query defaults. RFC when you want debate first.

If a task changes an accepted boundary, open or update an RFC or ADR. Do not silently contradict an accepted ADR.

## RFC vs ADR

| | RFC | ADR |
| --- | --- | --- |
| When | Before deciding | After deciding |
| Purpose | Proposal, alternatives, open questions | Recorded decision and consequences |
| Outcome | Draft, accepted, rejected, or superseded | Accepted or superseded |
| Edit rule | Update while in Draft | Immutable. Supersede with a new ADR. |

An accepted RFC may become an ADR. Point the ADR at the RFC. Do not copy the full proposal.

## Numbering

Files: `docs/adr/NNNN-kebab-title.md` and `docs/rfc/NNNN-kebab-title.md`. Monotonic. Next number is last + 1.

Start from the [ADR template](../adr/template.md) or [RFC template](../rfc/template.md).

# 02 — Create Feature-Sliced Project Structure

## Goal

Create the approved Feature-Sliced Design (FSD) project structure for the frontend.

The purpose of this task is to establish clear architectural boundaries before implementing routing, state management, design system, authentication, layouts, and application screens.

This is an IMPLEMENTATION task.

Repository changes are allowed, but only changes required to establish the project structure.

Do not implement application features.

---

## Context

This task is executed after:

- `00-plan-project-structure.md`
- `01-audit-project-foundation.md`

Before making changes, read and respect:

- `.claude/docs/pattern.md`
- `.claude/docs/prompts/00-plan-project-structure.md`
- `.claude/docs/prompts/01-audit-project-foundation.md`
- `CLAUDE.md` if present
- repository-level instructions
- current source structure
- current aliases and TypeScript configuration
- existing application code

Use the approved architecture from step `00`.

Use the actual repository findings from step `01`.

Do not blindly recreate files or folders that already exist.

Preserve working code whenever possible.

---

# Target Architecture

Use Feature-Sliced Design as the primary frontend architecture.

The main source structure should follow this hierarchy where applicable:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```
## Existing Empty Placeholder Files

The repository already contains a partial FSD directory tree with several empty placeholder files.

Examples may exist under:

- `src/entities`
- `src/features`
- `src/pages`
- `src/shared`

Before making changes, inspect these files.

If a file is completely empty and exists only as a placeholder:

- do not treat it as existing implementation
- do not fill it with speculative code
- do not implement work belonging to later prompts
- remove it if it has no purpose in the current task
- keep it only if it is genuinely required for the structural result of this task

In particular, do NOT implement empty placeholder files related to:

- API requests
- query configuration
- Zustand stores
- authentication/session
- login
- dashboard

Those belong to later dedicated prompts.

Do not create fake implementation merely to keep a directory in Git.

Prefer meaningful files over placeholder files.
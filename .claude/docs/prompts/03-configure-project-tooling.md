# 03 — Configure Project Tooling

## Goal

Configure and normalize the project's technical foundation before feature implementation.

The purpose of this task is to make the repository predictable, type-safe, maintainable, and ready for the following architecture and feature tasks.

This is an IMPLEMENTATION task.

Repository changes are allowed, but only changes required for project tooling and foundational configuration.

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
- `package.json`
- lockfile
- TypeScript configuration
- build configuration
- lint/format configuration
- current source structure

Use the approved architecture from step `00`.

Use the real repository findings from step `01`.

Do not guess about missing requirements.

---

# Scope

Configure only project tooling and foundational technical configuration.

Focus on:

- package manager consistency
- package.json scripts
- TypeScript configuration
- path aliases
- build tooling
- ESLint
- Prettier
- formatting rules
- environment typing/configuration
- dependency cleanup confirmed by the audit
- validation commands

Do not implement routing, state management, design system, authentication, layouts, pages, or business features.

---

# 1. Package Manager

Identify the package manager already used by the repository.

Determine this from the lockfile and existing project setup.

Examples:

- `package-lock.json` → npm
- `pnpm-lock.yaml` → pnpm
- `yarn.lock` → yarn

Use the existing package manager.

Do not switch package managers unless the repository instructions explicitly require it.

Do not create multiple lockfiles.

---

# 2. package.json Scripts

Inspect existing scripts.

Normalize or add scripts only when appropriate.

The project should ideally support the equivalent of:

```text
dev
build
lint
typecheck
format
format:check
```

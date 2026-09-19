# 01 — Audit Project Foundation

## Goal

Audit the current repository before any implementation or structural changes are made.

The purpose of this task is to understand the real current state of the project, identify conflicts with the approved architecture and technology stack, and determine what must be preserved, removed, replaced, or added by later tasks.

This is a READ-ONLY audit.

Do not modify the repository.

---

## Context

This task is executed after:

- `00-plan-project-structure.md`

and before any implementation tasks such as:

- `02-create-fsd-structure.md`
- `03-configure-project-tooling.md`
- `04-setup-router-providers.md`
- `05-setup-state-management.md`
- `06-setup-design-system.md`
- `07-setup-auth-foundation.md`
- `08-create-admin-layout.md`
- `09-implement-login.md`
- `10-implement-dashboard.md`

Read and respect:

- `.claude/docs/pattern.md`
- `CLAUDE.md` if present
- repository-level instructions
- existing configuration files
- existing source code
- `package.json`
- TypeScript configuration
- build configuration
- linting/formatting configuration

If the approved architecture plan from step `00` is available in the current Claude session, use it as additional context.

If it is not available, do not invent its contents.

---

## Task

Inspect the existing repository and perform a foundation audit.

Do not implement anything.

Determine what currently exists and how it relates to the intended project architecture.

---

## 1. Repository Structure

Inspect the current directory and source structure.

Identify:

- existing application folders
- existing shared code
- components
- pages
- features
- entities
- hooks
- utilities
- API-related code
- configuration files
- assets
- styles
- providers
- routing code

Determine which existing files and folders can be preserved.

Identify structural conflicts with the planned architecture.

Do not move or rename anything.

---

## 2. Dependencies

Inspect `package.json` and the lockfile.

Identify:

- framework dependencies
- UI libraries
- styling libraries
- routing libraries
- state-management libraries
- server-state libraries
- form libraries
- validation libraries
- authentication libraries
- utility libraries
- development dependencies
- build tooling

For every potentially conflicting dependency, check whether it is actually used in the source code before making a recommendation.

Do not install or uninstall dependencies.

---

## 3. Approved Frontend Stack

Audit the repository against the intended frontend stack.

Expected technologies include, where applicable:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Base UI
- TanStack Query for server state
- Zustand for UI/client/session state
- React Hook Form
- Zod
- TanStack Table

Do not introduce alternative libraries unless they already exist and must be discussed as part of the audit.

In particular, identify UI libraries that conflict with the approved stack.

Example:

- `@blueprintjs/core`

If a conflicting dependency exists, determine whether it is actually used before recommending future removal.

Do not remove it during this task.

---

## 4. TypeScript

Inspect the TypeScript configuration.

Check:

- strictness
- path aliases
- module resolution
- JSX configuration
- include/exclude rules
- project references if present
- compatibility with the existing build setup

Identify problems or missing configuration that later tasks should address.

Do not edit TypeScript configuration.

---

## 5. Tooling

Inspect the current project tooling.

Check:

- package manager
- scripts
- build tool
- ESLint
- Prettier
- formatting rules
- lint configuration
- TypeScript checking
- development scripts
- production build scripts

Identify missing or conflicting tooling.

Do not configure anything during this task.

---

## 6. Routing

Inspect whether routing already exists.

Identify:

- routing library
- current routes
- route configuration
- layouts
- protected routes
- redirects
- lazy loading
- providers related to routing

Do not create routes.

Do not implement routing.

Routing implementation belongs to the dedicated routing task.

---

## 7. State Management

Inspect existing state-management code and dependencies.

Separate:

- server state
- client/UI state
- URL state
- form state

Expected responsibility boundaries:

- TanStack Query → server state
- Zustand → UI/client/session state
- URL search params → filtering, pagination, sorting when appropriate
- React Hook Form + Zod → forms and validation

Do not duplicate server data into Zustand.

Do not implement state management during this task.

---

## 8. Data / API Layer

Inspect existing API-related code.

Identify:

- API clients
- fetch wrappers
- axios usage
- request utilities
- DTOs
- schemas
- mock handlers
- API types
- environment variables
- base URL configuration

Do not invent backend endpoints.

Do not invent:

- REST paths
- request payloads
- response payloads
- DTOs
- business API contracts

If the backend contract or OpenAPI specification does not exist, explicitly report:

`Backend API contract is not available yet.`

The architecture may define an API abstraction boundary, but concrete business API implementation must wait for the real contract.

---

## 9. Authentication

Inspect the repository for existing authentication-related code.

Check whether Better Auth or another auth system is already installed or implemented.

Report only what actually exists.

Do not implement authentication.

Do not invent authentication endpoints or session behavior.

Authentication implementation belongs to:

`07-setup-auth-foundation.md`

---

## 10. Existing Code Preservation

Identify code that should probably be preserved during later refactoring.

Look for:

- reusable components
- useful utilities
- domain types
- hooks
- styles
- assets
- working configuration
- existing business logic

Do not assume existing code is disposable simply because it does not match the target folder structure.

---

## 11. Conflicts

Identify concrete conflicts between the current repository and the intended architecture.

For each conflict provide:

- what exists
- why it conflicts
- whether it is currently used
- which later task should resolve it

Do not resolve the conflict during this audit.

---

## 12. Missing Foundation

Identify foundation pieces that are currently missing and will be required by later tasks.

Map each missing piece to the appropriate prompt where possible.

For example:

- folder architecture → `02`
- tooling → `03`
- router/providers → `04`
- state management → `05`
- design system → `06`
- authentication → `07`

---

## 13. Execution Order

Based on the actual repository state, verify the safest execution order for the remaining prompts.

Do not blindly assume numeric order if technical dependencies require a different sequence.

Explain dependencies between tasks.

Do not execute any of them.

---

# Output Format

Return the audit using the following structure.

## Current State

Brief summary of the repository as it exists now.

## Existing Stack

List the important technologies and dependencies already present.

## Matches Approved Architecture

What already matches the intended architecture and should be preserved.

## Conflicts

Concrete conflicts or legacy decisions that later tasks should address.

## Missing Foundation

What is not implemented or configured yet.

## Existing Code to Preserve

Important existing code that should not be accidentally removed.

## Cleanup Candidates

Dependencies, files, or configuration that may need cleanup later.

Do not perform the cleanup.

## API Status

State clearly whether a real backend API contract exists.

Do not infer one.

## Auth Status

State what authentication foundation currently exists.

## Risks

Potential migration, compatibility, architecture, or implementation risks.

## Recommended Execution Order

Recommend the order for prompts `02–10` based on repository dependencies.

For each non-obvious ordering decision, provide a short reason.

---

# Constraints

This is a READ-ONLY task.

You MUST NOT:

- create files
- edit files
- delete files
- rename files
- move files
- install packages
- uninstall packages
- modify `package.json`
- modify lockfiles
- modify configuration
- modify source code
- run migrations
- make commits
- implement features
- implement routing
- implement state management
- implement authentication
- invent backend API contracts

You may inspect the repository and run safe read-only commands when necessary.

If information is missing, report it as missing instead of inventing it.

When the audit is complete, return the final audit report and STOP.

Do not proceed to implementation.

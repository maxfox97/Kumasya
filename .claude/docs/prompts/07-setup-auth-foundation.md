# Task: Setup Authentication Foundation

## Mode

IMPLEMENTATION TASK.

Follow:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/architecture/project-structure.md`
- `docs/architecture/state-management.md`
- `docs/architecture/auth.md`

Do not implement the Login page UI in this task.

Do not implement backend authentication.

Do not modify unrelated features.

---

# Goal

Prepare the frontend authentication foundation for Kumasya Admin.

The backend is developed and owned by the Tech Lead.

The backend uses Better Auth.

This frontend must integrate with the backend authentication contract without duplicating server-side authentication logic.

The authentication foundation must support future implementation of:

- A1 Login
- protected admin routes
- current authenticated admin
- logout
- session restoration after page refresh
- authentication loading state
- unauthenticated redirects

---

# Important Architecture Boundary

Frontend responsibility:

- Better Auth client integration
- global frontend auth state
- session bootstrap
- protected route boundary
- current admin state
- logout integration boundary
- auth-related frontend types

Backend responsibility:

- Better Auth server configuration
- database
- session persistence
- cookies
- credentials validation
- password handling
- roles/permissions enforcement
- authentication endpoints
- CORS
- trusted origins
- security configuration

Do NOT implement backend responsibilities in this repository.

---

# Before Implementation

Before changing files:

1. Inspect the current repository structure.
2. Read the approved FSD architecture.
3. Inspect installed dependencies.
4. Check whether `better-auth` is already installed.
5. Inspect existing Zustand setup.
6. Inspect existing React Router setup.
7. Inspect existing TanStack Query setup.
8. Inspect existing environment variable conventions.
9. Search for any existing authentication implementation.
10. Search for any backend/API contract already documented in the repository.

Use CodeGraph when useful.

Do not create duplicate auth infrastructure if an implementation already exists.

---

# Backend Contract Check

Before implementing Better Auth integration, determine whether the repository already defines:

- backend base URL
- Better Auth base URL
- Better Auth base path
- session endpoint behavior
- user/session shape
- admin role shape
- login method
- logout behavior
- development frontend/backend origins

Do not invent missing backend details.

If important backend contract details are missing:

- implement only the frontend boundary that can be safely prepared
- use clearly named configuration placeholders where appropriate
- document the missing contract in the completion report
- do not guess endpoint URLs

---

# Better Auth Client

Use the official Better Auth React client.

Expected conceptual setup:

```ts
import { createAuthClient } from "better-auth/react";
```

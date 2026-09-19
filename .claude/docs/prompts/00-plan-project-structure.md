# Task: Plan Project Structure

## Mode

PLAN ONLY.

Do not modify files.
Do not create folders.
Do not install packages.
Do not generate implementation code.
Do not run destructive commands.

This task is architecture planning only.

Before making any implementation changes, the proposed architecture must be reviewed and approved.

---

# Context

This repository contains the frontend for:

`Kumasya Admin`

The application is an administrative panel based on approved Figma designs.

Main screens:

- A1 — Admin Login
- A1.1 — Login Error
- A2 — Kitchen Dashboard
- A3 — Class Distribution
- A4 — Users
- A5 — Orders
- A6 — Menu and Prices
- A7 — Support
- A8 — Settings

Design references are documented in:

`docs/design/figma-map.md`

---

# Required Project Rules

Before analysis, read:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/design/figma-map.md`

If architecture documents already exist, inspect them as well.

Do not duplicate rules already defined in `CLAUDE.md`.

---

# Approved Technology Stack

The project uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Base UI
- React Router
- TanStack Query
- TanStack Table
- Zustand
- React Hook Form
- Zod
- Lucide
- Better Auth frontend integration

Do not recommend replacing these technologies unless there is a critical technical reason.

Do not introduce additional libraries merely because they are popular.

Prefer:

Simple → Maintainable → Scalable.

---

# Architecture Style

Use Feature-Sliced Design as the architectural foundation.

Expected layers:

```text
app
pages
widgets
features
entities
shared
```

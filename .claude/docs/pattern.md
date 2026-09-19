# Claude Task Execution Pattern

Every implementation task must follow this workflow.

## 1. Understand

Before changing files:

- read the requested task
- inspect relevant existing code
- inspect current project architecture
- use CodeGraph when relationships between files are unclear
- inspect Figma through MCP when UI is involved
- inspect existing shadcn components before creating new UI primitives

Do not modify files during this phase.

---

## 2. Scope

Determine:

- which files need changes
- which FSD slices are involved
- which existing components can be reused
- whether new dependencies are actually necessary

Do not change unrelated files.

---

## 3. Plan

Before implementation output a short plan:

1. files to create
2. files to modify
3. components/features involved
4. state management approach
5. validation approach

Keep the plan concise.

---

## 4. Implement

Implementation rules:

- follow FSD architecture
- reuse existing components
- use TypeScript
- avoid `any`
- avoid premature abstractions
- keep business logic outside presentational components
- do not duplicate server state in Zustand
- use semantic design tokens
- use shadcn/ui when possible

---

## 5. Validate

Run:

npm run lint
npm run typecheck
npm run build

If UI changed:

- run the application
- inspect it through Chrome DevTools MCP
- compare against Figma
- check console errors

Fix issues caused by the task.

---

## 6. Report

At completion report only:

- what changed
- files created/modified
- validation results
- remaining blockers or assumptions

Do not produce long explanations unless requested.

---

## UI Tasks

If the task involves UI:

1. Read the referenced screen from `docs/design/figma-map.md`.
2. Inspect the exact Figma node using Figma MCP.
3. Determine:
   - layout
   - dimensions
   - spacing
   - typography
   - colors
   - borders
   - radius
   - component states
4. Check whether existing shared/shadcn components can be reused.
5. Implement.
6. Open the implementation using Chrome DevTools MCP.
7. Compare the result with Figma.
8. Fix confirmed visual differences.

## Restrictions

Do not:

- refactor unrelated code
- change architecture without approval
- install unnecessary dependencies
- create speculative abstractions
- implement backend functionality
- hardcode temporary data inside reusable UI components
- modify generated shadcn components unnecessarily

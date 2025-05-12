# Coding Standards for Component Library

This document outlines the agreed-upon coding standards and best practices for this project. All contributors should follow these guidelines to ensure code quality, maintainability, and consistency.

## 1. File & Folder Structure

- Use atomic design: `atoms/`, `molecules/`, `organisms/`.
- Each component gets its own folder (e.g., `button/`, `icon/`).
- Place stories, types, and tests next to their component (e.g., `Button.vue`, `Button.type.ts`, `Button.stories.ts`).

## 2. Naming Conventions

- **Files:** Use kebab-case (e.g., `base-button.vue`, `icon.type.ts`).
- **Components:** Use PascalCase (e.g., `BaseButton`, `ButtonLink`).
- **Props:** Use camelCase (e.g., `iconName`, `isDisabled`).
- **CSS Classes:** Use BEM or utility classes (e.g., `ws-button__icon--right`).

## 3. Imports & Paths

- Use relative imports within the same atomic folder (e.g., `../icon/Icon.vue`).
- Use alias (`@/`) for cross-atomic imports if configured, otherwise use relative paths.
- Always include file extensions for TypeScript/ESM compatibility (e.g., `import { x } from './file.ts'`).

## 4. Component Patterns

- **Props:** Type all props using TypeScript interfaces in a `.type.ts` file.
- **Slots:** Prefer named slots for extensibility.
- **Events:** Use `emit` with kebab-case event names (e.g., `@click`).
- **Accessibility:** Always provide ARIA attributes and keyboard support.

## 5. Styling

- Use CSS custom properties for design tokens (see `styles/tokens.css`).
- Use PostCSS for processing.
- Scope styles with `<style scoped>` in single-file components.

## 6. Testing

- Use Vitest for unit tests.
- Place test files next to the code (`icon.test.ts`, `link.test.ts`).
- Cover all utility functions and critical component logic.

## 7. Storybook

- Every atomic component must have a `.stories.ts` file.
- Stories should cover all major variants and edge cases.

## 8. Documentation

- Use JSDoc for utility functions.
- Add comments for complex logic.
- Keep this document up to date as standards evolve.

## 9. Code Review & CI

- All PRs require at least one review.
- CI must pass (lint, test, build) before merging.

## 10. Utility Function Best Practices

- Use descriptive variable names (avoid single letters)
- Add empty lines between logical sections for readability
- Avoid single-line if statements with early return; use block form
- Add comments to explain each logical section
- Prefer clarity and maintainability over brevity

Example:

```ts
// Good:
if (!iconName) {
  return null;
}

// Bad:
if (!iconName) return null;
```

---

_If you have suggestions or want to propose changes, open a PR to this file._

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

- Prefer early return in functions and methods instead of else blocks, especially after handling a condition. This improves readability and reduces nesting.
  Example:
    export function handleDisabledState(
      el: HTMLButtonElement | HTMLAnchorElement,
      preventClick: (event: Event) => void
    ): void {
      if (el.hasAttribute("disabled")) {
        el.setAttribute("aria-disabled", "true");
        el.tabIndex = -1;
        el.addEventListener("click", preventClick, true);
        return;
      }

      el.setAttribute("aria-disabled", "false");
      el.tabIndex = 0;
      el.removeEventListener("click", preventClick, true);
    }

## 11. Class Member Order for Web Components

For all custom elements and classes, use the following order:

1. **Static properties and static getter/setter** (e.g. observedAttributes)
2. **Instance properties** (fields, including those set in the constructor)
3. **Constructor**
4. **Getter/setter for each property** (grouped together, alphabetically if possible)
5. **Public methods** (documented with `public` JSDoc tag)
6. **Protected methods** (documented with `protected` JSDoc tag)
7. **Private methods** (prefix with `#` and document with `private` JSDoc tag)
8. **Lifecycle methods** (connectedCallback, disconnectedCallback, attributeChangedCallback, etc.)
9. **Render method**

- Add a comment before each section for clarity. Unless the section is empty, then add no comment.
- Always use TypeScript for all class fields and methods.
- Always use the `public` keyword for public methods and properties in TypeScript classes, even though it is the default. This makes intent explicit and consistent.
- Always add a single empty line between class members (methods, getters, setters, properties, etc.), including between paired getter/setter blocks.
  Example:
  public get accessibleLabel(): string {
  return this.getAttribute("accessible-label") || this.label;
  }

  public set accessibleLabel(val: string) {
  this.setAttribute("accessible-label", val);
  }

  (No blank line between get/set signature, but always a blank line after each block.)

- Always add a single empty line between logical code blocks inside functions and methods (such as between if/else blocks, loops, and major steps).
  Example:
  public connectedCallback(): void {
  if (this.hasAttribute("label")) {
  this.textContent = this.getAttribute("label")!;
  }

  if (this.hasAttribute("accessible-label")) {
  this.setAttribute("aria-label", this.getAttribute("accessible-label")!);
  }

  if (this.hasAttribute("variant")) {
  this.setAttribute("data-variant", this.getAttribute("variant")!);
  }

  if (this.hasAttribute("disabled")) {
  this.setAttribute("aria-disabled", "true");
  this.tabIndex = -1;
  this.addEventListener("click", this.#preventClick, true);
  } else {
  this.setAttribute("aria-disabled", "false");
  this.tabIndex = 0;
  this.removeEventListener("click", this.#preventClick, true);
  }

  if (this.getAttribute("target") === "\_blank") {
  this.setAttribute("rel", "noopener noreferrer");
  }

  this.classList.add("ws-button-link");
  }

- Example:

```ts
class ExampleComponent extends HTMLElement {
  // 1. Static properties
  static get observedAttributes() {
    return [
      /* ... */
    ];
  }

  // 2. Instance properties
  private _foo: string;

  // 3. Constructor
  constructor() {
    /* ... */
  }

  // 4. Getters/setters
  get foo() {
    /* ... */
  }
  set foo(val) {
    /* ... */
  }

  // 5. Public methods
  /** @public */
  public doSomething() {
    /* ... */
  }

  // 6. Protected methods
  /** @protected */
  protected _helper() {
    /* ... */
  }

  // 7. Private methods
  /** @private */
  #privateHelper() {
    /* ... */
  }

  // 8. Lifecycle methods
  connectedCallback() {
    /* ... */
  }
  disconnectedCallback() {
    /* ... */
  }
  attributeChangedCallback() {
    /* ... */
  }

  // 9. Render method
  render() {
    /* ... */
  }
}
```

---

_If you have suggestions or want to propose changes, open a PR to this file._

// Convert to TypeScript: Button.native.ts

// 1. Base Button
class WsBaseButton extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ["label", "type", "disabled", "variant", "accessible-label"];
  }

  // 2. Instance properties
  #onClick: (event: Event) => void;

  // 3. Constructor
  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#onClick = this.#handleClick.bind(this);
  }

  // 4. Getters/setters
  public get label(): string {
    return this.getAttribute("label") || "";
  }
  public set label(val: string) {
    this.setAttribute("label", val);
  }

  public get type(): string {
    return this.getAttribute("type") || "button";
  }
  public set type(val: string) {
    this.setAttribute("type", val);
  }

  public get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  public set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  public get accessibleLabel(): string {
    return this.getAttribute("accessible-label") || this.label;
  }
  public set accessibleLabel(val: string) {
    this.setAttribute("accessible-label", val);
  }

  // 5. Public methods
  // 6. Protected methods
  // 7. Private methods
  #handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      (event as any).stopImmediatePropagation?.();
    }
  }

  // 8. Lifecycle methods
  public connectedCallback(): void {
    this.render();
    this.shadowRoot
      ?.querySelector("button")
      ?.addEventListener("click", this.#onClick);
  }

  public disconnectedCallback(): void {
    this.shadowRoot
      ?.querySelector("button")
      ?.removeEventListener("click", this.#onClick);
  }

  public attributeChangedCallback(): void {
    this.render();
  }

  // 9. Render method
  public render(): void {
    const style = (window as any).__wsButtonCss
      ? `<style>${(window as any).__wsButtonCss}</style>`
      : "";
    this.shadowRoot!.innerHTML = `
      ${style}
      <button
        type="${this.type}"
        aria-label="${this.accessibleLabel}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        ${this.disabled ? "disabled" : ""}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}

customElements.define("ws-base-button", WsBaseButton);

// 1.2. ButtonLink
class WsButtonLink extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ["label", "href", "disabled", "accessible-label"];
  }

  #onClick: (event: Event) => void;

  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#onClick = this.#handleClick.bind(this);
  }

  public get label(): string {
    return this.getAttribute("label") || "";
  }
  public set label(val: string) {
    this.setAttribute("label", val);
  }

  public get href(): string {
    return this.getAttribute("href") || "#";
  }
  public set href(val: string) {
    this.setAttribute("href", val);
  }

  public get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  public set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  public get accessibleLabel(): string {
    return this.getAttribute("accessible-label") || this.label;
  }
  public set accessibleLabel(val: string) {
    this.setAttribute("accessible-label", val);
  }

  #handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      (event as any).stopImmediatePropagation?.();
    }
  }

  public connectedCallback(): void {
    this.render();
    this.shadowRoot
      ?.querySelector("a")
      ?.addEventListener("click", this.#onClick);
  }

  public disconnectedCallback(): void {
    this.shadowRoot
      ?.querySelector("a")
      ?.removeEventListener("click", this.#onClick);
  }

  public attributeChangedCallback(): void {
    this.render();
  }

  public render(): void {
    const style = (window as any).__wsButtonCss
      ? `<style>${(window as any).__wsButtonCss}</style>`
      : "";
    this.shadowRoot!.innerHTML = `
      ${style}
      <a
        href="${this.disabled ? "#" : this.href}"
        aria-label="${this.accessibleLabel}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        tabindex="${this.disabled ? -1 : 0}"
      >
        <slot>${this.label}</slot>
      </a>
    `;
  }
}

customElements.define("ws-button-link", WsButtonLink);

// Import shared styles for the web component
fetch(new URL("./Button.css", import.meta.url))
  .then((res) => res.text())
  .then((css) => {
    (window as any).__wsButtonCss = css;
  });

// 1.3. Button (smart wrapper)
class WsButton extends HTMLElement {
  public static get observedAttributes(): string[] {
    return [
      "label",
      "href",
      "type",
      "disabled",
      "variant",
      "accessible-label",
    ];
  }

  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public get label(): string {
    return this.getAttribute("label") || "";
  }
  public set label(val: string) {
    this.setAttribute("label", val);
  }

  public get href(): string {
    return this.getAttribute("href") || "";
  }
  public set href(val: string) {
    this.setAttribute("href", val);
  }

  public get type(): string {
    return this.getAttribute("type") || "button";
  }
  public set type(val: string) {
    this.setAttribute("type", val);
  }

  public get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  public set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  public get variant(): string {
    return this.getAttribute("variant") || "";
  }
  public set variant(val: string) {
    this.setAttribute("variant", val);
  }

  public get accessibleLabel(): string {
    return this.getAttribute("accessible-label") || this.label;
  }
  public set accessibleLabel(val: string) {
    this.setAttribute("accessible-label", val);
  }

  public connectedCallback(): void {
    this.render();
  }

  public attributeChangedCallback(): void {
    this.render();
  }

  public render(): void {
    const isLink = this.hasAttribute("href");
    const tag = isLink ? "ws-button-link" : "ws-base-button";
    const attrs = [
      `label="${this.getAttribute("label") || ""}"`,
      this.hasAttribute("type") ? `type="${this.getAttribute("type")}"` : "",
      this.hasAttribute("href") ? `href="${this.getAttribute("href")}"` : "",
      this.hasAttribute("disabled") ? "disabled" : "",
      this.hasAttribute("variant")
        ? `variant="${this.getAttribute("variant")}"`
        : "",
      this.hasAttribute("accessible-label")
        ? `accessible-label="${this.getAttribute("accessible-label")}"`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    this.shadowRoot!.innerHTML = `
      <${tag} ${attrs}>
        <slot></slot>
      </${tag}>
    `;
  }
}

customElements.define("ws-button", WsButton);

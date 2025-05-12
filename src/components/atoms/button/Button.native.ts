import "./Button.css";

class WsBaseButton extends HTMLButtonElement {
  public static get observedAttributes(): string[] {
    return ["label", "variant", "accessible-label"];
  }

  public attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (name === "label" && value !== null) {
      this.textContent = value;
    }
    if (name === "accessible-label" && value !== null) {
      this.setAttribute("aria-label", value);
    }
    if (name === "variant" && value !== null) {
      this.setAttribute("data-variant", value);
    }
  }

  public connectedCallback(): void {
    // Set initial label and aria-label
    if (this.hasAttribute("label")) {
      this.textContent = this.getAttribute("label")!;
    }
    if (this.hasAttribute("accessible-label")) {
      this.setAttribute("aria-label", this.getAttribute("accessible-label")!);
    }
    // Set variant as data-attribute for styling
    if (this.hasAttribute("variant")) {
      this.setAttribute("data-variant", this.getAttribute("variant")!);
    }
    // Add class for shared styling
    this.classList.add("ws-base-button");
  }
}

customElements.define("ws-base-button", WsBaseButton, { extends: "button" });

// Native Web Component: ButtonLink (extends native anchor)
class WsButtonLink extends HTMLAnchorElement {
  public static get observedAttributes(): string[] {
    return [
      "label",
      "accessible-label",
      "variant",
      "disabled",
      "target",
      "rel",
    ];
  }

  public attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (name === "label" && value !== null) {
      this.textContent = value;
    }
    if (name === "accessible-label" && value !== null) {
      this.setAttribute("aria-label", value);
    }
    if (name === "variant" && value !== null) {
      this.setAttribute("data-variant", value);
    }
    if (name === "disabled") {
      if (this.hasAttribute("disabled")) {
        this.setAttribute("aria-disabled", "true");
        this.tabIndex = -1;
        this.addEventListener("click", this.#preventClick, true);
      } else {
        this.setAttribute("aria-disabled", "false");
        this.tabIndex = 0;
        this.removeEventListener("click", this.#preventClick, true);
      }
    }
    if (name === "target" && value === "_blank") {
      this.setAttribute("rel", "noopener noreferrer");
    }
  }

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

    if (this.getAttribute("target") === "_blank") {
      this.setAttribute("rel", "noopener noreferrer");
    }

    this.classList.add("ws-button-link");
  }

  #preventClick(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation?.();
  }
}

customElements.define("ws-button-link", WsButtonLink, { extends: "a" });

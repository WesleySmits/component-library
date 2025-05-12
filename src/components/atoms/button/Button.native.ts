import {
  applyExternalLinkAttributes,
  isExternalLink,
  removeExternalLinkAttributes,
} from "@/utilities/link";
import "./Button.css";
import {
  applyCommonAttributes,
  handleDisabledState,
  updateButtonClasses,
} from "./Button.helpers";
import { ButtonVariant } from "./Button.type";

class WsBaseButton extends HTMLButtonElement {
  public static get observedAttributes(): string[] {
    return ["label", "variant", "accessible-label", "disabled"];
  }

  public attributeChangedCallback(): void {
    applyCommonAttributes(this);
    updateButtonClasses(this);
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
    updateButtonClasses(this);
    this.classList.add("ws-base-button");
  }
}

customElements.define("ws-base-button", WsBaseButton, { extends: "button" });

class WsButtonLink extends HTMLAnchorElement {
  public static get observedAttributes(): string[] {
    return [
      "label",
      "accessible-label",
      "variant",
      "disabled",
      "target",
      "rel",
      "href",
    ];
  }

  #preventClick(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation?.();
  }

  public attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    applyCommonAttributes(this);
    handleDisabledState(this, this.#preventClick);
    updateButtonClasses(this, { isLink: true });

    if (name === "href") {
      this.#handleExternalLinks(value);
    }
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
    handleDisabledState(this, this.#preventClick);
    this.#handleExternalLinks(this.href);
    updateButtonClasses(this, { isLink: true });
    this.classList.add("ws-button-link");
  }

  #handleExternalLinks(hrefValue: string | null): void {
    if (hrefValue && isExternalLink(hrefValue)) {
      applyExternalLinkAttributes(this);
    } else {
      removeExternalLinkAttributes(this);
    }
  }
}

customElements.define("ws-button-link", WsButtonLink, { extends: "a" });

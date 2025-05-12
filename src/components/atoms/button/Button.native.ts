import {
  applyExternalLinkAttributes,
  isExternalLink,
  removeExternalLinkAttributes,
} from "@/utilities/link";
import "./Button.css";
import { applyCommonAttributes, handleDisabledState } from "./Button.helpers";

class WsBaseButton extends HTMLButtonElement {
  public static get observedAttributes(): string[] {
    return ["label", "variant", "accessible-label"];
  }

  public attributeChangedCallback(): void {
    applyCommonAttributes(this);
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
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

    if (name === "href" && value && isExternalLink(value)) {
      applyExternalLinkAttributes(this);
    }

    if (name === "href") {
      this.#handleExternalLinks(value);
    }
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
    handleDisabledState(this, this.#preventClick);
    this.#handleExternalLinks(this.href);
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

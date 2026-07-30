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
  updateButtonIcon,
} from "./Button.helpers";
import "../icon/Icon.native";

class WsBaseButton extends HTMLButtonElement {
  public static get observedAttributes(): string[] {
    return ["label", "variant", "accessible-label", "disabled", "icon"];
  }

  public attributeChangedCallback(name: string): void {
    applyCommonAttributes(this);
    updateButtonClasses(this);
    if (name === "icon") {
      updateButtonIcon(this);
    }
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
    updateButtonClasses(this);
    updateButtonIcon(this);
  }
}

if (!customElements.get("ws-base-button")) {
  customElements.define("ws-base-button", WsBaseButton, { extends: "button" });
}

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
      "icon",
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
    updateButtonIcon(this);
    if (name === "href") {
      this.#handleExternalLinks(value);
    }
  }

  public connectedCallback(): void {
    applyCommonAttributes(this);
    handleDisabledState(this, this.#preventClick);
    this.#handleExternalLinks(this.href);
    updateButtonClasses(this, { isLink: true });
    updateButtonIcon(this);
  }

  #handleExternalLinks(hrefValue: string | null): void {
    if (hrefValue && isExternalLink(hrefValue)) {
      this.setAttribute("icon", "arrow-up-right-from-square");
      applyExternalLinkAttributes(this);
    } else {
      this.removeAttribute("icon");
      removeExternalLinkAttributes(this);
    }
  }
}

if (!customElements.get("ws-button-link")) {
  customElements.define("ws-button-link", WsButtonLink, { extends: "a" });
}

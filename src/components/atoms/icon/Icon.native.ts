import { icon } from "@fortawesome/fontawesome-svg-core";
import { findFaIcon, getFaSize } from "../../../utilities/icon";

export class IconElement extends HTMLElement {
  public static get observedAttributes(): string[] {
    return ["icon", "size"];
  }

  public connectedCallback(): void {
    this.render();
  }

  public attributeChangedCallback(): void {
    this.render();
  }

  public render(): void {
    this.innerHTML = "";
    const iconName = this.getAttribute("icon");
    const size = this.getAttribute("size");
    const foundIcon = findFaIcon(iconName ?? "");

    if (!foundIcon) {
      return;
    }

    const renderedIcon = icon({
      prefix: foundIcon.prefix,
      iconName: foundIcon.iconName,
    });
    const iconElement = renderedIcon.node.item(0);

    if (!(iconElement instanceof SVGElement)) {
      return;
    }

    const faSize = size ? getFaSize(size) : undefined;

    if (faSize) {
      iconElement.classList.add(`fa-${faSize}`);
    }

    iconElement.classList.add("ws-icon", `ws-icon--${iconName}`);
    iconElement.setAttribute("aria-hidden", "true");
    iconElement.setAttribute("focusable", "false");

    this.appendChild(iconElement);
  }
}

if (!customElements.get("ws-icon")) {
  customElements.define("ws-icon", IconElement);
}

import { findFaIcon } from "@/utilities/icon";
import { ButtonVariant } from "./Button.type";

export function applyCommonAttributes(el: HTMLElement): void {
  if (el.hasAttribute("label")) {
    el.textContent = el.getAttribute("label")!;
  }

  if (el.hasAttribute("accessible-label")) {
    el.setAttribute("aria-label", el.getAttribute("accessible-label")!);
  }

  if (el.hasAttribute("variant")) {
    el.setAttribute("data-variant", el.getAttribute("variant")!);
  }
}

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

export function updateButtonClasses(
  el: HTMLElement,
  options?: { isLink?: boolean }
): void {
  el.classList.add("ws-button");
  if (options?.isLink) {
    el.classList.add("ws-button-link");
  }
  el.classList.toggle("ws-button--disabled", el.hasAttribute("disabled"));

  // Remove only known variant classes
  Object.values(ButtonVariant).forEach((variant) => {
    el.classList.remove(`ws-button--${variant}`);
  });

  const variant = el.getAttribute("variant");
  if (
    variant &&
    Object.values(ButtonVariant).includes(variant as ButtonVariant)
  ) {
    el.classList.add(`ws-button--${variant}`);
  }
}

export function updateButtonIcon(el: HTMLElement): void {
  const prevIcon = el.querySelector(".ws-icon");

  if (prevIcon) {
    prevIcon.remove();
  }

  const icon = el.getAttribute("icon");
  const foundIcon = findFaIcon(icon ?? "");

  if (foundIcon) {
    const iconEl = document.createElement("ws-icon");
    iconEl.setAttribute("icon", icon ?? "");
    iconEl.setAttribute("class", "ws-icon ws-button__icon");
    iconEl.setAttribute("aria-hidden", "true");
    iconEl.setAttribute("focusable", "false");
    el.insertBefore(iconEl, el.firstChild);
  }
}

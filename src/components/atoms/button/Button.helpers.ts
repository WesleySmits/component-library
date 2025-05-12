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

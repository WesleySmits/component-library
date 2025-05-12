/**
 * Determines if a given href is an external link (absolute URL not matching the current origin).
 * @param {string} href - The URL or href attribute to check.
 * @returns {boolean} True if the link is external, false otherwise.
 */
export function isExternalLink(href: string): boolean {
  // Return false if input is not a string
  if (typeof href !== "string") {
    return false;
  }

  // Check if the href is an absolute http(s) URL and not the current origin
  try {
    const isHttp = /^(https?:)?\/\//.test(href);
    const isNotOrigin = !href.startsWith(window.location.origin);

    if (isHttp && isNotOrigin) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Adds security and accessibility attributes to an anchor element for external links.
 * Sets target="_blank" and rel="noopener noreferrer external".
 * @param {HTMLAnchorElement} anchor - The anchor element to modify.
 */
export function applyExternalLinkAttributes(anchor: HTMLAnchorElement) {
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer external");
}

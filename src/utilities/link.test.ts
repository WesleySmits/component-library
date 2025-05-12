import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  isExternalLink,
  applyExternalLinkAttributes,
  removeExternalLinkAttributes,
} from "./link";

// Ensure jsdom environment for window/document
declare const window: any;
declare const document: any;

describe("isExternalLink", () => {
  let originalOrigin: string;
  beforeAll(() => {
    originalOrigin = window.location.origin;
    Object.defineProperty(window, "location", {
      value: { origin: "https://my-site.com" },
      writable: true,
    });
  });
  afterAll(() => {
    Object.defineProperty(window, "location", {
      value: { origin: originalOrigin },
      writable: true,
    });
  });

  it("returns true for http(s) links not matching window.location.origin", () => {
    expect(isExternalLink("https://external.com")).toBe(true);
    expect(isExternalLink("http://external.com")).toBe(true);
    expect(isExternalLink("https://my-site.com/page")).toBe(false);
    expect(isExternalLink("/internal-page")).toBe(false);
  });

  it("returns false for relative links", () => {
    expect(isExternalLink("/about")).toBe(false);
    expect(isExternalLink("contact")).toBe(false);
  });

  it("returns false for invalid input", () => {
    // @ts-expect-error
    expect(isExternalLink(undefined)).toBe(false);
    // @ts-expect-error
    expect(isExternalLink(null)).toBe(false);
  });
});

describe("applyExternalLinkAttributes", () => {
  it("sets target and rel attributes for external links", () => {
    const anchor = document.createElement("a");
    applyExternalLinkAttributes(anchor);
    expect(anchor.getAttribute("target")).toBe("_blank");
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer external");
  });
});

describe("removeExternalLinkAttributes", () => {
  it("removes target and rel if set to external values", () => {
    const anchor = document.createElement("a");
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer external");
    removeExternalLinkAttributes(anchor);
    expect(anchor.hasAttribute("target")).toBe(false);
    expect(anchor.hasAttribute("rel")).toBe(false);
  });

  it("does not remove target if set to something else", () => {
    const anchor = document.createElement("a");
    anchor.setAttribute("target", "_self");
    anchor.setAttribute("rel", "noopener noreferrer external");
    removeExternalLinkAttributes(anchor);
    expect(anchor.getAttribute("target")).toBe("_self");
    expect(anchor.hasAttribute("rel")).toBe(false);
  });

  it("does not remove rel if set to something else", () => {
    const anchor = document.createElement("a");
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "nofollow");
    removeExternalLinkAttributes(anchor);
    expect(anchor.hasAttribute("target")).toBe(false);
    expect(anchor.getAttribute("rel")).toBe("nofollow");
  });

  it("does nothing if neither attribute is set", () => {
    const anchor = document.createElement("a");
    removeExternalLinkAttributes(anchor);
    expect(anchor.hasAttribute("target")).toBe(false);
    expect(anchor.hasAttribute("rel")).toBe(false);
  });
});

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  extractIcons,
  findFaIcon,
  getFaSize,
  FaSize,
  getAllIconsAndRegister,
  getAllIconsCached,
  __setAllIconsForTest,
} from "./icon";

// Mock FontAwesome icon module
const mockIcons = {
  faUser: { iconName: "user", prefix: "fa", dummy: true } as any,
  faGithub: { iconName: "github", prefix: "fab", dummy: true } as any,
  faEnvelope: { iconName: "envelope", prefix: "fa", dummy: true } as any,
  notAnIcon: "not-an-icon",
};

describe("extractIcons", () => {
  it("extracts only valid icon definitions", () => {
    const icons = extractIcons(mockIcons);
    expect(Object.keys(icons)).toContain("faUser");
    expect(Object.keys(icons)).toContain("faGithub");
    expect(Object.keys(icons)).toContain("faEnvelope");
    expect(Object.keys(icons)).not.toContain("notAnIcon");
  });
});

describe("findFaIcon", () => {
  let originalAllIcons: any;
  beforeEach(() => {
    // Patch the icon cache for isolated tests
    originalAllIcons = getAllIconsCached();
    __setAllIconsForTest(extractIcons(mockIcons));
  });
  afterEach(() => {
    __setAllIconsForTest(originalAllIcons);
  });
  it("finds icon by exact export name", () => {
    expect(findFaIcon("faUser")).toMatchObject({ iconName: "user" });
  });
  it("finds icon by fa- prefix", () => {
    expect(findFaIcon("user")).toMatchObject({ iconName: "user" });
  });
  it("finds icon by case-insensitive match", () => {
    expect(findFaIcon("FAUSER")).toMatchObject({ iconName: "user" });
  });
  it("returns null for missing icon", () => {
    expect(findFaIcon("missing")).toBeNull();
  });
});

describe("getFaSize", () => {
  it("returns valid FaSize for allowed string", () => {
    expect(getFaSize("lg")).toBe("lg");
    expect(getFaSize("2x")).toBe("2x");
  });
  it("returns undefined for invalid string", () => {
    expect(getFaSize("big")).toBeUndefined();
  });
  it("returns undefined for number", () => {
    expect(getFaSize(24)).toBeUndefined();
  });
});

describe("getAllIconsAndRegister / getAllIconsCached", () => {
  it("returns a consistent icon registry and caches it", () => {
    const icons1 = getAllIconsAndRegister();
    const icons2 = getAllIconsCached();
    expect(icons1).toBe(icons2);
    expect(typeof icons1).toBe("object");
    expect(Object.keys(icons1).length).toBeGreaterThan(0);
  });
});

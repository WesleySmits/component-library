// setupTests.ts
// Ensures jsdom globals are available for Vitest
import { JSDOM } from "jsdom";

if (typeof window === "undefined" || typeof document === "undefined") {
  const { window: jsdomWindow } = new JSDOM("", { url: "https://my-site.com" });
  (globalThis as any).window = jsdomWindow;
  (globalThis as any).document = jsdomWindow.document;
  (globalThis as any).navigator = jsdomWindow.navigator;
}

// Move extractIcons above the icon set imports so it can be used directly
export function extractIcons(
  mod: Record<string, unknown>
): Record<string, IconDefinition> {
  return Object.fromEntries(
    Object.entries(mod).filter(
      ([, v]) => v && typeof v === "object" && "iconName" in v && "prefix" in v
    )
  ) as Record<string, IconDefinition>;
}

import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Type for allowed FA sizes
export type FaSize =
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x";

// Find a FontAwesome icon by various naming conventions
export function findFaIcon(iconName: string): IconDefinition | null {
  const allIcons = getAllIconsCached();
  if (!iconName) return null;
  if (Object.prototype.hasOwnProperty.call(allIcons, iconName))
    return allIcons[iconName];
  const faName = "fa" + iconName.charAt(0).toUpperCase() + iconName.slice(1);
  if (Object.prototype.hasOwnProperty.call(allIcons, faName))
    return allIcons[faName];
  const lower = Object.keys(allIcons).find(
    (k) => k.toLowerCase() === iconName.toLowerCase()
  );
  if (lower) return allIcons[lower];
  return null;
}

export function getFaSize(size: unknown): FaSize | undefined {
  const allowed: FaSize[] = [
    "2xs",
    "xs",
    "sm",
    "lg",
    "xl",
    "2xl",
    "1x",
    "2x",
    "3x",
    "4x",
    "5x",
    "6x",
    "7x",
    "8x",
    "9x",
    "10x",
  ];
  if (typeof size === "string" && allowed.includes(size as FaSize))
    return size as FaSize;
  return undefined;
}

export function getAllIcons(): Record<string, IconDefinition> {
  return {
    ...extractIcons(solidIcons),
    ...extractIcons(regularIcons),
    ...extractIcons(brandsIcons),
  };
}

// Patchable icon cache for testability
let _allIcons: Record<string, IconDefinition> | null = null;

export function __setAllIconsForTest(
  icons: Record<string, IconDefinition> | null
) {
  _allIcons = icons;
}

export function getAllIconsAndRegister(): Record<string, IconDefinition> {
  if (_allIcons) return _allIcons;
  const allIcons = getAllIcons();
  Object.values(allIcons).forEach((icon) => {
    // Import here to avoid circular dependency
    const { library } = require("@fortawesome/fontawesome-svg-core");
    library.add(icon);
  });
  _allIcons = allIcons;
  return allIcons;
}

export function getAllIconsCached(): Record<string, IconDefinition> {
  if (!_allIcons) getAllIconsAndRegister();
  return _allIcons!;
}

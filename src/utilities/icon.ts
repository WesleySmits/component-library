import { library } from "@fortawesome/fontawesome-svg-core";

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

// Convert kebab-case (e.g. up-right-from-square) to PascalCase (UpRightFromSquare)
function toFaVarName(iconName: string): string {
  return (
    "fa" +
    iconName
      .split("-")
      .map((part) => {
        // Capitalize each part for clarity
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join("")
  );
}

// Find a FontAwesome icon by various naming conventions
export function findFaIcon(iconName: string): IconDefinition | null {
  const allIcons = getAllIconsCached();

  // Return null if no icon name is provided
  if (!iconName) {
    return null;
  }

  // Direct match (exact key)
  const hasDirectMatch = Object.prototype.hasOwnProperty.call(
    allIcons,
    iconName
  );
  if (hasDirectMatch) {
    return allIcons[iconName];
  }

  // Try kebab-case to PascalCase conversion (faUpRightFromSquare)
  const faVariableName = toFaVarName(iconName);
  const hasFaVarMatch = Object.prototype.hasOwnProperty.call(
    allIcons,
    faVariableName
  );
  if (hasFaVarMatch) {
    return allIcons[faVariableName];
  }

  // Case-insensitive match (fallback)
  const matchingKey = Object.keys(allIcons).find(
    (key) => key.toLowerCase() === iconName.toLowerCase()
  );
  if (matchingKey) {
    return allIcons[matchingKey];
  }

  // No match found
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

// Register all icons at module load (browser-safe)
const allIcons = getAllIcons();
Object.values(allIcons).forEach((icon) => {
  library.add(icon);
});
_allIcons = allIcons;

export function __setAllIconsForTest(
  icons: Record<string, IconDefinition> | null
) {
  _allIcons = icons;
}

export function getAllIconsAndRegister(): Record<string, IconDefinition> {
  // Now just return the cached icons
  return _allIcons!;
}

export function getAllIconsCached(): Record<string, IconDefinition> {
  if (!_allIcons) getAllIconsAndRegister();
  return _allIcons!;
}

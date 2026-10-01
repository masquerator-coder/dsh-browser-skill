/**
 * Local class-name join for the observation overlay.
 *
 * The upstream plugin imported `cn` from `@browser-skill/ui`, a private
 * workspace package that peers on react 19 while the dsh shell (and therefore
 * this client bundle, where react is external) runs react 18. Only the
 * class-joining half was ever used, so it lives here instead: no cross-repo
 * dependency, no second react, and the bundle stays buildable from this
 * repository alone.
 *
 * Later class-name arguments win for the same utility family, matching the
 * `tailwind-merge` behavior the components were written against; conflicting
 * utilities in one call are rare and always intentional (base + override).
 */

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | readonly ClassValue[]
  | Record<string, boolean | null | undefined>;

/** Flatten a class-value tree into a single space-separated string. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue): void => {
    if (value === null || value === undefined || value === false || value === "") return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) walk(item as ClassValue);
      return;
    }
    if (typeof value === "object") {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) out.push(key);
      }
    }
  };
  for (const input of inputs) walk(input);
  return out.join(" ");
}
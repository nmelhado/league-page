import { toLatin } from "./toLatin";

/**
 * Returns true when the character is leading; ie. when it's a capital or
 * when it's following a separator character. You might also want to test if
 * the character comes from an alphabet as you wouldn't want to consider a
 * space as a leading character.
 *
 * @param prevChar The character that appears before `char`
 * @param char The actual character you want to test
 * @returns Wether or not the character is leading
 */
export function isLeading(prevChar: string, char: string): boolean {
  const precededBySeparator =
    prevChar === "-" ||
    prevChar === "_" ||
    prevChar === " " ||
    prevChar === "." ||
    prevChar === "/" ||
    prevChar === "\\";

  const isCharLeading = char.toUpperCase() === char && /\w/.test(toLatin(char));

  return precededBySeparator || isCharLeading;
}

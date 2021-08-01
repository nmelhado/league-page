/**
 * Returns a normalized version of the string. This comes from
 * https://stackoverflow.com/a/37511463. It converts accented characters into
 * two UTF-8 characters (ie. `è` becomes e and `) and strip the accents.
 *
 * @param str The input string
 * @returns The input string without accents
 */
export function toLatin(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

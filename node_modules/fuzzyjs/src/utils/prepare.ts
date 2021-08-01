import { TestOptions } from "../test";

/**
 * This functions is used to throw when query or source is not defined as well
 * as normalizing and lower casing the input strings.
 *
 * @param query The fuzzy query string
 * @param source The fuzzy source string
 * @param opts An options object that can contains `caseSensitive`
 * @returns The reshaped query string and the reshaped source string.
 */
export function reshapeInput(
  query: string,
  source: string,
  opts: TestOptions
): [string, string] {
  if (typeof query !== "string") {
    throw new TypeError("Expecting query to be a string");
  }

  if (typeof source !== "string") {
    throw new TypeError("Expecting source to be a string");
  }

  let reshapedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let reshapedSource = source.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (!opts.caseSensitive) {
    reshapedQuery = reshapedQuery.toLowerCase();
    reshapedSource = reshapedSource.toLowerCase();
  }

  return [reshapedQuery, reshapedSource];
}

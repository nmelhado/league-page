import { MatchRange } from "./match";

export interface SurroundOptions {
  result: {
    ranges: MatchRange[];
  };
  prefix?: string;
  suffix?: string;
}

/**
 * Surround parts of the string that matched with prefix and suffix.
 * Useful to emphasize the parts that matched.
 */
export function surround(source: string, options: SurroundOptions): string {
  if (typeof source !== "string") {
    throw new TypeError("Expecting source to be a string");
  }

  if (source.length === 0) {
    return "";
  }

  if (!options?.result?.ranges?.length) {
    return source;
  }

  let result = source;
  let accumulator = 0;

  for (const range of options.result.ranges) {
    result = insertAt(result, range.start + accumulator, options.prefix);

    accumulator += (options.prefix ?? "").length;

    result = insertAt(result, range.stop + accumulator, options.suffix);

    accumulator += (options.suffix ?? "").length;
  }

  return result;
}

function insertAt(input: string, index: number, patch = ""): string {
  return input.slice(0, index) + patch + input.slice(index);
}

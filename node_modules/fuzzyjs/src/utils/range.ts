import { MatchRange } from "../match";

/**
 * Appends to an actual list of ranges a new match. This will only increment
 * the last [[MatchRange]] if the actual match and the last match were
 * siblings.
 *
 * @param ranges The previous ranges array
 * @param sourcePos The position in source that matched
 * @returns The new ranges array
 */
export function pushRange(
  ranges: MatchRange[],
  sourcePos: number
): MatchRange[] {
  const lastRange = ranges[ranges.length - 1];

  if (lastRange && lastRange.stop === sourcePos) {
    return [
      ...ranges.slice(0, -1),
      {
        start: lastRange.start,
        stop: sourcePos + 1,
      },
    ];
  } else {
    return [...ranges, { start: sourcePos, stop: sourcePos + 1 }];
  }
}

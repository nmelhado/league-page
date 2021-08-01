import { reshapeInput } from "./utils/prepare";
import { pushRange } from "./utils/range";
import { pushScore } from "./score/defaultStrategy";
import { isLeading } from "./utils/isLeading";

/**
 * This represents a Range that you can get if you call match with `withRanges`
 * set to true. It is composed of indexes of the source string that are matched
 * by the input string.
 */
export interface MatchRange {
  start: number;
  stop: number;
}

/**
 * This represents a score context that the scoring function will use to
 * compute the new score. It must include:
 *   - `currentScore` the actual score (ie. the result of the last `pushScore` call or 0)
 *   - `character` the actual source character. It must not be reshaped (ie. lower-cased or normalized)
 *   - `match` wether or not the actual source character is matched by the query
 *   - `leading` wether or not the actual source character is a leading character (as returned by the `isLeading` function)
 */
export interface ScoreContext {
  currentScore: number;
  character: string;
  match: boolean;
  leading: boolean;
}

/**
 * This represents the signature of the `pushScore` function. It requires the
 * previous context as long as the actual one (as we want to check for
 * concurrent matches), and returns the new score as a number.
 *
 * The scoring function is not returning a number from 0 to 1 but a whole
 * natural number.
 */
export type ScoreStrategy = (
  previousContext: ScoreContext | null,
  context: ScoreContext
) => number;

/**
 * Returns wether or not the query fuzzy matches the source
 */
export function match(
  query: string,
  source: string
): { match: boolean; ranges: MatchRange[]; score: number };
export function match(
  query: string,
  source: string,
  opts: { caseSensitive?: boolean }
): { match: boolean; ranges: MatchRange[]; score: number };
export function match(
  query: string,
  source: string,
  opts: { withScore?: true; caseSensitive?: boolean }
): { match: boolean; ranges: MatchRange[]; score: number };
export function match(
  query: string,
  source: string,
  opts: { withScore?: false; caseSensitive?: boolean }
): { match: boolean; ranges: MatchRange[] };
export function match(
  query: string,
  source: string,
  opts: {
    withScore?: boolean;
    caseSensitive?: boolean;
  } = { withScore: true }
): { match: boolean; score?: number; ranges: MatchRange[] } {
  const [reshapedQuery, reshapedSource] = reshapeInput(query, source, opts);

  const withScore = !(opts?.withScore === false);

  // if no source, then only return true if query is also empty
  if (reshapedSource.length === 0 || reshapedQuery.length === 0) {
    return {
      match: query.length === 0,
      ranges:
        query.length === 0 ? [{ start: 0, stop: reshapedSource.length }] : [],
      score: withScore ? (query.length === 0 ? 1 : 0) : undefined,
    };
  }

  // a bigger query than source will always return false
  if (reshapedQuery.length > reshapedSource.length) {
    return { match: false, ranges: [], score: withScore ? 0 : undefined };
  }

  let queryPos = 0;
  let sourcePos = 0;
  let score = 0;
  let lastContext: ScoreContext | undefined;
  let ranges: MatchRange[] = [];

  // loop on source string
  while (sourcePos < source.length) {
    const actualSourceCharacter = reshapedSource[sourcePos];
    const queryCharacterWaitingForMatch = reshapedQuery[queryPos];
    const match = actualSourceCharacter === queryCharacterWaitingForMatch;

    if (withScore) {
      // context does not use reshaped as uppercase changes score
      const previousCharacter = sourcePos > 0 ? source[sourcePos - 1] : "";

      const newContext: ScoreContext = {
        currentScore: score,
        character: source[sourcePos],
        match,
        leading: isLeading(previousCharacter, source[sourcePos]),
      };

      score = pushScore(lastContext, newContext);

      lastContext = newContext;
    }

    // if actual query character matches source character
    if (match) {
      // push range to result
      ranges = pushRange(ranges, sourcePos);

      // move query pos
      queryPos += 1;
    }

    sourcePos += 1;
  }

  if (queryPos === reshapedQuery.length) {
    return {
      match: true,
      ranges,
      score: withScore ? score : undefined,
    };
  }

  return {
    match: false,
    ranges: [],
    score: withScore ? 0 : undefined,
  };
}

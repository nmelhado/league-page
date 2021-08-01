import { ScoreContext } from "../match";

/**
 * Increments a context's score based on the context's values
 * This default strategy is based on
 * https://www.forrestthewoods.com/blog/reverse_engineering_sublime_texts_fuzzy_match/
 * A fuzzy matching scoring function should most of the time push a big score
 * when matching a leading letter (ie. a letter that is capital or comes
 * after a separator).
 *
 * @param previousContext The last context given to pushScore. undefined if first match
 * @param context The actual context
 * @returns The new score
 */
export function pushScore(
  previousContext: ScoreContext | undefined,
  context: ScoreContext
): number {
  if (!context) {
    throw new TypeError("Expecting context to be defined");
  }

  if (!context.match) {
    return context.currentScore - 1;
  }

  let increment = 0;

  if (previousContext && previousContext.match) {
    increment += 5;
  }

  if (context.leading) {
    increment += 10;
  }

  return context.currentScore + increment;
}

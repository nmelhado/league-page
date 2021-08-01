import { test, TestOptions } from "./test";
import { match } from "./match";

export type ItemIterator<TItem> = (source: TItem) => string;

export interface FilterOptions<TItem> extends TestOptions {
  iterator: ItemIterator<TItem>;
}

export interface SortOptions<TItem> extends TestOptions {
  iterator: ItemIterator<TItem>;
}

type FilterIterator<TItem> = (item: TItem) => boolean;
type SortIterator<TItem> = (leftItem: TItem, rightItem: TItem) => number;

/**
 * This array helper can be used as an `Array.prototype.filter` callback as it
 * will return true or false when passing it a source string.
 */
export function filter<TItem>(
  query: string,
  options: FilterOptions<TItem>
): FilterIterator<TItem> {
  return function (item) {
    const source = options.iterator(item);
    return test(query, source, options);
  };
}

/**
 * This array helper can be used as an `Array.prototype.sort` callback as it
 * will return `-1`/`0`/`1` when passing it two source strings.
 */
export function sort<TItem>(
  query: string,
  options: SortOptions<TItem>
): SortIterator<TItem> {
  const cacheMap: Map<string, number> = new Map();

  return (leftItem, rightItem) => {
    const leftSource = options.iterator(leftItem);
    const rightSource = options.iterator(rightItem);

    const cachedLeftMatch = cacheMap.get(leftSource);
    const cachedRightMatch = cacheMap.get(rightSource);

    const leftScore = cachedLeftMatch
      ? cachedLeftMatch
      : match(query, leftSource, {
          withScore: true,
          caseSensitive: options.caseSensitive,
        }).score;

    const rightScore = cachedRightMatch
      ? cachedRightMatch
      : match(query, rightSource, {
          withScore: true,
          caseSensitive: options.caseSensitive,
        }).score;

    if (!cacheMap.has(leftSource)) {
      cacheMap.set(leftSource, leftScore);
    }

    if (!cacheMap.has(rightSource)) {
      cacheMap.set(rightSource, rightScore);
    }

    if (rightScore === leftScore) {
      return 0;
    }

    return rightScore > leftScore ? 1 : -1;
  };
}

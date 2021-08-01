# fuzzyjs

![NPM](https://img.shields.io/npm/l/@gjuchault/typescript-library-starter)
![NPM](https://img.shields.io/npm/v/@gjuchault/typescript-library-starter)
![GitHub Workflow Status](https://github.com/gjuchault/typescript-library-starter/actions/workflows/typescript-library-starter.yml/badge.svg?branch=main)

fuzzyjs is a fuzzy search algorithm in javascript.

## Usage

**`test`**

Tests a query against a source using fuzzy matching

```ts
import { test } from "fuzzyjs";

test("ssjs", "Set Syntax: JavaScript");
true;
```

```ts
function test(query: string, source: string, opts?: TestOptions): boolean;

type TestOptions = {
  caseSensitive?: boolean; // (default: false)
};
```

**`match`**

Matches a query against a source using fuzzy matching, returns information about the result

```ts
import { match } from 'fuzzyjs'

match('ssjav', 'Set Syntax: JavaScript')
{
  match: true,
  score: 22,
  ranges: [
    { start: 0, stop: 1 },
    { start: 4, stop: 5 },
    { start: 12, stop: 15 }
  ]
}
```

```ts
function match(query: string, source: string, opts?: MatchOptions): MatchResult;

type MatchOptions = {
  caseSensitive?: boolean;
  strategy?: ScoreStrategy; // (default: defaultStrategy, see below)
  withScore?: boolean; // (default: true)
};

type MatchResult = {
  match: boolean;
  score: number; // only if `withScore` is true, else undefined
  ranges: MatchRange[];
};
```

## Utilities

**`surround`**

Surround parts of the string that matched with prefix and suffix

```ts
import { match, surround } from "fuzzyjs";

const result = match("ssjav", "Set Syntax: JavaScript");

surround("Set Syntax: JavaScript", {
  result,
  prefix: "<strong>",
  suffix: "</strong>",
});
("<strong>S</strong>et <strong>S</strong>yntax: <strong>Jav</strong>aScript");
```

```ts
function surround(source: string, options: SurroundOptions): string;

type SurroundOptions = {
  result: {
    ranges: MatchRange[];
  };
  prefix?: string; // (default: '')
  suffix?: string; // (default: '')
};
```

**`filter`**

Can be used as a [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) callback.

```ts
import { filter as fuzzy } from "fuzzyjs";

const sources = [
  "Set Syntax: JavaScript",
  "Set Syntax: CSS",
  "Set Syntax: HTML",
];

sources.filter(fuzzy("ssjs", { iterator: (item) => item }));
["Set Syntax: JavaScript"];

const sources = [
  { name: { foo: "Set Syntax: JavaScript" } },
  { name: { foo: "Set Syntax: CSS" } },
  { name: { foo: "Set Syntax: HTML" } },
];

sources.filter(fuzzy("ssjs", { iterator: (source) => source.name.foo }));
[{ name: { foo: "Set Syntax: JavaScript" } }];
```

```ts
function filter<TItem>(
  query: string,
  options: FilterOptions<TItem>
): (source: TItem) => boolean;

type FilterOptions<TItem> = {
  caseSensitive?: boolean;
  iterator: (source: TItem) => string;
};
```

**`sort`**

Can be used as a [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) callback.
If you have a large array of objects, you might want to pass `idAccessor` as it creates a [memoization](https://en.wikipedia.org/wiki/Memoization) table which reduces drastically how many times the fuzzy matching algorithm will be called.

```ts
import { sort as fuzzy } from "fuzzyjs";

const sources = [
  "Set Syntax: CSS",
  "Set Syntax: HTML",
  "Set Syntax: JavaScript",
];

sources.sort(fuzzy("ssjs", { iterator: (item) => item }));
[("Set Syntax: JavaScript", "Set Syntax: CSS", "Set Syntax: HTML")];

const sources = [
  { name: { id: 0, foo: "Set Syntax: CSS" } },
  { name: { id: 1, foo: "Set Syntax: HTML" } },
  { name: { id: 2, foo: "Set Syntax: JavaScript" } },
];

sources.sort(fuzzy("ssjs", { iterator: (source) => source.name.foo }));
[
  { name: { id: 2, foo: "Set Syntax: JavaScript" } },
  { name: { id: 0, foo: "Set Syntax: CSS" } },
  { name: { id: 1, foo: "Set Syntax: HTML" } },
];
```

```ts
function sort<TItem>(
  query: string,
  options?: SortOptions<TItem>
): (leftSource: TItem, rightSource: TItem) => 0 | 1 | -1;

type SortOptions<TItem> = {
  caseSensitive?: boolean;
  iterator: (item: TItem) => string;
};
```

## Scoring function

A scoring function is a function that given two context, returns a number (either positive or negative) that will be added the the match score.

A leading character is a character that matters more than others.
These are made of capitals and letters following `-_ ./\`.

```ts
function pushScore(
  previousContext: ScoreContext | undefined,
  context: ScoreContext
): number;

type ScoreContext = {
  currentScore: number; // the current match score
  character: string; // the current character
  match: boolean; // is the character matching the source string
  leading: boolean; // is the character leading
};
```

Link to default strategy: [here](./src/score/defaultStrategy.ts).

## License

fuzzyjs is licensed under MIT License.

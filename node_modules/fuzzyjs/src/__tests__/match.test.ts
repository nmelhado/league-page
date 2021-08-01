/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import test from "ava";
import { match } from "../match";

test("given an invalid query", (t) => {
  t.throws(
    () => match(null as any, "foo"),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match(1 as any, "foo"),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match(NaN as any, "foo"),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match(undefined as any, "foo"),
    { instanceOf: TypeError },
    "throws a TypeError"
  );

  t.throws(
    () => match("foo", null as any),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match("foo", 1 as any),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match("foo", NaN as any),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
  t.throws(
    () => match("foo", undefined as any),
    { instanceOf: TypeError },
    "throws a TypeError"
  );
});

test("given no query", (t) => {
  t.deepEqual(
    match("", "anything"),
    { match: true, ranges: [{ start: 0, stop: 8 }], score: 1 },
    "it returns a truthy match"
  );

  t.like(
    match("", "anything", { withScore: false }),
    { match: true, ranges: [{ start: 0, stop: 8 }] },
    "it returns a truthy match"
  );
});

test("given no source provided", (t) => {
  t.deepEqual(
    match("foo", ""),
    { match: false, ranges: [], score: 0 },
    "it returns a falsy match"
  );

  t.deepEqual(
    match("", ""),
    { match: true, ranges: [{ start: 0, stop: 0 }], score: 1 },
    "unless the two strings are empty"
  );
});

test("given a query bigger than source", (t) => {
  t.deepEqual(match("foo", "f"), { match: false, ranges: [], score: 0 });
  t.like(match("foo", "f", { withScore: false }), {
    match: false,
    ranges: [],
  });
});

test("given a query matching the source", (t) => {
  t.deepEqual(
    match("abc", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 13,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
        { start: 13, stop: 14 },
      ],
    },
    "it returns a truthy match"
  );
  t.deepEqual(
    match("abc", "apple banana caramel", {
      withScore: true,
    }),
    {
      match: true,
      score: 3,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
        { start: 13, stop: 14 },
      ],
    },
    "it returns a truthy match"
  );
  t.deepEqual(
    match("abc", "abc", { withScore: true }),
    {
      match: true,
      score: 10,
      ranges: [{ start: 0, stop: 3 }],
    },
    "it returns a truthy match"
  );
  t.like(
    match("abc", "Apple Banana Caramel", { withScore: false }),
    {
      match: true,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
        { start: 13, stop: 14 },
      ],
    },
    "it returns a truthy match"
  );

  t.deepEqual(
    match("a", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: -9,
      ranges: [{ start: 0, stop: 1 }],
    },
    "uses a correct scoring algorithm 1"
  );
  t.deepEqual(
    match("ab", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 2,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
      ],
    },
    "uses a correct scoring algorithm 2"
  );
  t.deepEqual(
    match("abc", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 13,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
        { start: 13, stop: 14 },
      ],
    },
    "uses a correct scoring algorithm 3"
  );
  t.deepEqual(
    match("apbaca", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 31,
      ranges: [
        { start: 0, stop: 2 },
        { start: 6, stop: 8 },
        { start: 13, stop: 15 },
      ],
    },
    "uses a correct scoring algorithm 4"
  );
  t.deepEqual(
    match("ap ba car", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 49,
      ranges: [
        { start: 0, stop: 2 },
        { start: 5, stop: 8 },
        { start: 12, stop: 16 },
      ],
    },
    "uses a correct scoring algorithm 5"
  );
  t.deepEqual(
    match("appbancar", "Apple Banana Caramel", { withScore: true }),
    {
      match: true,
      score: 49,
      ranges: [
        { start: 0, stop: 3 },
        { start: 6, stop: 9 },
        { start: 13, stop: 16 },
      ],
    },
    "uses a correct scoring algorithm 6"
  );
});

test("given a query with caseSensitive option", (t) => {
  t.deepEqual(
    match("abc", "Apple Banana Caramel", { caseSensitive: true }),
    {
      match: false,
      ranges: [],
      score: 0,
    },
    "it returns a truthy match when the query matches the source"
  );

  t.deepEqual(
    match("abc", "apple banana caramel", { caseSensitive: true }),
    {
      match: true,
      ranges: [
        { start: 0, stop: 1 },
        { start: 6, stop: 7 },
        { start: 13, stop: 14 },
      ],
      score: 3,
    },
    "it returns a falsy match otherwise"
  );
});

test("given a non-matching query", (t) => {
  t.deepEqual(
    match("abc", "foobar"),
    { match: false, ranges: [], score: 0 },
    "it returns a falsy match"
  );
  t.like(
    match("abc", "foobar", { withScore: false }),
    {
      match: false,
      ranges: [],
    },
    "it returns a falsy match"
  );
});

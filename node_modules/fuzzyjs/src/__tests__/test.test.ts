/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import test from "ava";
import { test as fuzzyjsTest } from "../test";

test("given an invalid query", (t) => {
  t.throws(
    () => fuzzyjsTest(null as any, "foo"),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest(1 as any, "foo"),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest(NaN as any, "foo"),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest(undefined as any, "foo"),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );

  t.throws(
    () => fuzzyjsTest("foo", null as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest("foo", 1 as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest("foo", NaN as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => fuzzyjsTest("foo", undefined as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
});

test("given no query", (t) => {
  t.is(fuzzyjsTest("", "anything"), true, "it returns true");
});

test("given no source provided", (t) => {
  t.is(fuzzyjsTest("foo", ""), false, "it returns false");
  t.is(fuzzyjsTest("", ""), true, "it unless both strings are empty");
});

test("given a query bigger than source", (t) => {
  t.is(fuzzyjsTest("foo", "f"), false, "it returns false");
});

test("given a query matching the source", (t) => {
  t.is(fuzzyjsTest("abc", "Apple Banana Caramel"), true, "it returns true");
  t.is(fuzzyjsTest("abc", "apple banana caramel"), true, "it returns true");
  t.is(fuzzyjsTest("abc", "abc"), true, "it returns true");
});

test("given a query with caseSensitive option", (t) => {
  t.is(
    fuzzyjsTest("abc", "apple banana caramel", { caseSensitive: true }),
    true,
    "it returns true when the query matches the source"
  );

  t.is(
    fuzzyjsTest("abc", "Apple Banana Caramel", { caseSensitive: true }),
    false,
    "it returns false otherwise"
  );
});

test("given a non-ASCII query and an ASCII source", (t) => {
  t.is(
    fuzzyjsTest("föÔ", "foo"),
    true,
    "it returns true when the query matches the source"
  );

  t.is(fuzzyjsTest("föÔ", "foz"), false, "it returns false otherwise");
});

test("given an ASCII query and a non-ASCII source", (t) => {
  t.is(
    fuzzyjsTest("foo", "föÔ"),
    true,
    "it returns true when the query matches the source"
  );

  t.is(fuzzyjsTest("foz", "föÔ"), false, "it returns false otherwise");
});

test("given a non-ASCII query and a non-ASCII source", (t) => {
  t.is(
    fuzzyjsTest("fôö", "föô"),
    true,
    "it returns true when the query matches the source"
  );
});

test("Issue #28 - given caseSensitive to true and a non-ASCII query", (t) => {
  t.is(
    fuzzyjsTest("e", "é", { caseSensitive: true }),
    true,
    "should match when the query matches the source"
  );
});

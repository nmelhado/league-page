/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import test from "ava";
import { surround } from "../surround";

test("given an invalid source", (t) => {
  t.throws(
    () => surround(1 as any, null as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => surround(null as any, null as any),
    {
      instanceOf: TypeError,
    },
    "it throws a TypeError"
  );
});

test("given an empty source", (t) => {
  t.is(
    surround("", null as any),
    "",
    "it returns an empty result whatever the options are"
  );
  t.is(
    surround("", {} as any),
    "",
    "it returns an empty result whatever the options are"
  );
});

test("given an invalid result", (t) => {
  t.is(surround("foo", null as any), "foo", "it returns the input");
  t.is(surround("foo", { result: null as any }), "foo", "it returns the input");
});

test("given an empty range set", (t) => {
  t.is(
    surround("foo", { result: {} as any, prefix: "<" }),
    "foo",
    "it returns the input"
  );
  t.is(
    surround("foo", { result: { ranges: [] }, prefix: "<" }),
    "foo",
    "it returns the input"
  );
});

test("given a source and a range set", (t) => {
  t.is(
    surround("foo bar", {
      result: {
        ranges: [
          { start: 0, stop: 1 },
          { start: 4, stop: 6 },
        ],
      },
      prefix: "<strong>",
      suffix: "</strong>",
    }),
    "<strong>f</strong>oo <strong>ba</strong>r",
    "it returns the surrounded result"
  );

  t.is(
    surround("foo bar", {
      result: {
        ranges: [
          { start: 0, stop: 1 },
          { start: 4, stop: 6 },
        ],
      },
      prefix: "*",
    }),
    "*foo *bar",
    "it returns the surrounded result"
  );

  t.is(
    surround("foo bar", {
      result: {
        ranges: [
          { start: 0, stop: 1 },
          { start: 4, stop: 6 },
        ],
      },
      suffix: "*",
    }),
    "f*oo ba*r",
    "it returns the surrounded result"
  );
});

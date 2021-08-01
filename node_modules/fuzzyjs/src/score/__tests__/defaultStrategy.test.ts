/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import test from "ava";
import { pushScore } from "../defaultStrategy";

test("given an invalid context", (t) => {
  t.throws(
    () => pushScore(undefined as any, undefined as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
  t.throws(
    () => pushScore(null, null as any),
    { instanceOf: TypeError },
    "it throws a TypeError"
  );
});

test("given a non-matching context", (t) => {
  t.is(
    pushScore(null, {
      currentScore: 0,
      match: false,
      character: "f",
      leading: false,
    }),
    -1,
    "it returns a decreased score"
  );
});

test("given a matching context", (t) => {
  t.is(
    pushScore(null, {
      currentScore: 0,
      match: true,
      character: "f",
      leading: false,
    }),
    0,
    "it returns the same score"
  );
});

test("given a matching leading context", (t) => {
  t.is(
    pushScore(null, {
      currentScore: 0,
      match: true,
      character: "F",
      leading: true,
    }),
    10,
    "it returns an increased score"
  );
});

test("given a previous context with a consecutive match", (t) => {
  t.is(
    pushScore(
      {
        currentScore: 0,
        match: true,
        character: "f",
        leading: false,
      },
      {
        currentScore: 0,
        match: true,
        character: "f",
        leading: false,
      }
    ),
    5,
    "it returns an increased score"
  );
});

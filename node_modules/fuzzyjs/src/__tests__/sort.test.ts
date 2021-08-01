import test from "ava";
import { sort } from "../array";

test("given a query and no idAccessor", (t) => {
  const sources = [
    "Set Syntax: HTML",
    "Set Syntax: css",
    "Set Syntax: JavaScript",
  ];

  t.deepEqual(
    sources.sort(sort("sss", { iterator: (item) => item })),
    ["Set Syntax: JavaScript", "Set Syntax: css", "Set Syntax: HTML"],
    "should return an Array.prototype compatible callback, non optimized"
  );
});

test("given a query and an idAccessor options", (t) => {
  const sources = [
    { id: "Set Syntax: Rust" },
    { id: "Set Syntax: HTML" },
    { id: "Set Syntax: css" },
    { id: "Set Syntax: JavaScript" },
    { id: "Set Syntax: YAML" },
    { id: "Set Syntax: C++" },
    { id: "Set Syntax: Diff" },
    { id: "Set Syntax: Rust" },
  ];

  t.deepEqual(
    sources.sort(sort("sss", { iterator: (source) => source.id })),
    [
      { id: "Set Syntax: JavaScript" },
      { id: "Set Syntax: css" },
      { id: "Set Syntax: Rust" },
      { id: "Set Syntax: Rust" },
      { id: "Set Syntax: HTML" },
      { id: "Set Syntax: YAML" },
      { id: "Set Syntax: C++" },
      { id: "Set Syntax: Diff" },
    ],
    "should return an Array.prototype compatible callback, optimized"
  );

  t.deepEqual(
    sources.sort(
      sort("sss", {
        iterator: (source) => source.id,
      })
    ),
    [
      { id: "Set Syntax: JavaScript" },
      { id: "Set Syntax: css" },
      { id: "Set Syntax: Rust" },
      { id: "Set Syntax: Rust" },
      { id: "Set Syntax: HTML" },
      { id: "Set Syntax: YAML" },
      { id: "Set Syntax: C++" },
      { id: "Set Syntax: Diff" },
    ],
    "should return an Array.prototype compatible callback, optimized"
  );
});

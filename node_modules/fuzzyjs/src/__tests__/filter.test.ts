import test from "ava";
import { filter } from "../array";

test("given a query", (t) => {
  const sources = [
    "Set Syntax: JavaScript",
    "Set Syntax: CSS",
    "Set Syntax: HTML",
  ];

  t.deepEqual(
    sources.filter(filter("ssjs", { iterator: (item) => item })),
    [sources[0]],
    "it returns a Array.prototype compatible callback"
  );
  t.deepEqual(
    sources.filter(
      filter("ssjs", { iterator: (item) => item, caseSensitive: true })
    ),
    [],
    "it returns a Array.prototype compatible callback"
  );
  t.deepEqual(
    sources.filter(
      filter("SSJS", { iterator: (item) => item, caseSensitive: true })
    ),
    [sources[0]],
    "it returns a Array.prototype compatible callback"
  );
});

test("given a query and a sourceAccessor", (t) => {
  const sources = [
    { foo: { name: "Set Syntax: JavaScript" } },
    { foo: { name: "Set Syntax: CSS" } },
    { foo: { name: "Set Syntax: HTML" } },
  ];

  t.deepEqual(
    sources.filter(filter("ssjs", { iterator: (source) => source.foo.name })),
    [sources[0]],
    "it returns an Array.prototype compatible callback"
  );
  t.deepEqual(
    sources.filter(
      filter("ssjs", {
        caseSensitive: true,
        iterator: (source) => source.foo.name,
      })
    ),
    [],
    "it returns an Array.prototype compatible callback"
  );
  t.deepEqual(
    sources.filter(
      filter("SSJS", {
        caseSensitive: true,
        iterator: (source) => source.foo.name,
      })
    ),
    [sources[0]],
    "it returns an Array.prototype compatible callback"
  );
});

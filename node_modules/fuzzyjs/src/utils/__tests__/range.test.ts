import test from "ava";
import { pushRange } from "../range";

test("given an empty match range and a position", (t) => {
  const source = [];
  const result = pushRange(source, 5);

  t.deepEqual(result, [{ start: 5, stop: 6 }], "it pushes the position");
});

test("given a match range and a position", (t) => {
  const source = [{ start: 0, stop: 1 }];
  const result = pushRange(source, 5);

  t.deepEqual(
    result,
    [
      { start: 0, stop: 1 },
      { start: 5, stop: 6 },
    ],
    "it pushes the position"
  );
});

test("given a match range nearby and a position", (t) => {
  const source = pushRange([], 4);
  const result = pushRange(source, 5);

  t.deepEqual(
    result,
    [{ start: 4, stop: 6 }],
    "it pushes the previous position's stop property"
  );
});

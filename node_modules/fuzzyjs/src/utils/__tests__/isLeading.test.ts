import test from "ava";
import { isLeading } from "../isLeading";

test("given a leading character", (t) => {
  t.is(isLeading("f", "L"), true, "it returns true");
  t.is(isLeading("f", "É"), true, "it returns true");
});

test("given a non-leading character", (t) => {
  t.is(isLeading("f", "f"), false, "it returns false");
  t.is(isLeading("f", " "), false, "it returns false");
  t.is(isLeading("f", "-"), false, "it returns false");
});

test("given a character following a separator", (t) => {
  t.is(isLeading("-", "f"), true, "it returns true");
});

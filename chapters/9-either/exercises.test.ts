import { expect, test } from "vitest";
import { ch9_q1, ch9_q2 } from "./exercises";
import path from "path";
import { identity, pipe } from "fp-ts/lib/function";
import { either } from "fp-ts";

test("Ch9 Q1", () => {
  expect(
    pipe(ch9_q1(path.dirname(__dirname) + "/9-either/some-file.md"), either.isRight),
  ).toBeTruthy();

  expect(
    pipe(ch9_q1(path.dirname(__dirname) + "/9-either/some-nonexistent-file.md"), either.isLeft),
  ).toBeTruthy();

  expect(
    pipe(
      ch9_q1(path.dirname(__dirname) + "/9-either/some-nonexistent-file.md"),
      either.matchW(identity, identity),
    ),
  ).toStrictEqual(new Error("something went wrong"));
});

test("Ch9 Q2", () => {
  expect(
    pipe(
      ch9_q2([
        path.dirname(__dirname) + "/9-either/some-file.md",
        path.dirname(__dirname) + "/9-either/some-other-file.md",
      ]),
      either.isRight,
    ),
  ).toBeTruthy();

  expect(
    pipe(
      ch9_q2([
        path.dirname(__dirname) + "/9-either/some-file.md",
        path.dirname(__dirname) + "/9-either/some-other-file.md",
        path.dirname(__dirname) + "/9-either/some-nonexistent-file.md",
      ]),
      either.isLeft,
    ),
  ).toBeTruthy;

  expect(
    pipe(
      ch9_q2([
        path.dirname(__dirname) + "/9-either/some-file.md",
        path.dirname(__dirname) + "/9-either/some-other-file.md",
        path.dirname(__dirname) + "/9-either/some-nonexistent-file.md",
      ]),
      either.matchW(identity, identity),
    ),
  ).toStrictEqual(new Error("something went wrong"));
});

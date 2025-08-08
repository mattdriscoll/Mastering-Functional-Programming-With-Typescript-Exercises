import path from "path";
import { expect, test } from "vitest";
import { ch11_q2, ch11_q3 } from "./exercises";
import { ioOption, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

test("Ch11 Q2", () => {
  expect(ch11_q2()).toBeOneOf([option.of("matt@mbp"), option.none]);
});

test("Ch11 Q3", () => {
  const res = ch11_q3([
    path.dirname(__dirname) + "/11-ioOption/exercises.ts",
    path.dirname(__dirname) + "/11-ioOption/exercises.test.ts",
  ]);

  expect(res()).not.toBe(ioOption.none);

  expect(
    pipe(
      res,
      ioOption.getOrElse(() => () => 0),
    )(),
  ).toBeGreaterThan(1);

  expect(
    pipe(
      res(),
      option.getOrElse(() => 0),
    ),
  ).toBeGreaterThan(1);
});

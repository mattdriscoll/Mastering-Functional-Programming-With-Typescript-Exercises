import os from "os";
import { option, ioOption } from "fp-ts";
import { expect, expectTypeOf, test } from "vitest";
import { ch11_q1, ch11_q2, ch11_q3 } from "./exercises";
import { pipe } from "fp-ts/lib/function";

test("Ch11 Q1", () => {
  const test1 = ch11_q1("hello");
  const test2 = ch11_q1(null);

  expectTypeOf(test1).toBeFunction();
  expect(test1()).toStrictEqual(option.of("HELLO!HELLO!"));
  expect(test2()).toStrictEqual(option.none);
});

test("Ch11 Q2", () => {
  expect(ch11_q2()).toStrictEqual(ioOption.of("mattdriscoll@localhost")());
});

test("Ch11 Q3", () => {
  const homedir = os.homedir();
  const chaptersPath = process.env.CHAPTERS_PATH;
  const filePath = homedir.concat(chaptersPath || "");
  const app = ch11_q3([
    filePath.concat("/11-IOOption/exercises.ts"),
    // filePath.concat("/11-IOOption/11-IOOption.ts"),
    filePath.concat("/11-IOOption/exercises.test.ts"),
  ]);

  const res = pipe(
    app,
    ioOption.getOrElseW(() => () => "error"),
  );

  expect(app()).toHaveProperty("value");
  expect(res()).toBeTypeOf("number");
  expect(res()).toBeGreaterThan(10);

  expect(ch11_q3(["file-does-not-exist.tsjs"])()).toEqual(option.none);
});

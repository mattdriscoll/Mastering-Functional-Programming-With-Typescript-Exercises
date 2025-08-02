import { expect, test } from "vitest";
import { ch10_q1, ch10_q2, ch10_q3 } from "./exercises";

test("Ch10 Q1", () => {
  const res = ch10_q1(new Date());

  expect(res).toBeTypeOf("function");
  expect(res()).toBeTypeOf("undefined");
});

test("Ch10 Q2", () => {
  const res = ch10_q2(new Date());

  expect(res).toBeTypeOf("function");
  expect(res()).toBeTypeOf("undefined");
});

test("Ch10 Q2", () => {
  expect(ch10_q3(2)).toBeTypeOf("function");
  expect(ch10_q3(2)()).toHaveLength(2);
  expect(ch10_q3(30)()).toHaveLength(30);
});

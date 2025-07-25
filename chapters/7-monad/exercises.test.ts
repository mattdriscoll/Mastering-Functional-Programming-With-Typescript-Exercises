import { expect, test } from "vitest";
import { ch7_q1, ch7_q2, ch7_q3 } from "./exercises";

test("Ch7 Q1", () => {
  expect(ch7_q1(new Set([1]))).toStrictEqual(new Set([1, 2]));
  expect(ch7_q1(new Set([1, 2]))).toStrictEqual(new Set([1, 2, 4]));
  expect(ch7_q1(new Set([1, 2, 3]))).toStrictEqual(new Set([1, 2, 3, 4, 6]));
  expect(ch7_q1(new Set([1, 2, 3, 4]))).toStrictEqual(new Set([1, 2, 3, 4, 6, 8]));
  expect(ch7_q1(new Set([1, 2, 3, 4, 5]))).toStrictEqual(new Set([1, 2, 3, 4, 5, 6, 8, 10]));
  expect(ch7_q1(new Set([1, 2, 3, 4, 5, 200]))).toStrictEqual(
    new Set([1, 2, 3, 4, 5, 6, 8, 10, 200, 400]),
  );
});

test("Ch7 Q2", () => {
  expect(ch7_q2(new Set([1]))).toStrictEqual(new Set([1, 2, 4]));
  expect(ch7_q2(new Set([1, 2]))).toStrictEqual(new Set([1, 2, 4, 8]));
  expect(ch7_q2(new Set([1, 2, 3]))).toStrictEqual(new Set([1, 2, 3, 4, 6, 8, 12]));
  expect(ch7_q2(new Set([1, 2, 3, 4]))).toStrictEqual(new Set([1, 2, 3, 4, 6, 8, 12, 16]));
  expect(ch7_q2(new Set([1, 2, 3, 4, 10]))).toStrictEqual(
    new Set([1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 40]),
  );
  expect(ch7_q2(new Set([1, 2, 3, 4, 10, 60, 100]))).toStrictEqual(
    new Set([1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 40, 60, 100, 120, 200, 240, 400]),
  );
});

test("Ch7 Q3", () => {
  expect(ch7_q3(() => 4)()).toBe(20);
  expect(ch7_q3(() => 8)()).toBe(40);
  expect(ch7_q3(() => 18)()).toBe(90);
  expect(ch7_q3(() => 73)()).toBe(365);
  expect(ch7_q3(() => 42563)()).toBe(212815);
});

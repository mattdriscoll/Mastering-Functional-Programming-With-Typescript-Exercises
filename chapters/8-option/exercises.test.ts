import { expect, test } from "vitest";
import { ch8_q1, ch8_q2, ch8_q3, ch8_q4, ch8_q5 } from "./exercises";
import { option } from "fp-ts";

test("Ch8 Q1", () => {
  expect(option.toNullable(ch8_q1(109))).toBeTruthy();
  expect(option.toNullable(ch8_q1(1))).toBeTruthy();
  expect(option.toNullable(ch8_q1(-1))).toBeFalsy();
  expect(option.toNullable(ch8_q1("NaN"))).toBeFalsy();
  expect(option.toNullable(ch8_q1(true))).toBeFalsy();
  expect(option.toNullable(ch8_q1(false))).toBeFalsy();
});

test("Ch8 Q2", () => {
  expect(ch8_q2(431, "$")).toBe("$431");
  expect(ch8_q2(327)).toBe("$327");
  expect(ch8_q2(80, "£")).toBe("£80");
  expect(ch8_q2()).toBe("-");
});

test("Ch8 Q3", () => {
  expect(ch8_q3(5_000, 0.09)).toBe("$37.5");
  expect(ch8_q3(35_000, 0.12)).toBe("$350");
  expect(ch8_q3()).toBeNull();
  expect(ch8_q3(undefined)).toBeNull();
  expect(ch8_q3(0)).toBeNull();
  expect(ch8_q3(0, 230)).toBe("$0");
  expect(ch8_q3(0, 0)).toBe("$0");
});

test("Ch8 Q4", () => {
  expect(option.toNullable(ch8_q4(4, 1))).toBe(4);
  expect(option.toNullable(ch8_q4(4, 2))).toBe(2);
  expect(option.toNullable(ch8_q4(9, 3))).toBe(3);
  expect(option.toNullable(ch8_q4(9, 0))).toBe(null);
  expect(option.toNullable(ch8_q4(0, 9))).toBe(0);
});

test("Ch8 Q5", () => {
  expect(option.toNullable(ch8_q5([2, 4]))).toStrictEqual([1, 0.5, 2, 1]);
  expect(option.toNullable(ch8_q5([2, 8]))).toStrictEqual([1, 0.25, 4, 1]);
  expect(option.toNullable(ch8_q5([8, 16]))).toStrictEqual([1, 0.5, 2, 1]);
  expect(option.toNullable(ch8_q5([8, 16, 32]))).toStrictEqual([1, 0.5, 0.25, 2, 1, 0.5, 4, 2, 1]);
  expect(option.toNullable(ch8_q5([2, 4, 8, 16]))).toStrictEqual([
    1, 0.5, 0.25, 0.125, 2, 1, 0.5, 0.25, 4, 2, 1, 0.5, 8, 4, 2, 1,
  ]);
  expect(option.toNullable(ch8_q5([2, 8, 0]))).toBeNull;
  expect(option.toNullable(ch8_q5([2, 4, 8, 16, 32, 0]))).toBeNull;
});

import * as O from "fp-ts/lib/Option";
import { expect, test } from "vitest";
import { ch8_q1, ch8_q2, ch8_q3, ch8_q4 } from "./exercises";

test("Ch8 Q1", () => {
  expect(ch8_q1(123)).toStrictEqual(O.some(123));
  expect(ch8_q1(0)).toStrictEqual(O.some(0));
  expect(ch8_q1(-123)).toStrictEqual(O.none);
  expect(ch8_q1(-1)).toBe(O.none);
});

test("Ch8 Q2", () => {
  expect(ch8_q2(8923, "$")).toBe("$8923.00");
  expect(ch8_q2(923.4)).toBe("$923.40");
  expect(ch8_q2(-923.646433, "€")).toBe("-€923.65");
  expect(ch8_q2(64, "£")).toBe("£64.00");
  expect(ch8_q2(-64, "£")).toBe("-£64.00");
});

test("Ch8 Q3", () => {
  expect(ch8_q3(100_000, 0.7)).toBe("$5833.33");
  expect(ch8_q3(1_285_000, 0.5)).toBe("$53541.67");
  expect(ch8_q3(-1_285_000, 0.5)).toBe("-");
  expect(ch8_q3(1_285_000, -0.5)).toBe("-");
  expect(ch8_q3(-1_285_000, -0.5)).toBe("-");
  expect(ch8_q3(Infinity, -Infinity)).toBe("-");
  expect(ch8_q3(100_000)).toBe("-");
  expect(ch8_q3(undefined, undefined)).toBe("-");
  expect(ch8_q3(null, null)).toBe("-");
  expect(ch8_q3(null)).toBe("-");
});

test("Ch8 Q4", () => {
  expect(ch8_q4(5)(50)).toStrictEqual(O.some(50 / 5));
  expect(ch8_q4(0)(50)).toStrictEqual(O.none);
  expect(ch8_q4(6)(60)).toStrictEqual(O.some(10));
  expect(ch8_q4(0)(60)).toStrictEqual(O.none);
  expect(ch8_q4(-3)(60)).toStrictEqual(O.some(-20));
  expect(ch8_q4(-0)(60)).toStrictEqual(O.none);
  expect(ch8_q4(-0.5323)(60)).toStrictEqual(O.some(-60 / 0.5323));
});

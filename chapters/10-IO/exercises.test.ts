import { expect, expectTypeOf, test } from "vitest";
import {
  ch10_q3,
  dayToString,
  getNthOccuranceInMonth,
  monthToString,
  monthToUpper,
  numToOrdinal,
  toUpper,
} from "./exercises";

test("Ch10 Q1", () => {
  // Impure function that is difficult to test!!
  // The output changes every day
  // expect(ch10_q1()).toBe("MONDAY");

  // It is *MUCH* easier to individually test the underlying deterministic
  // functions that the IO implements:
  expect(dayToString(0)).toBe("sunday");
  expect(dayToString(1)).toBe("monday");
  expect(dayToString(2)).toBe("tuesday");
  expect(dayToString(3)).toBe("wednesday");
  expect(dayToString(4)).toBe("thursday");
  expect(dayToString(5)).toBe("friday");
  expect(dayToString(6)).toBe("saturday");
  expect(dayToString(7)).toBe("day not recognized");
  expect(dayToString(10)).toBe("day not recognized");
  expect(dayToString(13)).toBe("day not recognized");
  expect(dayToString(16)).toBe("day not recognized");
  expect(dayToString(19)).toBe("day not recognized");
  expect(dayToString(22)).toBe("day not recognized");
  expect(dayToString(25)).toBe("day not recognized");
  expect(dayToString(28)).toBe("day not recognized");
  expect(dayToString(31)).toBe("day not recognized");
  expect(dayToString(34)).toBe("day not recognized");
  expect(dayToString(37)).toBe("day not recognized");
  expect(dayToString(40)).toBe("day not recognized");
  expect(dayToString(43)).toBe("day not recognized");
  expect(dayToString(46)).toBe("day not recognized");

  expect(toUpper("monday")).toBe("MONDAY");
  expect(toUpper("aliusheragbsilderuhar")).toBe("ALIUSHERAGBSILDERUHAR");
});

test("Ch10 Q2", () => {
  expect(monthToString(0)).toBe("january");
  expect(monthToString(1)).toBe("february");
  expect(monthToString(2)).toBe("march");
  expect(monthToString(3)).toBe("april");
  expect(monthToString(4)).toBe("may");
  expect(monthToString(5)).toBe("june");
  expect(monthToString(6)).toBe("july");
  expect(monthToString(7)).toBe("august");
  expect(monthToString(8)).toBe("september");
  expect(monthToString(9)).toBe("october");
  expect(monthToString(10)).toBe("november");
  expect(monthToString(11)).toBe("december");
  expect(monthToString(14)).toBe("month not recognized");

  expect(monthToUpper(0)).toBe("JANUARY");
  expect(monthToUpper(1)).toBe("FEBRUARY");
  expect(monthToUpper(2)).toBe("MARCH");
  expect(monthToUpper(3)).toBe("APRIL");
  expect(monthToUpper(4)).toBe("MAY");
  expect(monthToUpper(5)).toBe("JUNE");
  expect(monthToUpper(6)).toBe("JULY");
  expect(monthToUpper(7)).toBe("AUGUST");
  expect(monthToUpper(8)).toBe("SEPTEMBER");
  expect(monthToUpper(9)).toBe("OCTOBER");
  expect(monthToUpper(10)).toBe("NOVEMBER");
  expect(monthToUpper(11)).toBe("DECEMBER");
  expect(monthToUpper(14)).toBe("MONTH NOT RECOGNIZED");
  expect(monthToUpper(17)).toBe("MONTH NOT RECOGNIZED");
  expect(monthToUpper(40)).toBe("MONTH NOT RECOGNIZED");
  expect(monthToUpper(63)).toBe("MONTH NOT RECOGNIZED");
  expect(monthToUpper(86)).toBe("MONTH NOT RECOGNIZED");

  expect(getNthOccuranceInMonth(new Date(2024, 6, 1))).toBe(1);
  expect(getNthOccuranceInMonth(new Date(2024, 6, 8))).toBe(2);
  expect(getNthOccuranceInMonth(new Date(2024, 6, 21))).toBe(3);
  expect(getNthOccuranceInMonth(new Date(2024, 6, 22))).toBe(4);
  expect(getNthOccuranceInMonth(new Date(2024, 6, 28))).toBe(4);

  expect(numToOrdinal(0)).toBe("0th");
  expect(numToOrdinal(1)).toBe("1st");
  expect(numToOrdinal(2)).toBe("2nd");
  expect(numToOrdinal(3)).toBe("3rd");
  expect(numToOrdinal(4)).toBe("4th");
  expect(numToOrdinal(5)).toBe("5th");
  expect(numToOrdinal(6)).toBe("6th");
  expect(numToOrdinal(7)).toBe("7th");
  expect(numToOrdinal(64)).toBe("64th");
  expect(numToOrdinal(82)).toBe("82nd");
  expect(numToOrdinal(101)).toBe("101st");

  // Impure function, changes every day it is called.
  // expect(ch10_q2_ap()).toBe("2nd MONDAY of JULY");
  // expect(ch10_q2_do()).toBe("2nd MONDAY of JULY");
});

test("Ch10 Q3", () => {
  expectTypeOf(ch10_q3(30)).toBeFunction();
  expectTypeOf(ch10_q3(4)).returns.toBeArray;

  expect(ch10_q3(4)()).toHaveLength(4);
  expect(ch10_q3(100)()).toHaveLength(100);
});

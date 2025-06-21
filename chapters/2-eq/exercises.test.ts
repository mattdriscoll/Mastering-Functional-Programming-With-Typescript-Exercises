import { expect, test } from "vitest";
import { ch2_q1, ch2_q2, ch2_q3, ch2_q4 } from "./exercises";
import type { PersonGraph } from "../../types";

test("Ch2 Q1", () => {
  expect(ch2_q1.equals(-2, 2)).toBeTruthy();
  expect(ch2_q1.equals(200, -200)).toBeTruthy();
  expect(ch2_q1.equals(200, 400 - 200)).toBeTruthy();
  expect(ch2_q1.equals(100, 100)).toBeTruthy();
  expect(ch2_q1.equals(101, 100)).toBeFalsy();
});

test("Ch2 Q2", () => {
  expect(ch2_q2.equals("Happy Birthday!", "happy birthday!")).toBeTruthy();
  expect(ch2_q2.equals("HahAhSHAhfd", "hAHaHshaHFD")).toBeTruthy();
});

test("Ch2 Q3", () => {
  expect(ch2_q3.equals("A B C", "abc")).toBeTruthy();
  expect(
    ch2_q3.equals("BAILSE aiulsherHAUISERH laiuksher", "bailseAIULSHER hauiserhLAIUKSHER "),
  ).toBeTruthy();
});

const personGraph1: PersonGraph = [
  { name: "Janner", age: 12 },
  [
    [{ name: "Kalmar", age: 11 }, []],
    [{ name: "Leeli", age: 8 }, [[{ name: "Sara Cobbler", age: 13 }, []]]],
  ],
];
const personGraph2: PersonGraph = [
  { name: "Podo", age: 11 },
  [
    [{ name: "Oscar", age: 65 }, []],
    [{ name: "Nia", age: 40 }, [personGraph1]],
  ],
];
const personGraph3: PersonGraph = [
  { name: "Podo", age: 11 },
  [
    [{ name: "Oscar", age: 65 }, []],
    [{ name: "Nia", age: 40 }, [personGraph1]],
  ],
];

test("Ch2 Q4", () => {
  expect(ch2_q4.equals(personGraph1, personGraph2)).toBeFalsy();
  expect(ch2_q4.equals(personGraph2, personGraph3)).toBeTruthy();
});

import { expect, test } from "vitest";
import {
  EqAbsNumber,
  EqPersonGraph,
  EqStrCaseAndSpaceInsensitive,
  EqStrCaseInsensitive,
  type PersonGraph,
} from "./exercises";

test("Ch2 Q1", () => {
  expect(EqAbsNumber.equals(-2, 2)).toBeTruthy();
  expect(EqAbsNumber.equals(200, -200)).toBeTruthy();
  expect(EqAbsNumber.equals(200, 400 - 200)).toBeTruthy();
  expect(EqAbsNumber.equals(100, 100)).toBeTruthy();
  expect(EqAbsNumber.equals(101, 100)).toBeFalsy();
});

test("Ch2 Q2", () => {
  expect(
    EqStrCaseInsensitive.equals("Happy Birthday!", "happy birthday!")
  ).toBeTruthy();
  expect(
    EqStrCaseInsensitive.equals("HahAhSHAhfd", "hAHaHshaHFD")
  ).toBeTruthy();
});

test("Ch2 Q3", () => {
  expect(EqStrCaseAndSpaceInsensitive.equals("A B C", "abc")).toBeTruthy();
  expect(
    EqStrCaseAndSpaceInsensitive.equals(
      "BAILSE aiulsherHAUISERH laiuksher",
      "bailseAIULSHER hauiserhLAIUKSHER "
    )
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
  expect(EqPersonGraph.equals(personGraph1, personGraph2)).toBeFalsy();
  expect(EqPersonGraph.equals(personGraph2, personGraph3)).toBeTruthy();
});

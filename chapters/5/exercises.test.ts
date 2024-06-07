import { expect, test } from "vitest";
import { exclaim, mapFunc, numToString, strToArray } from "./exercises";

test("Ch5 Q2 - Identity", () => {
  const mappedResNum = (x: number) =>
    mapFunc<number, string, string>((x) => x)(numToString)(x);
  const unmappedResNum = (x: number) => numToString(x);

  const mappedResString = (x: string) =>
    mapFunc<string, string, string>((x) => x)(exclaim)(x);
  const unmappedResString = (x: string) => exclaim(x);

  // expect(mappedResNum(3)).toBe(unmappedResNum(3));
  expect(mappedResNum(3) === unmappedResNum(3)).toBeTruthy();

  // expect(mappedResNum(30)).toBe(unmappedResNum(30));
  expect(mappedResNum(30) === unmappedResNum(30)).toBeTruthy();
  expect(mappedResNum(30) === unmappedResNum(40)).toBeFalsy();

  // expect(mappedResString("hi")).toBe(unmappedResString("hi"));
  expect(mappedResString("hi") === unmappedResString("hi")).toBeTruthy();
  expect(mappedResString("hello") === unmappedResString("hi")).toBeFalsy();
});

test("Ch5 Q2 - Composition", () => {
  expect(mapFunc<number, string, string>(exclaim)(numToString)(3)).toBe("3!");
  expect(
    mapFunc<number, string, string>(exclaim)(numToString)(3) ===
      exclaim(numToString(3))
  ).toBeTruthy();

  expect(
    mapFunc<number, string, string[]>(strToArray)(
      mapFunc<number, string, string>(exclaim)(numToString)
    )(5)
  ).toStrictEqual(["5!"]);
  expect(
    mapFunc<number, string, string[]>(strToArray)(
      mapFunc<number, string, string>(exclaim)(numToString)
    )(5)[0] === strToArray(exclaim(numToString(5)))[0]
  ).toBeTruthy();
});

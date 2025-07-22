import { expect, test } from "vitest";
import { append, toString, prepend, toArray, strToUpper, surround } from "../../utils";
import { ch5_q1 as mapFunc } from "./exercises";
import { identity, pipe } from "fp-ts/lib/function";

const exclaim = append("!");

test("Ch5 Q2 - Identity", () => {
  const mappedToString = pipe(toString, mapFunc(identity));
  const unmappedToString = toString;

  const mappedExclaim = pipe(exclaim, mapFunc(identity));
  const unmappedExclaim = exclaim;

  expect(mappedToString(3) === unmappedToString(3)).toBeTruthy();
  expect(mappedToString(30) === unmappedToString(30)).toBeTruthy();
  expect(mappedToString(30) === unmappedToString(40)).toBeFalsy();

  expect(mappedExclaim("hi") === unmappedExclaim("hi")).toBeTruthy();
  expect(mappedExclaim("hello") === unmappedExclaim("hi")).toBeFalsy();
});

test("Ch5 Q2 - Composition", () => {
  expect(pipe(toString, mapFunc(exclaim))(3)).toBe("3!");
  expect(pipe(toString, mapFunc(exclaim))(3) === exclaim(toString(3))).toBeTruthy();

  expect(pipe(strToUpper, mapFunc(surround("!!!")))("hola")).toBe("!!!HOLA!!!");
  expect(
    pipe(
      strToUpper,
      mapFunc(surround("!!")),
      mapFunc(surround("!!")),
      mapFunc(surround("🎉")),
      mapFunc(surround("🙈")),
    )("hola"),
  ).toBe("🙈🎉!!!!HOLA!!!!🎉🙈");

  expect(pipe(toString, mapFunc(exclaim), mapFunc(toArray))(5)).toStrictEqual(["5!"]);
  expect(
    pipe(toString, mapFunc(exclaim), mapFunc(toArray))(5)[0] === toArray(exclaim(toString(5)))[0],
  ).toBeTruthy();
});

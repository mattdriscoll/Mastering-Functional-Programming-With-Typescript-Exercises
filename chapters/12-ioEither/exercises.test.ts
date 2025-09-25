import { expect, test } from "vitest";
import { ch12_q2 } from "./exercises";
import path from "node:path";
import { ioEither } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

test("Ch12 Q2", () => {
  const dirPathExists = path.dirname(__filename);
  const getResRight = ch12_q2(dirPathExists);
  const resRight = pipe(
    getResRight,
    ioEither.getOrElseW(e => () => e),
  )();

  expect(resRight).toBeTruthy();
  expect(resRight).toBeTypeOf("number");

  const dirPathNonExistent = dirPathExists.concat("/does-not-exist");
  const getResLeft = ch12_q2(dirPathNonExistent);
  const resLeft = pipe(
    getResLeft,
    ioEither.getOrElseW(e => () => e),
  )();

  expect(resLeft).toBeTypeOf("string");
});

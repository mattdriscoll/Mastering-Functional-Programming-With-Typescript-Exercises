import { io, option, ioOption, readonlyArray, number } from "fp-ts";
import { identity, pipe } from "fp-ts/lib/function";
import type { IOOption } from "fp-ts/lib/IOOption";
import type { ReadonlyNonEmptyArray } from "fp-ts/lib/ReadonlyNonEmptyArray";
import fs from "fs";

const fromNullableIO = io.map(option.fromNullable);

/**
 * Ch11 Q1
 *
 * Explore other functions that are bundled with the IOOption module. What
 * similarities in behavior do they have with IO and Option?
 */
const toUpper = (x: string) => x.toUpperCase();
const exclaim = (x: string) => x.concat("!");
const repeat = (x: string) => ioOption.of(x.concat(x));

export const ch11_q1 = (s: string | null) =>
  pipe(
    fromNullableIO(() => s),
    ioOption.map(toUpper),
    ioOption.map(exclaim),
    ioOption.flatMap(repeat),
  );

/**
 * Ch11 Q2
 *
 * Rewrite getUserPrompt using IOOption Do notation.
 */
const prompt = (username: string) => (host: string) => `${username}@${host}`;
const getHost = pipe(
  fromNullableIO(() => process.env.HOST),
  ioOption.alt(() => ioOption.of("localhost")),
);

const getUserPrompt = pipe(
  ioOption.Do,
  ioOption.bind("username", () => fromNullableIO(() => process.env.USERNAME)),
  ioOption.bind("host", () => getHost),
  ioOption.map(({ username, host }) => prompt(username)(host)),
);

export const ch11_q2 = getUserPrompt;

/**
 * Ch11 Q3
 *
 * Explore traverseReadonlyArrayWithIndex and write a function with the
 * signature IOOption<number> that, given an array of file paths, returns
 * the total size of files in bytes. Use node:fs statSync wrapped in tryCatch.
 */
const add = (a: number, b: number) => a + b;
const getFileSize = (path: string): IOOption<number> =>
  pipe(
    option.tryCatch(() => fs.statSync(path)),
    option.map(stats => stats.size),
    ioOption.fromOption,
  );

export const getTotalFileSizes = (filePaths: ReadonlyArray<string>): IOOption<number> =>
  pipe(
    filePaths,
    ioOption.traverseReadonlyArrayWithIndex((_, path) => getFileSize(path)),
    // ioOption.map(fileSizes => fileSizes.reduce(add)), // OR:
    ioOption.map(readonlyArray.foldMap(number.MonoidSum)(identity)),
  );
export const ch11_q3 = getTotalFileSizes;

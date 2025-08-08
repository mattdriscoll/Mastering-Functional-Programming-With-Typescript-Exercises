import fs from "fs";
import { io, ioOption, option, readonlyArray } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IOOption } from "fp-ts/lib/IOOption";
import { MonoidSum } from "fp-ts/lib/number";

/**
 * Ch11 Q1
 *
 * Explore other functions that are bundled with the IOOption module. What
 * similarities in behavior do they have with IO and Option?
 */

/**
 * Ch11 Q2
 *
 * Rewrite getUserPrompt using IOOption Do notation.
 */
const prompt = (username: string) => (host: string) => `${username}@${host}`;
const fromNullableIO = io.map(option.fromNullable);
const getHost = pipe(
  fromNullableIO(() => process.env.HOST),
  ioOption.alt(() => ioOption.of("localhost")),
);

const getUserPrompt = pipe(
  ioOption.Do,
  ioOption.apS(
    "username",
    fromNullableIO(() => process.env.USERNAME),
  ),
  ioOption.apS("host", getHost),
  ioOption.map(({ username, host }) => prompt(username)(host)),
);
export const ch11_q2 = getUserPrompt;

/**
 * Ch11 Q3
 *
 * Explore traverseReadonlyArrayWithIndex and write a function with the signature
 * IOOption<number> that, given an array of file paths, returns the total size of
 * files in bytes. Use node:fs statSync wrapped in tryCatch.
 */

const arraySumNumbers = readonlyArray.foldMap(MonoidSum);
const getOptionalFileStats = (stats: ReadonlyArray<fs.Stats>) =>
  ioOption.some(
    pipe(
      stats,
      arraySumNumbers(fileStats => fileStats.size),
    ),
  );

export const ch11_q3 = (filepaths: ReadonlyArray<string>): IOOption<number> =>
  pipe(
    filepaths,
    ioOption.traverseReadonlyArrayWithIndex((_, path) =>
      ioOption.fromOption(option.tryCatch(() => fs.statSync(path))),
    ),
    ioOption.fold(() => ioOption.none, getOptionalFileStats),
  );

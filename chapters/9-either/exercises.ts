import { either } from "fp-ts";
import type { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { readFileSync } from "fs";

/**
 * Ch9 Q1
 * Write a function that takes a filename as a string and returns Either<Error, Buffer>
 * with either an error or file contents.
 */
const getFileContents = (filename: string): Either<Error, Buffer> =>
  pipe(
    either.tryCatch(
      () => readFileSync(filename),
      () => new Error("something went wrong"),
    ),
  );

export const ch9_q1 = getFileContents;

/**
 * Ch9 Q2
 * Explore traverseArray:
 * <E, A, B>(f: (a: A) => Either<E, B>) => (as: readonly A[]) => Either<E, readonly B[]> -
 * similar to sequenceArray, except that it takes a function that returns Either
 * for every element of the array. Write a function that takes an array of file
 * paths as string[] and returns Either<Error, Buffer[]>.
 */
const getFileContentsArr = either.traverseArray(getFileContents);

export const ch9_q2 = getFileContentsArr;

/**
 * Ch9 Q3
 * Using a function from the previous exercise and a function that is declared
 * like this declare const zipFiles: (data: Buffer[]) => Either<Error, Buffer>,
 * write a function that takes an array of file paths and returns a single zipped Buffer.
 */
// declare const zipFiles: (data: Buffer[] | readonly Buffer[]) => Either<Error, Buffer>;
// export const ch9_q3 = flow(getFileContentsArr, either.chain(zipFiles));

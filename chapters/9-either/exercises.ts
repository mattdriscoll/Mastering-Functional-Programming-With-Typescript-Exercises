import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import fs from "fs";
import path from "path";

/**
 * Write a function that takes a filename as a string and returns
 * Either<Error, Buffer> with either an error or file contents.
 */
const getFileContents = (
  filename: string
): E.Either<Error, Buffer /* | string */> =>
  pipe(
    E.tryCatch(
      () => fs.readFileSync(path.resolve(__dirname, filename) /* , "utf8" */),
      (e) => new Error("file not readable")
    )
  );
export const ch9_q1 = getFileContents;

/**
 * Explore traverseArray:
 * <E, A, B>(f: (a: A) => Either<E, B>) => (as: readonly A[]) => Either<E, readonly B[]>
 *
 * Similar to sequenceArray, except that it takes a function that returns Either
 * for every element of the array. Write a function that takes an array of file
 * paths as string[] and returns Either<Error, Buffer[]>.
 */
// const getMultiFileContents = (filenames: string[]) =>
//   E.traverseArray(getFileContents)(filenames);
const getMultiFileContents = E.traverseArray(getFileContents);
export const ch9_q2 = getMultiFileContents;

/**
 * Using a function from the previous exercise and a function that is declared
 * like this:
 *
 * declare const zipFiles: (data: Buffer[]) => Either<Error, Buffer>
 *
 * write a function that takes an array of file paths and returns a single
 * zipped Buffer.
 */
declare const zipFiles: (
  data: Buffer[] | readonly Buffer[]
) => E.Either<Error, Buffer>;

const getBufferFromFilepaths = (filePaths: string[]) =>
  pipe(E.of(filePaths), E.chain(getMultiFileContents), E.map(zipFiles));
export const ch9_q3 = getBufferFromFilepaths;

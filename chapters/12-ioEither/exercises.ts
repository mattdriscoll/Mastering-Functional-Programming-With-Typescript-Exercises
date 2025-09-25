import { array, io, ioEither, readonlyArray } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import type { IOEither } from "fp-ts/lib/IOEither";
import { MonoidSum } from "fp-ts/lib/number";

/**
 * Extend getFilesHasher such that in case one of the individual getFileHasher
 * calls fail, it recovers with an empty string with its hash value.
 */
const readFile = (path: string) =>
  ioEither.tryCatch(
    () => readFileSync(path),
    exc => (exc as Error).message,
  );

const hashFile = (b: Buffer) => createHash("sha256").update(b).digest();

const getFileHasher = (path: string) =>
  pipe(
    readFile(path),
    ioEither.map(hashFile),
    ioEither.map(f => f.toString("hex")),
  );

const getFilesHasherExtended = (paths: string[]) =>
  pipe(
    paths,
    ioEither.traverseArray(
      flow(
        getFileHasher,
        ioEither.getOrElse(() => io.of("")),
        ioEither.right,
      ),
    ),
  );
export const ch12_q1 = getFilesHasherExtended;

/**
 * Write a function with a IOEither<string, number> signature that, given a path
 * to a folder, returns the total size (in bytes) of all files in it.
 */
const getFilePaths = (folderPath: string) =>
  pipe(
    ioEither.tryCatch(() => readdirSync(folderPath), String),
    ioEither.map(files =>
      pipe(
        files,
        array.map(file => folderPath.concat("/", file)),
      ),
    ),
  );

const getFileSize = (filePath: string) =>
  pipe(
    ioEither.tryCatch(() => statSync(filePath), String),
    ioEither.map(stats => stats.size),
  );

const getFileSizes = (folderPath: string): IOEither<string, number> =>
  pipe(
    getFilePaths(folderPath),
    ioEither.chain(readonlyArray.traverse(ioEither.ApplicativeSeq)(getFileSize)),
    ioEither.map(readonlyArray.foldMap(MonoidSum)(x => x)),
  );
export const ch12_q2 = getFileSizes;

/**
 * Using getFolderHashes, write checkFolderHash:
 * (path: string, hashes: string[]) => IOEither<string, boolean>
 * that checks the integrity of the files in a given folder.
 */

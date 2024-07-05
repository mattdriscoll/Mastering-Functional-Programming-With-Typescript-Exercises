import { left, right } from "fp-ts/lib/Either";
import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import { ch9_q1, ch9_q2, errorMessages } from "./exercises";

const pathnames = {
  testFile1: "testFile.md",
  testFile2: "testFile2.md",
  nonExistentFile: "non-existent-file.md",
};

test("Ch9 Q1", () => {
  expect(ch9_q1(pathnames.testFile1)).toStrictEqual(
    // right("I am the test file, parse me please\n")
    right(fs.readFileSync(path.resolve(__dirname, pathnames.testFile1)))
  );

  expect(ch9_q1(pathnames.nonExistentFile)).toStrictEqual(
    left(new Error(errorMessages.fileNotReadable))
  );
});

test("Ch9 Q2", () => {
  expect(ch9_q2([pathnames.testFile1, pathnames.testFile2])).toStrictEqual(
    right([
      fs.readFileSync(path.resolve(__dirname, pathnames.testFile1)),
      fs.readFileSync(path.resolve(__dirname, pathnames.testFile2)),
    ])
  );

  expect(
    ch9_q2([pathnames.nonExistentFile, pathnames.testFile1])
  ).toStrictEqual(left(new Error(errorMessages.fileNotReadable)));
});

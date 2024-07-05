import { left, right } from "fp-ts/lib/Either";
import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import { ch9_q1, ch9_q2 } from "./exercises";

test("Ch9 Q1", () => {
  expect(ch9_q1("testFile.md")).toStrictEqual(
    // right("I am the test file, parse me please\n")
    right(fs.readFileSync(path.resolve(__dirname, "testFile.md")))
  );

  expect(ch9_q1("non-existent-file.md")).toStrictEqual(
    left(new Error("file not readable"))
  );
});

test("Ch9 Q2", () => {
  expect(ch9_q2(["testFile.md", "testFile2.md"])).toStrictEqual(
    right([
      fs.readFileSync(path.resolve(__dirname, "testFile.md")),
      fs.readFileSync(path.resolve(__dirname, "testFile2.md")),
    ])
  );

  expect(ch9_q2(["non-existent-file.md"])).toStrictEqual(
    left(new Error("file not readable"))
  );
});

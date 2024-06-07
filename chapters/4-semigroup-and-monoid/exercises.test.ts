import { expect, test } from "vitest";
import {
  AssignObjectSemigroupStruct,
  takeFirstSemigroup,
  takeLastSemigroup,
} from "./exercises";

test("Ch4 Q1", () => {
  expect(takeFirstSemigroup().concat("abc", "123")).toBe("abc");
  expect(takeFirstSemigroup().concat(12345, 54321)).toBe(12345);
  expect(takeFirstSemigroup().concat("hello", "world")).toBe("hello");

  expect(takeLastSemigroup().concat("abc", "123")).toBe("123");
  expect(takeLastSemigroup().concat(12345, 54321)).toBe(54321);
  expect(takeLastSemigroup().concat("hello", "world")).toBe("world");
});

test("Ch4 Q2", () => {
  expect(
    AssignObjectSemigroupStruct(
      { name: "A", age: 29 },
      { age: 31, height: 180 }
    )
  ).toStrictEqual({ name: "A", age: 31, height: 180 });

  expect(
    AssignObjectSemigroupStruct(
      AssignObjectSemigroupStruct(
        { make: "Chevy", model: "Traverse" },
        { make: "Triumph", model: "Bonneville", engineSize: "900cc" }
      ),
      { make: "Nissan", model: "350z" }
    )
  ).toStrictEqual({ make: "Nissan", model: "350z", engineSize: "900cc" });
});

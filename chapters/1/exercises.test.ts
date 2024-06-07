import { expect, test } from "vitest";
import { add, flow, multiplyBy, pipe } from "./exercises";

test("Ch1 Q1", () => {
  const test1 = flow(add(2), multiplyBy(10));
  expect(test1(2)).toBe(40);

  expect(flow(multiplyBy(20), add(2), multiplyBy(0.5))(10)).toBe(101);

  expect(
    flow(
      add(10),
      multiplyBy(10),
      add(10),
      multiplyBy(10),
      add(-1000),
      multiplyBy(0.5),
      add(10),
      multiplyBy(0.5),
      add(10),
      multiplyBy(0.5),
      add(10),
      multiplyBy(2),
      multiplyBy(0.5),
      add(45),
      multiplyBy(0.5)
    )(10)
  ).toBe(100);
});

test("Ch1 Q2", () => {
  expect(pipe(20, add(-28), multiplyBy(-2))).toBe(16);

  expect(
    pipe(
      100,
      add(200),
      multiplyBy(0.5),
      add(-500),
      multiplyBy(-0.5),
      add(25),
      multiplyBy(0.5),
      add(-200),
      multiplyBy(-2),
      add(-200)
    )
  ).toBe(0);
});

import { expect, test } from "vitest";
import { compose, flow, pipe } from "./exercises";

const add = (a: number) => (b: number) => a + b;
const multiplyBy = (a: number) => (b: number) => a * b;

test("Ch1 Q3", () => {
  const test1 = compose(add(1), add(3));
  expect(test1(3)).toBe(7);

  const test2 = compose(multiplyBy(9), multiplyBy(2));
  expect(test2(2)).toBe(36);

  const test3 = compose(multiplyBy(2), compose(add(3), multiplyBy(3)));
  expect(test3(4)).toBe(30);

  expect(compose(test1, compose(test2, test3))(2)).toBe(328);
});

test("Ch1 Q2", () => {
  const test1 = flow<number, number>(add(2), multiplyBy(10));
  expect(test1(2)).toBe(40);

  const test2 = flow<number, number>(multiplyBy(20), add(2), multiplyBy(0.5));
  expect(test2(10)).toBe(101);

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
      multiplyBy(0.5),
    )(10),
  ).toBe(100);
});

test("Ch1 Q3", () => {
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
      add(-200),
      add(30),
      multiplyBy(0.1),
      add(-3),
    ),
  ).toBe(0);
});

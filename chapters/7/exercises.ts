import { bind, bindTo, let as let_, map, match } from "fp-ts/lib/Array";
import * as IO from "fp-ts/lib/IO";
import { pipe } from "fp-ts/lib/function";

/**
 * Using chaining and Set as an underlying type, implement a function that,
 * given some numbers, produces a set of all numbers that are equal to the
 * original set and their doubles, e.g., for a set {1}, it should produce {1, 2};
 * for a set {1, 2}, it should produce {1, 2, 4}.
 */
const multiplyBy = (a: number) => (b: number) => a * b;
const double = multiplyBy(2);
const triple = multiplyBy(3);

const reduceSets = <T>(acc: Set<T>, curr: Set<T>) => new Set([...acc, ...curr]);

export const ch7_q1 = (numsSet: Set<number>) =>
  pipe(
    Array.of(...numsSet),
    bindTo("orig"),
    bind("double", ({ orig }) => [double(orig)]),
    map(({ orig, double }) => new Set([orig, double])),
    match(
      () => new Set(),
      (sets) => sets.reduce(reduceSets, new Set())
    )
  );

/**
 * Modify the previous function so that it runs 2 iterations of computations, so
 * that {1} produces {1, 2, 4}.
 */
export const ch7_q2 = (numsSet: Set<number>) =>
  pipe(
    Array.of(...numsSet),
    bindTo("orig"),
    let_("double", ({ orig }) => double(orig)),
    let_("double2", ({ orig }) => pipe(orig, double, double)),
    map(({ orig, double, double2 }) => new Set([orig, double, double2])),
    match(
      () => new Set(),
      (sets) => sets.reduce(reduceSets, new Set())
    )
  );

/**
 * Given a function that returns some numeric value, and using IO as an
 * underlying type, produce a function that first calculates a double of the
 * original value, then calculates a triple of the original value, and then
 * returns the sum of the calculated double and triple values.
 */
// type GivenFunc = (x: unknown) => number;
export const ch7_q3 = (num: number) =>
  pipe(
    IO.of(num),
    IO.bindTo("orig"),
    IO.let("double", ({ orig }) => double(orig)),
    IO.let("triple", ({ orig }) => triple(orig)),
    IO.map(({ double, triple }) => double + triple)
  );

import { pipe } from "fp-ts/lib/function";
import { multiplyBy, sum } from "../../utils";
import { array, number, set, io, identity } from "fp-ts";
import type { IO } from "fp-ts/lib/IO";
// import { ap } from "fp-ts/lib/Identity";

const double = multiplyBy(2);

/**
 * Using chaining and Set as an underlying type, implement a function that,
 * given some numbers, produces a set of all numbers that are equal to the
 * original set and their doubles, e.g., for a set {1}, it should produce {1, 2};
 * for a set {1, 2}, it should produce {1, 2, 4}.
 */
export const ch7_q1 = (nums: Set<number>) =>
  pipe(
    nums,
    set.chain(number.Eq)(num => pipe([num, pipe(num, multiplyBy(2))], set.fromArray(number.Eq))),
  );

/**
 * Modify the previous function so that it runs 2 iterations of computations, so
 * that {1} produces {1, 2, 4}.
 */
export const ch7_q2 = (nums: Set<number>) =>
  pipe(
    nums,
    set.toArray(number.Ord),
    array.bindTo("orig"),
    array.let("double", ({ orig }) => pipe(orig, double)),
    array.let("double2", ({ orig }) => pipe(orig, double, double)),
    array.chain(a => [a.orig, a.double, a.double2]),
    set.fromArray(number.Eq),
  );

/**
 * Given a function that returns some numeric value, and using IO as an
 * underlying type, produce a function that first calculates a double of the
 * original value, then calculates a triple of the original value, and then
 * returns the sum of the calculated double and triple values.
 */
export const ch7_q3 = (numFunc: IO<number>) =>
  pipe(
    numFunc,
    io.bindTo("orig"),
    io.let("double", ({ orig }) => pipe(orig, multiplyBy(2))),
    io.let("triple", ({ orig }) => pipe(orig, multiplyBy(3))),
    io.map(({ double, triple }) => pipe(double, sum(triple))),
  );

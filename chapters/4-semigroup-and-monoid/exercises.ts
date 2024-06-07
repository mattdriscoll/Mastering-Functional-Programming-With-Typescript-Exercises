import { struct, type Semigroup } from "fp-ts/lib/Semigroup";

/**
 * Implement an instance of Semigroup<A> for an arbitrary type A that always
 * prefers the first argument when concatenating and discards the second.
 * Implement an opposite instance that always prefers the last parameter,
 * discarding the first. Would these instances of Semigroup still be compliant
 * with the rules set out in the beginning of this chapter?
 */
// export const semigroupTakeFirst: Semigroup<A> = {
//   concat: (first, second) => first,
// };
export const takeFirstSemigroup = <A>(): Semigroup<A> => ({
  concat: (first, second) => first ?? second,
});
// export const semigroupTakeLast: Semigroup<A> = {
//   concat: (first, second) => second,
// };
export const takeLastSemigroup = <A>(): Semigroup<A> => ({
  concat: (first, second) => second ?? first,
});

/**
 * Using the instance from the previous exercise, implement AssignObjectSemigroup
 * that given two objects of arbitrary structure produces a merged version of
 * the two in the way Object.assign would do, overwriting the matching values
 * supplied in the later parameter:
 */
const result = Object.assign({ name: "A", age: 29 }, { age: 31, height: 180 }); // {name: 'A', age: 31, height: 180}

// export const AssignObjectSemigroup = <A>(a: A, b: A): A => {
//   const semigroupMergeObj: Semigroup<A> = {
//     concat: (a, b) => ({ ...a, ...b }),
//   };

//   return semigroupMergeObj.concat(a, b);
// };

type AnyObj = Record<string, unknown>;
export const AssignObjectSemigroup = (first: AnyObj, second: AnyObj) => ({
  ...Object.keys({ ...first, ...second }).reduce(
    (acc, key) => ({
      ...acc,
      [key]: takeLastSemigroup().concat(first[key], second[key]),
    }),
    {}
  ),
});

export const AssignObjectSemigroupStruct = (
  first: AnyObj,
  second: AnyObj
): AnyObj =>
  struct(
    Object.keys({ ...first, ...second }).reduce(
      (acc, key) => ({ ...acc, [key]: takeLastSemigroup() }),
      {}
    )
  ).concat(first, second);

import { record } from "fp-ts";
import type { Semigroup } from "fp-ts/lib/Semigroup";

/**
 * Implement an instance of Semigroup<A> for an arbitrary type A that always
 * prefers the first argument when concatenating and discards the second.
 * Implement an opposite instance that always prefers the last parameter,
 * discarding the first. Would these instances of Semigroup still be compliant
 * with the rules set out in the beginning of this chapter?
 */
const getPreferFirstSemigroup = <A>(): Semigroup<A> => ({
  concat: (a: A, b: A): A => a ?? b,
});
const getPreferLastSemigroup = <A>(): Semigroup<A> => ({
  concat: (a: A, b: A): A => b ?? a,
});

export const ch4_q1 = getPreferFirstSemigroup;
export const ch4_q1b = getPreferLastSemigroup;

/**
 * Using the instance from the previous exercise, implement AssignObjectSemigroup
 * that given two objects of arbitrary structure produces a merged version of
 * the two in the way Object.assign would do, overwriting the matching values
 * supplied in the later parameter:
 */
const AssignObjectSemigroup = <A>(a: Record<string, A>, b: Record<string, A>): Record<string, A> =>
  record.getMonoid(getPreferLastSemigroup<A>()).concat(a, b);

export const ch4_q2 = AssignObjectSemigroup;

import { type Eq, fromEquals, struct } from "fp-ts/lib/Eq";
import { flow } from "fp-ts/lib/function";
import { Eq as EqNumber } from "fp-ts/lib/number";
import { Eq as EqString } from "fp-ts/lib/string";

/**
 * 1.
 *
 * Implement an instance of Eq<number>, where numbers are treated as absolute
 * values, meaning that -1 should be considered equal to 1.
 */
// const eqAbs: Eq<number> = {
//   equals: (a, b) => EqNumber.equals(Math.abs(a), Math.abs(b)),
// };
const eqAbsFromEquals = fromEquals((a: number, b: number) =>
  EqNumber.equals(Math.abs(a), Math.abs(b)),
);

export const ch2_q1 = eqAbsFromEquals;

/**
 * 2.
 *
 * Implement an instance of Eq<string>, where case is not taken into account,
 * meaning that "ABC" should be considered equal to "abc".
 */
const toLower = (a: string) => a.toLowerCase();
// const eqStrCaseInsensitive: Eq<string> = {
//   equals: (a, b) => EqString.equals(toLower(a), toLower(b)),
// };
/** OR: */
const eqStrCaseInsensitiveFromEquals = fromEquals((a: string, b: string) =>
  EqString.equals(a.toLowerCase(), b.toLowerCase()),
);

export const ch2_q2 = eqStrCaseInsensitiveFromEquals;

/**
 * 3.
 *
 * Implement an instance of Eq<string>, where in addition to the previous
 * requirement, spaces are also not taken into account when calculating string
 * equality, meaning that "A B C" should be considered equal to "abc".
 */
const removeSpaces = (a: string) => a.replace(/\s/g, "");
const lowerNoSpaces = flow(toLower, removeSpaces);
// const eqStrSpaceInsensitive: Eq<string> = {
//   equals: (a, b) => EqString.equals(lowerNoSpaces(a), lowerNoSpaces(b)),
// };
/** OR: */
const eqStrSpaceInsensitiveFromEquals = fromEquals((a: string, b: string) =>
  EqString.equals(lowerNoSpaces(a), lowerNoSpaces(b)),
);

export const ch2_q3 = eqStrSpaceInsensitiveFromEquals;

/**
 * 4.
 * Implement an instance of Eq<PersonGraph>, given the following definition of
 * a PersonGraph:
 *
 * A PersonGraph is a type representing a social graph for a Person, where it
 * consists of a tuple. The first element of the tuple is the Person itself, and
 * the second element is an array of PersonGraphs, which represent all the
 * Person’s social contacts. The PersonGraph type is recursive, meaning that a
 * Person can have social contacts who also have their own social contacts. An
 * Eq<PersonGraph> instance would perform full equality by recursively
 * descending into each person’s contacts, their contacts, and so on…
 */
type Person = {
  name: string;
  age: number;
};

export type PersonGraph = [Person, PersonGraph[]];

const EqPerson = struct<Person>({
  name: EqString,
  age: EqNumber,
});

const EqPersonGraph: Eq<PersonGraph> = fromEquals(
  ([aPerson, aFriends]: PersonGraph, [bPerson, bFriends]: PersonGraph) =>
    EqPerson.equals(aPerson, bPerson) &&
    aFriends.length === bFriends.length &&
    aFriends.every(aFriend => bFriends.some(bFriend => EqPersonGraph.equals(aFriend, bFriend))),
);

export const ch2_q4 = EqPersonGraph;

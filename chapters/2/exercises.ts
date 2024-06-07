import { fromEquals, struct, type Eq } from "fp-ts/lib/Eq";
import { Eq as EqNumber } from "fp-ts/lib/number";
import { Eq as EqString } from "fp-ts/lib/string";

/**
 * 1.
 *
 * Implement an instance of Eq<number>, where numbers are treated as absolute
 * values, meaning that -1 should be considered equal to 1.
 */
export const EqAbsNumber = fromEquals<number>((a, b): boolean =>
  EqNumber.equals(Math.abs(a), Math.abs(b))
);

/**
 * 2.
 *
 * Implement an instance of Eq<string>, where case is not taken into account,
 * meaning that "ABC" should be considered equal to "abc".
 */
const toLower = (str: string) => str.toLowerCase();
export const EqStrCaseInsensitive = fromEquals<string>((a, b) =>
  EqString.equals(toLower(a), toLower(b))
);

/**
 * 3.
 *
 * Implement an instance of Eq<string>, where in addition to the previous
 * requirement, spaces are also not taken into account when calculating string
 * equality, meaning that "A B C" should be considered equal to "abc".
 */
const removeSpaces = (str: string) => str.replace(/\s/g, "");
export const EqStrCaseAndSpaceInsensitive = fromEquals<string>((a, b) =>
  EqStrCaseInsensitive.equals(removeSpaces(a), removeSpaces(b))
);

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
export type Person = {
  name: string;
  age: number;
};

export type PersonGraph = [Person, PersonGraph[]];

export const EqPerson = struct<Person>({
  name: EqString,
  age: EqNumber,
});

export const EqPersonGraph: Eq<PersonGraph> = {
  equals: ([aPerson, aGraph], [bPerson, bGraph]) =>
    EqPerson.equals(aPerson, bPerson) &&
    aGraph.length === bGraph.length &&
    aGraph.every((p, i) => EqPersonGraph.equals(p, bGraph[i])),
};

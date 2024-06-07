/**
 * Implement a map function for a type Func<A, B> = (a: A) => B. Since we
 * defined a Functor as a container of data, which part of the function
 * (a: A) => B would be “containing” the data?
 *
 * After mapping a Func<A, B> with a function of type (b: B) => C, the resulting
 * container’s type should be Func<A, C>. How is this kind of mapping of a unary
 * function different from flow that we looked at in previous chapters?
 */
type Func<A, B> = (a: A) => B;
// const makeFunc = <A, B>(f: (a: A) => B): Func<A, B> => f;
export const mapFunc: <A, B, C>(
  f: (b: B) => C
) => (fa: Func<A, B>) => Func<A, C> = (f) => (fa) => (x) => f(fa(x));

/**
 * Prove that both the Identity and Composition rules are valid for the Functor
 * created in the previous exercise.
 */

export const numToString = (a: number) => String(a);
export const exclaim = (s: string) => `${s}!`;
export const strToArray = (s: string) => Array.of(s);

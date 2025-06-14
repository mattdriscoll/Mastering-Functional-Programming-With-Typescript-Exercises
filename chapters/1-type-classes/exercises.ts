/**
 * Implement the `compose` function. It should take 3 generic
 * parameters: A, B, and C, and compose two functions of type
 * (A) => B and (B) => C, returning a new function with type of
 * (A) => C. You should not use `fp-ts`'s `flow` function
 */
export const compose =
  <A, B, C>(fn2: (b: B) => C, fn1: (a: A) => B) =>
  (a: A): C =>
    fn2(fn1(a));

/**
 * Implement your own `flow` function, which will utilize the
 * `compose` function. This `flow` function should be capable of
 * composing an arbitrary number of functions.
 */
export const flow = <A, B>(...fns: Array<(a: any) => any>): ((a: A) => B) =>
  fns.reduce(
    (comp, f) => compose(f, comp),
    x => x,
  );

/**
 * Implement your own `pipe` function, which should use the `flow`
 * function from the previous question and have semantics similar
 * to `fp-ts`'s `pipe` function
 */
export const pipe = <A, B>(val: A, ...funcs: Array<(x: any) => any>): B =>
  flow<A, B>(...funcs)(val);

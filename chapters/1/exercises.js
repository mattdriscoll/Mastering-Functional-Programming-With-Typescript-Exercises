/**
 * Implement the `compose` function. It should take 3 generic
 * parameters: A, B, and C, and compose two functions of type
 * (A) => B and (B) => C, returning a new function with type of
 * (A) => C. You should not use `fp-ts`'s `flow` function
 */
const compose = (A) => (B) => (C) => B(A(C));

/**
 * Implement your own `flow` function, which will utilize the
 * `compose` function. This `flow` function should be capable of
 * composing an arbitrary number of functions.
 */
export const flow = (...funcs) => {
  const [first, ...rest] = funcs;
  return rest[0] ? compose(first)(flow(...rest)) : first;
};

/**
 * Implement your own `pipe` function, which should use the `flow`
 * function from the previous question and have semantics similar
 * to `fp-ts`'s `pipe` function
 */
export const pipe = (...args) => {
  const [val, ...funcs] = args;
  return flow(...funcs)(val);
};

export function add(a) {
  return (b) => a + b;
}

export function multiplyBy(a) {
  return (b) => a * b;
}

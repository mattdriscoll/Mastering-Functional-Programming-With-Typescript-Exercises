import { flow } from "fp-ts/lib/function";

export const append = (a: string) => (b: string) => b.concat(a);
export const prepend = (a: string) => (b: string) => a.concat(b);
export const strToUpper = (a: string) => a.toUpperCase();
export const toArray = <A>(s: A) => Array.of(s);
export const toString = <A>(a: A) => String(a);
export const surround = (a: string) => flow(append(a), prepend(a));

export const sum = (a: number) => (b: number) => a + b;
export const multiplyBy = (a: number) => (b: number) => a * b;

import { flow } from "fp-ts/lib/function";
import { pipe } from "../chapters/1-type-classes/exercises";

export const append = (a: string) => (b: string) => b.concat(a);
export const prepend = (a: string) => (b: string) => a.concat(b);
export const strToUpper = (a: string) => a.toUpperCase();
export const toArray = <A>(s: A) => Array.of(s);
export const toString = <A>(a: A) => String(a);
export const surround = (a: string) => flow(append(a), prepend(a));
export const beginsWith: (pattern: string) => (a: string) => boolean = pattern => a =>
  !!a.match(RegExp(pipe(pattern, prepend("^"))));

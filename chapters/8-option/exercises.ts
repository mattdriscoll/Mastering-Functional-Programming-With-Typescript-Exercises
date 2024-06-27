import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";

/**
 * Ch8 Q1
 * Implement an Option<number> constructor that only considers positive numbers
 * while treating everything else as None.
 */
export const ch8_q1 = O.fromPredicate((num: number) => num >= 0);

/**
 * Ch8 Q2
 * Modify money from this chapter such that it takes an amount and an optional
 * currency and formats accordingly:
 * money: (amount?: number, currency?: string) => string.
 *
 * For example, when called money(123, "£"), it should produce "£123.00", while
 * if currency is not provided, it falls back to "$".
 */
const money = (amount?: number | null, currency?: string) =>
  pipe(
    O.fromNullable(amount),
    O.chain((amt) =>
      pipe(
        O.fromNullable(currency),
        O.orElse(() => O.some("$")),
        O.map((cur) => `${amt < 0 ? "-" : ""}${cur}${Math.abs(amt).toFixed(2)}`)
      )
    ),
    O.getOrElse(() => "-")
  );
export const ch8_q2 = money;

/**
 * Ch8 Q3
 * Modify loanMonthlyPayment to use the Do notation using bind, bindTo, and let.
 */
const aux = (amount: number) => (rate: number) => amount * (rate / 12);
const loanMonthlyPayment = (amount?: number | null, rate?: number | null) =>
  pipe(
    O.fromNullable(amount),
    O.chain(O.fromPredicate((amt) => amt > 0)),
    O.bindTo("amountO"),
    O.bind("rateO", () =>
      pipe(O.fromNullable(rate), O.chain(O.fromPredicate((r) => r > 0)))
    ),
    // O.chain(({ amountO, rateO }) =>
    //   pipe(O.of(aux), O.ap(O.of(amountO)), O.ap(O.of(rateO)))
    // ),
    O.map(({ amountO, rateO }) => aux(amountO)(rateO)),
    O.getOrElseW(() => null),
    money
  );
export const ch8_q3 = loanMonthlyPayment;

/**
 * Ch8 Q4
 * Write a function divide that divides numbers and returns None in case of
 * division by zero.
 */
const divide = (dividend: number) => (divisor: number) =>
  pipe(
    dividend,
    O.fromPredicate((d1) => d1 !== 0),
    O.match(
      () => O.none,
      (d1) => O.of(divisor / d1)
    )
  );
export const ch8_q4 = divide;

/**
 * Ch8 Q5
 * Explore traverse and sequence functionality of Option. Write code that takes
 * an array of numbers and, using traverseArray and divide, calculates the
 * result of dividing every number in the array. The function should return an
 * Option<number[]>. What happens if at least one division results in division
 * by zero? */

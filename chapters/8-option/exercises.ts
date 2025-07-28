import { option, readonlyArray } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import type { Option } from "fp-ts/lib/Option";
import { isGreaterThan, isNumber, prepend, toString } from "../../utils";
import { Eq as EqNumber } from "fp-ts/lib/number";

/**
 * Ch8 Q1
 * Implement an Option<number> constructor that only considers positive numbers
 * while treating everything else as None.
 */

const optionPositiveNum: (num: unknown) => Option<number> = flow(
  option.fromPredicate(isNumber),
  option.chain(option.fromPredicate(isGreaterThan(0))),
);
export const ch8_q1 = optionPositiveNum;

/**
 * Ch8 Q2
 * Modify money from this chapter such that it takes an amount and an optional
 * currency and formats accordingly:
 * money: (amount?: number, currency?: string) => string.
 *
 * For example, when called money(123, "£"), it should produce "£123.00", while
 * if currency is not provided, it falls back to "$".
 */
const currencySymbol: (currency?: string) => string = flow(
  option.fromNullable,
  option.getOrElse(() => "$"),
);

const money = (amount?: number, currency?: string): string =>
  pipe(
    option.fromNullable(amount),
    option.map(toString),
    option.map(prepend(pipe(currency, currencySymbol))),
    option.getOrElse(() => "-"),
  );

export const ch8_q2 = money;

/**
 * Ch8 Q3
 * Modify loanMonthlyPayment to use the Do notation using bind, bindTo, and let.
 */
const loanMonthlyPayment = (amount?: number, rate?: number): string | null =>
  pipe(
    option.fromNullable(amount),
    option.bindTo("amount"),
    option.bind("rate", () => option.fromNullable(rate)),
    option.map(({ amount, rate }) => amount * (rate / 12)),
    option.map(money),
    option.getOrElseW(() => null),
  );

export const ch8_q3 = loanMonthlyPayment;

/**
 * Ch8 Q4
 * Write a function divide that divides numbers and returns None in case of
 * division by zero.
 */

const divide = (a: number, b: number): Option<number> =>
  pipe(
    b,
    option.fromPredicate(divisor => !EqNumber.equals(0, divisor)),
    option.map(divisor => a / divisor),
  );
export const ch8_q4 = divide;

/**
 * Ch8 Q5
 * Explore traverse and sequence functionality of Option. Write code that takes
 * an array of numbers and, using traverseArray and divide, calculates the
 * result of dividing every number in the array. The function should return an
 * Option<number[]>. What happens if at least one division results in division
 * by zero?
 */
const readonlyArrayTraverseOption = readonlyArray.traverse(option.Applicative);
export const ch8_q5 = (nums: ReadonlyArray<number>): Option<ReadonlyArray<number>> =>
  pipe(
    nums,
    option.traverseArray(row =>
      pipe(
        nums,
        readonlyArrayTraverseOption(col => divide(row, col)),
      ),
    ),
    option.map(readonlyArray.flatten),
  );

import { either, io } from "fp-ts";
import { flow, pipe } from "fp-ts/lib/function";
import type { IO } from "fp-ts/lib/IO";
import {
  isAtLeast,
  isLessThan,
  strToUpper,
  toOrdinal,
  DAYS,
  MONTHS,
  multiplyBy,
} from "../../utils";

/**
 * Ch10 Q1
 *
 * Write a function with an IO<void> signature that gets the current day of the
 * week and displays it in all uppercase.
 */

export const dayToName = (day: number) =>
  pipe(
    day,
    either.fromPredicate(isLessThan(DAYS.length), () => `Day cannot be more than ${DAYS.length}`),
    either.chain(either.fromPredicate(isAtLeast(0), () => "Day cannot be less than 0")),
    either.map(d => DAYS[d]),
    either.getOrElse(e => e),
  );
export const getDayOfWeek = flow((d: Date) => d.getDay(), dayToName);

export const ch10_q1 = (date: Date): IO<void> =>
  pipe(io.of(getDayOfWeek(date)), io.map(strToUpper), io.map(console.log));

/**
 * Ch10 Q2
 *
 * Write a function that shows the nth occurrence of a particular weekday in the
 * current month. You can reuse the function from the previous exercise and add
 * other functions as required. Example output should be 2nd TUESDAY of MAY. Use
 * the Applicative technique or Do notation to get the same results. Which one do
 * you prefer?
 */

const monthToName = (month: number) =>
  pipe(
    month,
    either.fromPredicate(
      isLessThan(MONTHS.length),
      () => `Month cannot be more than ${MONTHS.length}`,
    ),
    either.chain(either.fromPredicate(isAtLeast(0), () => "Month cannot be less than 0")),
    either.map(m => MONTHS[m]),
    either.getOrElse(e => e),
  );
const getMonth = flow((d: Date) => d.getMonth(), monthToName);
const getDayCount = (d: Date): string =>
  pipe(d.getDate(), x => Math.ceil((x / DAYS.length) % DAYS.length), toOrdinal);

export const ch10_q2 = (date: Date): IO<void> =>
  pipe(
    io.Do,
    io.let("dayCount", () => getDayCount(date)),
    io.let("day", () => pipe(getDayOfWeek(date), strToUpper)),
    io.let("month", () => pipe(getMonth(date), strToUpper)),
    io.map(({ dayCount, day, month }) => console.log(`${dayCount} ${day} of ${month}`)),
  );

const printMessage = (dayCount: string) => (day: string) => (month: string) =>
  console.log(`${dayCount} ${day} of ${month}`);
export const ch10_q2_alt = (date: Date): IO<void> =>
  pipe(
    io.of(printMessage),
    io.ap(() => getDayCount(date)),
    io.ap(() => pipe(getDayOfWeek(date), strToUpper)),
    io.ap(() => pipe(getMonth(date), strToUpper)),
  );

/**
 * Ch10 Q3
 *
 * Explore traverseArray:
 * <A, B>(f: (a: A) => IO<B>) => (as: readonly A[]) => IO<readonly B[]> -
 * write a function that takes a number as a parameter and returns an array of
 * pseudo-random numbers using traverseArray.
 */
export const ch10_q3 = (n: number): IO<readonly number[]> =>
  pipe(
    Array.from({ length: n }),
    io.traverseArray(() => io.of(pipe(Math.random(), multiplyBy(100), Math.floor))),
  );

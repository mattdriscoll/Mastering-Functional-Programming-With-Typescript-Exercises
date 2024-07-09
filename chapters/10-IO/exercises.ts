import * as IO from "fp-ts/lib/IO";
import * as Id from "fp-ts/lib/Identity";
import { pipe } from "fp-ts/lib/function";

/**
 * Write a function with an IO<void> signature that gets the current day of the week and displays it in all uppercase.
 */
const DAYS = {
  sunday: "sunday",
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
} as const;

type DayValues = (typeof DAYS)[keyof typeof DAYS];

const dayMap: Record<number, DayValues> = [
  DAYS.sunday,
  DAYS.monday,
  DAYS.tuesday,
  DAYS.wednesday,
  DAYS.thursday,
  DAYS.friday,
  DAYS.saturday,
];

export const dayToString = (day: number): string =>
  dayMap[day] || "day not recognized";

export const toUpper = (s: string) => s.toUpperCase();

const dayToUpper = (n: number): string =>
  pipe(Id.of(n), Id.map(dayToString), Id.map(toUpper));

export const currentDayUpper = pipe(
  IO.of(new Date()),
  IO.map((d) => d.getDay()),
  IO.map(dayToUpper)
);

export const ch10_q1 = currentDayUpper;

/**
 * Write a function that shows the nth occurrence of a particular weekday in the current month. You can reuse the
 * function from the previous exercise and add other functions as required. Example output should be 2nd TUESDAY of MAY.
 * Use the Applicative technique or Do notation to get the same results. Which one do you prefer?
 */
const MONTHS = {
  january: "january",
  february: "february",
  march: "march",
  april: "april",
  may: "may",
  june: "june",
  july: "july",
  august: "august",
  september: "september",
  october: "october",
  november: "november",
  december: "december",
} as const;

type MonthValues = (typeof MONTHS)[keyof typeof MONTHS];

const monthMap: Record<number, MonthValues> = [
  MONTHS.january,
  MONTHS.february,
  MONTHS.march,
  MONTHS.april,
  MONTHS.may,
  MONTHS.june,
  MONTHS.july,
  MONTHS.august,
  MONTHS.september,
  MONTHS.october,
  MONTHS.november,
  MONTHS.december,
];

export const monthToString = (day: number): string =>
  monthMap[day] || "month not recognized";

export const monthToUpper = (n: number): string =>
  pipe(Id.of(n), Id.map(monthToString), Id.map(toUpper));

export const getNthOccuranceInMonth = (d: Date): number =>
  Math.ceil(d.getDate() / 7);

const ordinalMap: Record<number | string, string> = {
  1: "st",
  2: "nd",
  3: "rd",
  default: "th",
} as const;

const getOrdinalSuffix = (num: number) =>
  num > 3 && num < 21
    ? ordinalMap["default"]
    : !!ordinalMap[num % 10]
    ? ordinalMap[num % 10]
    : ordinalMap["default"];

export const numToOrdinal = (num: number): string =>
  `${num}${getOrdinalSuffix(num)}`;

const dateToOrdinal = (date: Date) =>
  pipe(Id.of(getNthOccuranceInMonth(date)), Id.map(numToOrdinal));

const getWeekdayNthOccuranceAp: IO.IO<string> = pipe(
  IO.of(new Date()),
  IO.chain((d) =>
    pipe(
      IO.of(dayToUpper(d.getDay())),
      IO.chain((dayStr) =>
        pipe(
          IO.of(monthToUpper(d.getMonth())),
          IO.chain((monthStr) =>
            pipe(
              IO.of(dateToOrdinal(d)),
              IO.map((ordinal) => `${ordinal} ${dayStr} of ${monthStr}`)
            )
          )
        )
      )
    )
  )
);
export const ch10_q2_ap = getWeekdayNthOccuranceAp;

const getWeekdayNthOccuranceDo: IO.IO<string> = pipe(
  IO.Do,
  IO.let("date", () => new Date()),
  IO.let("dayStr", ({ date }) => dayToUpper(date.getDay())),
  IO.let("monthStr", ({ date }) => monthToUpper(date.getMonth())),
  IO.let("ordinal", ({ date }) => dateToOrdinal(date)),
  IO.map(
    ({ dayStr, monthStr, ordinal }) => `${ordinal} ${dayStr} of ${monthStr}`
  )
);
export const ch10_q2_do = getWeekdayNthOccuranceDo;

/**
 *
 * Explore traverseArray. Write a function that takes a number as a parameter and returns an array of pseudo-random
 * numbers using traverseArray.
 *
 * traverseArray: <A, B>(f: (a: A) => IO<B>) => (as: readonly A[]) => IO<readonly B[]>
 */

export const ch10_q3 = (length: number) =>
  IO.traverseArray((num: number) => () => num)(
    Array.from({ length }, () => Math.random())
  );

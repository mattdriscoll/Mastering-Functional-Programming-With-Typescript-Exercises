export const isNumber = (a: unknown): a is number => typeof a === "number";
export const isGreaterThan = (a: number) => (b: number) => b > a;
export const isLessThan = (a: number) => (b: number) => b < a;
export const isAtLeast = (a: number) => (b: number) => b >= a;
export const isAtMost = (a: number) => (b: number) => b <= a;
export const sum = (a: number) => (b: number) => a + b;
export const multiplyBy = (a: number) => (b: number) => a * b;
export const toOrdinal = (n: number) =>
  n % 10 == 1 && n % 100 != 11
    ? `${n}st`
    : n % 10 == 2 && n % 100 != 12
      ? `${n}nd`
      : n % 10 == 3 && n % 100 != 13
        ? `${n}rd`
        : `${n}th`;

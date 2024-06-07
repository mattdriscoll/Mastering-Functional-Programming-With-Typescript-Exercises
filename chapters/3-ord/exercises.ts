import { fromCompare, type Ord } from "fp-ts/lib/Ord";
import { map, sort } from "fp-ts/lib/ReadonlyArray";
import { flow } from "fp-ts/lib/function";
import { Ord as OrdNumber } from "fp-ts/lib/number";
import type { Person } from "../2-eq/exercises";

/**
 * 1.
 * Implement an instance of Ord<Person> that orders based on length of the
 * person’s name
 */
export const PersonNameLengthOrd: Ord<Person> = fromCompare((a, b) =>
  OrdNumber.compare(a.name.length, b.name.length)
);
export const ch3_q1 = flow(
  sort(PersonNameLengthOrd),
  map((p) => p.name)
);

/**
 * 2.
 * Implement an instance of Ord<BasketEntry> with the BasketEntry
 * interface defined below, ordering should happen taking into account total
 * amount for number of products at a given price:
 */
export type BasketEntry = {
  numProducts: number;
  productPrice: number;
};
export const calcBasketEntryTotal = ({
  numProducts,
  productPrice,
}: BasketEntry) => numProducts * productPrice;
export const BasketEntryOrd: Ord<BasketEntry> = fromCompare((a, b) =>
  OrdNumber.compare(calcBasketEntryTotal(a), calcBasketEntryTotal(b))
);
export const ch3_q2 = flow(
  sort(BasketEntryOrd),
  map((be) => ({
    ...be,
    total: calcBasketEntryTotal(be),
  }))
);
// console.log("#2.", ch3_q2(basketEntries));

/**
 * 3.
 * Implement an instance of Ord<Order> where Order is a list of basket entries,
 * again ordering should happen on total amount of the order, use code from
 * previous task. Order interface is defined below:
 */
export type Order = {
  basket: BasketEntry[];
};

const add = (a: number, b: number) => a + b;
const OrderOrd: Ord<Order> = fromCompare((a, b) =>
  OrdNumber.compare(
    a.basket.map(calcBasketEntryTotal).reduce(add),
    b.basket.map(calcBasketEntryTotal).reduce(add)
  )
);
export const ch3_q3 = flow(
  sort(OrderOrd),
  map((o) => ({
    ...o,
    total: o.basket.map(calcBasketEntryTotal).reduce(add),
  }))
);

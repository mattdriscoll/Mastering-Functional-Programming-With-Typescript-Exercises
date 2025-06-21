import { Ord as OrdNumber } from "fp-ts/lib/number";
import { contramap, fromCompare, type Ord } from "fp-ts/lib/Ord";
import { sort } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import type { Person, BasketEntry, Order } from "../../types";

/**
 * 1.
 * Implement an instance of Ord<Person> that orders based on length of the
 * person’s name
 */
const ordPerson: Ord<Person> = pipe(
  OrdNumber,
  contramap(b => b.name.length),
);
/** OR: */
// const ordPerson: Ord<Person> = fromCompare((a, b) =>
//   OrdNumber.compare(a.name.length, b.name.length),
// );
const ordPeople = (people: Person[]) => pipe(people, sort(ordPerson));

export const ch3_q1 = ordPeople;

/**
 * 2.
 * Implement an instance of Ord<BasketEntry> with the BasketEntry
 * interface defined below, ordering should happen taking into account total
 * amount for number of products at a given price:
 */
const calcBasketEntryTotal = (entry: BasketEntry) => entry.numProducts * entry.productPrice;
const ordBasket: Ord<BasketEntry> = pipe(OrdNumber, contramap(calcBasketEntryTotal));
/** OR: */
// const ordBasket: Ord<BasketEntry> = fromCompare((a, b) =>
//   OrdNumber.compare(a.numProducts * a.productPrice, b.numProducts * b.productPrice),
// );

export const ch3_q2 = ordBasket;
export const sortBasketEntries = (entries: BasketEntry[]) => pipe(entries, sort(ordBasket));

/**
 * 3.
 * Implement an instance of Ord<Order> where Order is a list of basket entries,
 * again ordering should happen on total amount of the order, use code from
 * previous task.
 */
const calcOrderTotal = (order: Order) =>
  order.basket.reduce((acc, basketEntry) => acc + calcBasketEntryTotal(basketEntry), 0);
const ordOrder: Ord<Order> = pipe(
  OrdNumber,
  contramap(order => calcOrderTotal(order)),
);
/** OR: */
// const ordOrder: Ord<Order> = fromCompare((a, b) =>
//   OrdNumber.compare(calcOrderTotal(a), calcOrderTotal(b)),
// );

export const ch3_q3 = ordOrder;
export const sortOrders = (orders: Order[]) => pipe(orders, sort(ordOrder));

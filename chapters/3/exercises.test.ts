import { expect, test } from "vitest";
import { ch3_q1, ch3_q2, ch3_q3 } from "./exercises";

/**
 * #1.
 */
const people = [
  { name: "Janner", age: 13 },
  { name: "Kalmar (Tink)", age: 12 },
  { name: "Leeli", age: 8 },
];

const peopleNamesOrdered = ["Leeli", "Janner", "Kalmar (Tink)"];

test("Ch3 Q1", () => {
  expect(ch3_q1(people)).toStrictEqual(peopleNamesOrdered);
});

/**
 * #2.
 */
export const basketEntries = [
  {
    numProducts: 10,
    productPrice: 5,
  },
  {
    numProducts: 50,
    productPrice: 15,
  },
  {
    numProducts: 40,
    productPrice: 15,
  },
  {
    numProducts: 400,
    productPrice: 1,
  },
];

const basketEntriesOrdered = [
  {
    numProducts: 10,
    productPrice: 5,
    total: 50,
  },
  {
    numProducts: 400,
    productPrice: 1,
    total: 400,
  },
  {
    numProducts: 40,
    productPrice: 15,
    total: 600,
  },
  {
    numProducts: 50,
    productPrice: 15,
    total: 750,
  },
];

test("Ch3 Q2", () => {
  expect(ch3_q2(basketEntries)).toStrictEqual(basketEntriesOrdered);
});

/**
 * #3.
 */
const orders = [
  {
    basket: basketEntries,
  },
  {
    basket: [
      {
        numProducts: 25,
        productPrice: 40,
      },
      {
        numProducts: 85,
        productPrice: 30,
      },
      {
        numProducts: 95,
        productPrice: 27,
      },
    ],
  },
];

const ordersOrdered = [
  {
    basket: [
      {
        numProducts: 10,
        productPrice: 5,
      },
      {
        numProducts: 50,
        productPrice: 15,
      },
      {
        numProducts: 40,
        productPrice: 15,
      },
      {
        numProducts: 400,
        productPrice: 1,
      },
    ],
    total: 1800,
  },
  {
    basket: [
      {
        numProducts: 25,
        productPrice: 40,
      },
      {
        numProducts: 85,
        productPrice: 30,
      },
      {
        numProducts: 95,
        productPrice: 27,
      },
    ],
    total: 6115,
  },
];

test("Ch3 Q3", () => {
  expect(ch3_q3(orders)).toStrictEqual(ordersOrdered);
});

import { expect, test } from "vitest";
import { ch3_q1, ch3_q2, sortBasketEntries, ch3_q3, sortOrders } from "./exercises";

test("Ch3 Q1", () => {
  const people = [
    { name: "Janner", age: 13 },
    { name: "Kalmar (Tink)", age: 12 },
    { name: "Leeli", age: 8 },
  ];

  expect(ch3_q1(people)).toStrictEqual([people[2], people[0], people[1]]);
});

const basketEntries = [
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

test("Ch3 Q2", () => {
  const basketEntriesSorted = [
    {
      numProducts: 10,
      productPrice: 5,
    },
    {
      numProducts: 400,
      productPrice: 1,
    },
    {
      numProducts: 40,
      productPrice: 15,
    },
    {
      numProducts: 50,
      productPrice: 15,
    },
  ];

  expect(ch3_q2.compare(basketEntries[0], basketEntries[1])).toEqual(-1);
  expect(ch3_q2.compare(basketEntries[1], basketEntries[2])).toEqual(1);
  expect(ch3_q2.compare(basketEntries[1], basketEntries[1])).toEqual(0);
  expect(ch3_q2.compare(basketEntries[2], basketEntries[3])).toEqual(1);
  expect(sortBasketEntries(basketEntries)).toStrictEqual(basketEntriesSorted);
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

const ordersSorted = [
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

test("Ch3 Q3", () => {
  expect(ch3_q3.compare(orders[0], orders[1])).toEqual(-1);
  expect(ch3_q3.compare(orders[1], orders[0])).toEqual(1);
  expect(ch3_q3.compare(orders[1], orders[1])).toEqual(0);
  expect(sortOrders(orders)).toStrictEqual(ordersSorted);
});

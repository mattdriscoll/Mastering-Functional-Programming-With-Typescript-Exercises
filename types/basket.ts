/**
 * Represents an online order.
 * Made up of a basket containing a number of basket entries
 */
export type Order = {
  basket: BasketEntry[];
};

/**
 * Represents an item or group of identical items in a order's basket
 */
export type BasketEntry = {
  numProducts: number;
  productPrice: number;
};

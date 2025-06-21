export type BasketEntry = {
  numProducts: number;
  productPrice: number;
};

export type Order = {
  basket: BasketEntry[];
};

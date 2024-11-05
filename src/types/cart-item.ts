type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};

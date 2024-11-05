// Find product by id
export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
  return products.find((product) => product.id === id);
};

// Filter products by price
export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
  return products.filter((product) => product.price <= maxPrice);
};

// Add product to cart if product is not already in cart
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  // Check if quantity is positive integer
  if (!Number.isSafeInteger(quantity)) throw new Error('Quantity must be integer');
  if (quantity < 1) throw new Error('Quantity must be greater than 0');
  if (cart.some((item) => item.product.id === product.id))
    throw new Error('Product already in cart');

  const item = {
    product: product,
    quantity: quantity
  };

  cart.push(item);
  return cart;
};

// Calculate total of all products in cart
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce(
    (sum: number, item: CartItem<T>) => sum + item.product.price * item.quantity,
    0
  );
};

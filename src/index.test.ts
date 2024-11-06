import { describe, test, expect } from '@jest/globals';
import { addToCart, calculateTotal, filterByPrice, findProduct } from '.';

const clothings: Clothing[] = [
  {
    id: 0,
    name: 'I love TS Shirt',
    price: 15,
    category: 'clothing',
    description: 'Shirt with I love TS logo',
    color: 'red',
    size: 'M',
    type: 'shirts'
  },
  {
    id: 1,
    name: 'Red pants',
    price: 20,
    category: 'clothing',
    color: 'red',
    size: 'L',
    type: 'pants'
  }
];

const electronics: Electronics[] = [
  {
    id: 2,
    name: 'Samsung TV',
    price: 1000,
    category: 'electronics',
    type: 'tv',
    powerConsumption: 100
  },
  {
    id: 3,
    name: 'Mac book air M3',
    price: 1500,
    category: 'electronics',
    type: 'laptop',
    powerConsumption: 50
  }
];

const products: BaseProduct[] = [...clothings, ...electronics];

describe('Find product function', () => {
  test('Returns product if exists', () => {
    expect(findProduct(products, 0)).toEqual(clothings[0]);
  });

  test('Returns undefined not if exists', () => {
    expect(findProduct(products, 9999)).toEqual(undefined);
  });
});

describe('Filter by price function', () => {
  test('Returns products with price less than specified', () => {
    expect(filterByPrice(products, 1000)).toEqual(expect.arrayContaining(clothings));
  });
});

describe('Cart functions', () => {
  test('Adds to cart if not in cart', () => {
    let cart: CartItem<BaseProduct>[] = [];
    const expectedQuantity = 10;

    cart = addToCart(cart, products[0]!, expectedQuantity);

    expect(cart).toHaveLength(1);
    expect(cart[0]!.product).toEqual(products[0]);
    expect(cart[0]!.quantity).toEqual(expectedQuantity);
  });

  test('Throws error if already in cart', () => {
    const cart: CartItem<BaseProduct>[] = [
      {
        product: products[0]!,
        quantity: 5
      }
    ];

    expect(() => addToCart(cart, products[0]!, 5)).toThrowError();
  });

  test('Throws error if quantity is not an integer', () => {
    const cart: CartItem<BaseProduct>[] = [];
    expect(() => addToCart(cart, products[0]!, 5.5)).toThrowError();
  });

  test('Throws error if quantity is less than 1', () => {
    const cart: CartItem<BaseProduct>[] = [];
    expect(() => addToCart(cart, products[0]!, 0)).toThrowError();
  });
});

describe('Calculate total function', () => {
  test('Returns total', () => {
    const expectedTotal = products[0]!.price * 5 + products[1]!.price;
    const cart: CartItem<BaseProduct>[] = [
      {
        product: products[0]!,
        quantity: 5
      },
      {
        product: products[1]!,
        quantity: 1
      }
    ];

    expect(calculateTotal(cart)).toEqual(expectedTotal);
  });

  test('Returns 0 if empty', () => {
    const cart: CartItem<BaseProduct>[] = [];
    expect(calculateTotal(cart)).toEqual(0);
  });
});

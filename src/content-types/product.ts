interface Product extends BaseContent {
  name: string;
  description?: string;
  availability: 'available' | 'out of stock';
  price?: Price;
}

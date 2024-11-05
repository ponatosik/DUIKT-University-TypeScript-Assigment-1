type Clothing = BaseProduct & {
  category: 'clothing';
  color: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  type: 'shirts' | 'pants' | 'shoes';
};

type Electronics = BaseProduct & {
  category: 'electronics';
  type: 'phone' | 'pc' | 'laptop' | 'tv';
  powerConsumption: number;
};

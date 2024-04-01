export interface Product {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  priceInCents: number;
  ingredients: {
    ingredient: {
      id: string;
      name: string;
      emoji: string;
    };
  }[];
}

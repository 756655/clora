export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Women' | 'Men' | 'Accessories';
  material: string;
  images: string[];
  isSustainable: boolean;
  impact: string; // e.g., "Saves 200L of water"
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type Category = 'All' | 'Women' | 'Men' | 'Accessories';

import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton Trench',
    price: 180,
    description: 'A classic trench coat made from 100% certified organic cotton. Designed for durability and timeless style.',
    category: 'Women',
    material: 'Organic Cotton',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Saves 2,500 liters of water compared to conventional cotton.'
  },
  {
    id: '2',
    name: 'Recycled Wool Sweater',
    price: 120,
    description: 'Cozy and conscious. This sweater is knitted from high-quality recycled wool fibers.',
    category: 'Men',
    material: 'Recycled Wool',
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Reduces landfill waste by 1.2kg per garment.'
  },
  {
    id: '3',
    name: 'Hemp Linen Shirt',
    price: 95,
    description: 'Breathable and beautiful. Hemp requires less water and no pesticides to grow.',
    category: 'Women',
    material: 'Hemp & Organic Linen',
    images: ['https://images.unsplash.com/photo-1604066867005-4b4979f0ecbd?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Carbon-negative crop that enriches the soil.'
  },
  {
    id: '4',
    name: 'Bamboo Fibers Scarf',
    price: 45,
    description: 'Soft as silk, but made from fast-growing bamboo. Naturally antibacterial.',
    category: 'Accessories',
    material: 'Bamboo Viscose',
    images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Bamboo absorbs 5x more CO2 than an equivalent stand of trees.'
  },
  {
    id: '5',
    name: 'Upcycled Denim Jacket',
    price: 150,
    description: 'Each piece is unique, crafted from salvaged vintage denim to reduce waste.',
    category: 'Men',
    material: 'Upcycled Denim',
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Diverts textile waste from incinerators.'
  },
  {
    id: '6',
    name: 'Tencel Lyocell Dress',
    price: 140,
    description: 'Silky smooth dress made from sustainably harvested wood pulp.',
    category: 'Women',
    material: 'Tencel Lyocell',
    images: ['https://images.unsplash.com/photo-1549439602-43bbcb4320a2?q=80&w=800&auto=format&fit=crop'],
    isSustainable: true,
    impact: 'Closed-loop production process where 99% of solvents are recycled.'
  }
];

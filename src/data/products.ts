import type { Product } from '../types/billing';

export const products: Product[] = [
  {
    id: 'bread',
    name: 'Bread',
    pricePaise: 2000,
    emoji: '🍞',
    category: 'Bakery',
    offer: {
      type: 'NONE',
      description: 'No special offer',
    },
  },

  {
    id: 'milk',
    name: 'Milk',
    pricePaise: 5000,
    emoji: '🥛',
    category: 'Dairy',
    offer: {
      type: 'NONE',
      description: 'No special offer',
    },
  },

  {
    id: 'cheese',
    name: 'Cheese',
    pricePaise: 10000,
    emoji: '🧀',
    category: 'Dairy',
    offer: {
      type: 'BUY_X_GET_Y',
      description: 'Buy 1, get 1 free',
      buyQuantity: 1,
      freeQuantity: 1,
    },
  },

  {
    id: 'soup',
    name: 'Soup',
    pricePaise: 6000,
    emoji: '🍲',
    category: 'Food',
    offer: {
      type: 'HALF_PRICE_ITEM',
      description: 'Get a bread at half price',
      minQuantity: 1,
      targetProductId: 'bread',
      discountPercentage: 50,
    },
  },

  {
    id: 'butter',
    name: 'Butter',
    pricePaise: 12000,
    emoji: '🧈',
    category: 'Dairy',
    offer: {
      type: 'PERCENTAGE',
      description: '1/3 off',
      minQuantity: 1,
      discountPercentage: 33.333333,
    },
  },
];
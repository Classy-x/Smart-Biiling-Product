export type OfferType = 'BUY_X_GET_Y' | 'PERCENTAGE' | 'FIXED_PRICE' | 'HALF_PRICE_ITEM' | 'NONE';

export interface Product {
  id: string;
  name: string;
  pricePaise: number;
  emoji: string;
  category: string;
  offer?: Offer;
}

export interface Offer {
  type: OfferType;
  description: string;
  minQuantity?: number;
  buyQuantity?: number;
  freeQuantity?: number;
  discountPercentage?: number;
  offerPricePaise?: number;
  targetProductId?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface AppliedOffer {
  productId: string;
  productName: string;
  description: string;
  savingPaise: number;
}

export interface Bill {
  subtotalPaise: number;
  savingsPaise: number;
  totalPaise: number;
  appliedOffers: AppliedOffer[];
}

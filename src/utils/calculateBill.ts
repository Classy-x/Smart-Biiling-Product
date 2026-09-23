
import type {
  AppliedOffer,
  Bill,
  CartItem,
  Product,
} from '../types/billing';

const calculateOfferSaving = (
  product: Product,
  quantity: number,
): AppliedOffer | null => {
  const offer = product.offer;

  if (!offer || offer.type === 'NONE') {
    return null;
  }

  switch (offer.type) {
    case 'BUY_X_GET_Y': {
      const buyQuantity = offer.buyQuantity ?? 0;
      const freeQuantity = offer.freeQuantity ?? 0;

      if (buyQuantity <= 0 || freeQuantity <= 0) {
        return null;
      }

      const bundleSize = buyQuantity + freeQuantity;

      const freeItems =
        Math.floor(quantity / bundleSize) * freeQuantity;

      if (freeItems === 0) {
        return null;
      }

      return {
        productId: product.id,
        productName: product.name,
        description: offer.description,
        savingPaise: freeItems * product.pricePaise,
      };
    }

    case 'PERCENTAGE': {
      const minQuantity =
        offer.minQuantity ?? Number.MAX_SAFE_INTEGER;

      const percentage = offer.discountPercentage ?? 0;

      if (quantity < minQuantity || percentage <= 0) {
        return null;
      }

      return {
        productId: product.id,
        productName: product.name,
        description: offer.description,
        savingPaise: Math.round(
          (quantity * product.pricePaise * percentage) / 100,
        ),
      };
    }

    case 'FIXED_PRICE': {
      const minQuantity = offer.minQuantity ?? 0;
      const bundleQuantity = offer.buyQuantity ?? 0;
      const offerPricePaise = offer.offerPricePaise ?? 0;

      if (
        quantity < minQuantity ||
        bundleQuantity <= 0 ||
        offerPricePaise <= 0
      ) {
        return null;
      }

      const bundles = Math.floor(quantity / bundleQuantity);

      const savingPerBundle =
        bundleQuantity * product.pricePaise - offerPricePaise;

      const savingPaise = Math.max(
        0,
        bundles * savingPerBundle,
      );

      if (savingPaise === 0) {
        return null;
      }

      return {
        productId: product.id,
        productName: product.name,
        description: offer.description,
        savingPaise,
      };
    }

    // HALF_PRICE_ITEM is handled separately in calculateBill
    // because it discounts another product.
    case 'HALF_PRICE_ITEM':
      return null;

    default:
      return null;
  }
};

export const calculateBill = (
  cartItems: CartItem[],
  productList: Product[],
): Bill => {
  const productMap = new Map(
    productList.map((product) => [product.id, product]),
  );
  console.log(productMap,"productMap",cartItems,"cartItems");
  
  // Calculate subtotal before offers
  const subtotalPaise = cartItems.reduce((subtotal, item) => {
    const product = productMap.get(item.productId);

    return (
      subtotal +
      (product ? product.pricePaise * item.quantity : 0)
    );
  }, 0);

  const appliedOffers: AppliedOffer[] = [];

  // --------------------------------------------------
  // 1. Normal product offers
  // --------------------------------------------------
  cartItems.forEach((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      return;
    }

    const appliedOffer = calculateOfferSaving(
      product,
      item.quantity,
    );
    console.log(appliedOffer,"appliedOffer");
    

    if (appliedOffer) {
      appliedOffers.push(appliedOffer);
    }
  });

  // --------------------------------------------------
  // 2. Cross-product offers
  //
  // Example:
  // Buy Soup -> Bread is 50% off
  // --------------------------------------------------
  cartItems.forEach((item) => {
    const product = productMap.get(item.productId);

    if (!product?.offer) {
      return;
    }

    const offer = product.offer;

    if (offer.type !== 'HALF_PRICE_ITEM') {
      return;
    }

    const targetProductId = offer.targetProductId;
    const discountPercentage = offer.discountPercentage ?? 0;
    const minQuantity = offer.minQuantity ?? 1;

    if (!targetProductId || discountPercentage <= 0) {
      return;
    }

    // Example:
    // Soup quantity = 1
    // Minimum quantity = 1
    //
    // Offer is active.
    if (item.quantity < minQuantity) {
      return;
    }

    // Find Bread in the cart
    const targetCartItem = cartItems.find(
      (cartItem) =>
        cartItem.productId === targetProductId,
    );

    // User has Soup but no Bread.
    // Therefore no discount can be applied.
    if (!targetCartItem) {
      return;
    }

    const targetProduct = productMap.get(targetProductId);

    if (!targetProduct) {
      return;
    }

    // One Soup can give the discount to one Bread.
    //
    // Example:
    // Soup = 2
    // Bread = 1
    // Discounted Bread = 1
    //
    // Soup = 2
    // Bread = 3
    // Discounted Bread = 2
    const discountedQuantity = Math.min(
      item.quantity,
      targetCartItem.quantity,
    );

    const savingPaise = Math.round(
      discountedQuantity *
        targetProduct.pricePaise *
        (discountPercentage / 100),
    );

    if (savingPaise <= 0) {
      return;
    }

    appliedOffers.push({
      productId: product.id,
      productName: product.name,
      description: offer.description,
      savingPaise,
    });
  });

  // --------------------------------------------------
  // 3. Total savings
  // --------------------------------------------------
  const savingsPaise = appliedOffers.reduce(
    (total, offer) => total + offer.savingPaise,
    0,
  );

  // --------------------------------------------------
  // 4. Final total
  // --------------------------------------------------
  const totalPaise = Math.max(
    0,
    subtotalPaise - savingsPaise,
  );

  return {
    subtotalPaise,
    savingsPaise,
    totalPaise,
    appliedOffers,
  };
};
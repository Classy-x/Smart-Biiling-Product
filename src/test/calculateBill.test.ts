import { describe, expect, it } from 'vitest';
import { products } from '../data/products';
import { calculateBill } from '../utils/calculateBill';

describe('calculateBill', () => {
  it('calculates Buy 1 Get 1 Free offer for cheese', () => {
    const bill = calculateBill(
      [{ productId: 'cheese', quantity: 2 }],
      products,
    );

    expect(bill.subtotalPaise).toBe(20000);
    expect(bill.savingsPaise).toBe(10000);
    expect(bill.totalPaise).toBe(10000);
  });

  it('calculates percentage discount for butter', () => {
    const bill = calculateBill(
      [{ productId: 'butter', quantity: 1 }],
      products,
    );

    expect(bill.subtotalPaise).toBe(12000);
    expect(bill.savingsPaise).toBe(4000);
    expect(bill.totalPaise).toBe(8000);
  });

  it('applies Soup offer and gives Bread 50% off', () => {
    const bill = calculateBill(
      [
        { productId: 'soup', quantity: 1 },
        { productId: 'bread', quantity: 1 },
      ],
      products,
    );

    // Soup = ₹60
    // Bread = ₹20
    // Subtotal = ₹80
    expect(bill.subtotalPaise).toBe(8000);

    // Bread gets 50% off = ₹10
    expect(bill.savingsPaise).toBe(1000);

    // Final = ₹80 - ₹10
    expect(bill.totalPaise).toBe(7000);

    expect(bill.appliedOffers).toHaveLength(1);
    expect(bill.appliedOffers[0]).toMatchObject({
      productId: 'soup',
      productName: 'Soup',
      savingPaise: 1000,
    });
  });

  it('does not apply Soup offer when Bread is not in the cart', () => {
    const bill = calculateBill(
      [{ productId: 'soup', quantity: 1 }],
      products,
    );

    expect(bill.subtotalPaise).toBe(6000);
    expect(bill.savingsPaise).toBe(0);
    expect(bill.totalPaise).toBe(6000);
    expect(bill.appliedOffers).toHaveLength(0);
  });

  it('applies Bread discount based on Soup quantity', () => {
    const bill = calculateBill(
      [
        { productId: 'soup', quantity: 2 },
        { productId: 'bread', quantity: 2 },
      ],
      products,
    );

    // Soup = ₹60 × 2 = ₹120
    // Bread = ₹20 × 2 = ₹40
    // Subtotal = ₹160
    expect(bill.subtotalPaise).toBe(16000);

    // Both breads get 50% off
    // ₹20 × 50% × 2 = ₹20
    expect(bill.savingsPaise).toBe(2000);

    // ₹160 - ₹20 = ₹140
    expect(bill.totalPaise).toBe(14000);
  });

  it('does not discount more Bread items than Soup items', () => {
    const bill = calculateBill(
      [
        { productId: 'soup', quantity: 1 },
        { productId: 'bread', quantity: 3 },
      ],
      products,
    );

    // Soup = ₹60
    // Bread = ₹20 × 3 = ₹60
    // Subtotal = ₹120
    expect(bill.subtotalPaise).toBe(12000);

    // Only 1 Bread gets 50% off
    // Saving = ₹10
    expect(bill.savingsPaise).toBe(1000);

    expect(bill.totalPaise).toBe(11000);
  });

  it('returns an empty bill for an empty cart', () => {
    expect(calculateBill([], products)).toEqual({
      subtotalPaise: 0,
      savingsPaise: 0,
      totalPaise: 0,
      appliedOffers: [],
    });
  });
});

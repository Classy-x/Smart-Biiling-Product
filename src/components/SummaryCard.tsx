import { useState } from 'react';
import type { Bill, CartItem } from '../types/billing';
import { OfferSummary } from './OfferSummary';
import { saveBill } from '../services/billService';

interface SummaryCardProps {
  bill: Bill;
  items: CartItem[];
  onSaveSuccess: () => void;
}

export const SummaryCard = ({
  bill,
  items,
  onSaveSuccess
}: SummaryCardProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveBill = async () => {
    if (items.length === 0) {
      return;
    }

    try {
      setIsSaving(true);

      const orderId = await saveBill(items, bill);
      onSaveSuccess()
      alert(`Bill saved successfully!\nOrder ID: ${orderId}`);
    } catch (error) {
      console.error('Failed to save bill:', error);
      alert('Failed to save bill. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border bg-white p-4">
      <h2 className="text-lg font-semibold">
        Bill Summary
      </h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal before offers
          </span>

          <span>
            ₹{(bill.subtotalPaise / 100).toFixed(2)}
          </span>
        </div>

        <OfferSummary offers={bill.appliedOffers} />

        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-600">
            Total Savings
          </span>

          <span className="text-green-600">
            -₹{(bill.savingsPaise / 100).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3 text-lg font-semibold">
          <span>Final Total</span>

          <span>
            ₹{(bill.totalPaise / 100).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSaveBill}
          disabled={items.length === 0 || isSaving}
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Bill'}
        </button>
      </div>
    </div>
  );
};

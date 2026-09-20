import type { Bill } from '../types/billing';
import { OfferSummary } from './OfferSummary';

interface SummaryCardProps {
  bill: Bill;
}

export const SummaryCard = ({ bill }: SummaryCardProps) => (
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
    </div>
  </div>
);
import type { AppliedOffer } from '../types/billing';

interface OfferSummaryProps {
  offers: AppliedOffer[];
}

export const OfferSummary = ({ offers }: OfferSummaryProps) => (
  <div className="mt-5">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-bold text-slate-900">Special offers</h3>
      <span className="text-xs text-slate-400">{offers.length} applied</span>
    </div>

    {offers.length === 0 ? (
      <p className="rounded-xl bg-slate-50 px-3 py-3 text-sm text-slate-500">
        Add qualifying quantities to unlock special offers.
      </p>
    ) : (
      <div className="space-y-2">
        {offers.map((offer) => (
          <div
            key={offer.productId}
            className="flex items-start justify-between gap-4 rounded-xl bg-emerald-50 px-3 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                {offer.productName}
              </p>
              <p className="mt-0.5 text-xs text-emerald-700">
                {offer.description}
              </p>
            </div>
            <span className="whitespace-nowrap text-sm font-bold text-emerald-700">
              -₹{(offer.savingPaise / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

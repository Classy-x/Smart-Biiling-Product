import type { Product } from '../types/billing';

interface CartItemProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  isDiasble: boolean;
}

export const CartItem = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  isDiasble,
}: CartItemProps) => (
  <div className="flex gap-3 border-b py-3 last:border-0">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-100 text-lg">
      {product.emoji}
    </div>

    <div className="min-w-0 flex-1">
      <div className="flex justify-between gap-2">
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-xs text-gray-500">
            ₹{(product.pricePaise / 100).toFixed(2)} each
          </p>
        </div>

        <p className="font-medium">
          ₹{((product.pricePaise * quantity) / 100).toFixed(2)}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center border">
          <button
            type="button"
            onClick={onDecrement}
            aria-label={`Decrease ${product.name} quantity`}
            className="px-2 py-1 hover:bg-gray-100"
            //decreament no need to disabled
            // disabled={isDiasble ? `disabled`:""}
          >
            −
          </button>

          <span className="px-3 text-sm">
            {quantity}
          </span>

          <button
            type="button"
            disabled={isDiasble}
            onClick={onIncrement}
            aria-label={`Increase ${product.name} quantity`}
            className="px-2 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

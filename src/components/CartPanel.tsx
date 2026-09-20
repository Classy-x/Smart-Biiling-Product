import type { Bill, Product } from '../types/billing';
import type { CartItem as CartItemType } from '../types/billing';
import { CartItem } from './CartItem';
import { SummaryCard } from './SummaryCard';

interface CartPanelProps {
  items: CartItemType[];
  products: Product[];
  bill: Bill;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export const CartPanel = ({
  items,
  products,
  bill,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}: CartPanelProps) => {
  const productMap = new Map(
    products.map((product) => [product.id, product])
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <aside className="lg:sticky lg:top-4 lg:self-start">
      <div className="border bg-white p-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold">
              Cart
            </h2>

            <p className="text-sm text-gray-500">
              {totalItems} item(s)
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Clear
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          <div>
            {items.map((item) => {
              const product = productMap.get(item.productId);

              if (!product) return null;

              return (
                <CartItem
                  key={item.productId}
                  product={product}
                  quantity={item.quantity}
                  onIncrement={() => onIncrement(item.productId)}
                  onDecrement={() => onDecrement(item.productId)}
                  onRemove={() => onRemove(item.productId)}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4">
        <SummaryCard bill={bill} />
      </div>
    </aside>
  );
};
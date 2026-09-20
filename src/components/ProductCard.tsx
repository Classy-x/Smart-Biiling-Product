import type { Product } from '../types/billing';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
}

export const ProductCard = ({
  product,
  quantity,
  onAdd,
}: ProductCardProps) => (
  <div className="border bg-white p-4">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center bg-gray-100 text-xl">
        {product.emoji}
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        <h3 className="font-semibold">
          {product.name}
        </h3>
      </div>
    </div>

    <p className="mt-4 text-lg font-semibold">
      ₹{(product.pricePaise / 100).toFixed(2)}
    </p>

    {product.offer && product.offer.type !== 'NONE' && (
      <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
        {product.offer.description}
      </div>
    )}

    <button
      type="button"
      onClick={onAdd}
      className="mt-4 w-full border border-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white"
    >
      Add
    </button>

    {quantity > 0 && (
      <p className="mt-2 text-center text-xs text-gray-500">
        {quantity} in cart
      </p>
    )}
  </div>
);
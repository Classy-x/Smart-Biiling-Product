import type { Product } from '../types/billing';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  quantities: Record<string, number>;
  onAdd: (productId: string) => void;
}

export const ProductGrid = ({
  products,
  quantities,
  onAdd,
}: ProductGridProps) => (
  <div>
    <div className="mb-4">
      <h2 className="text-xl font-semibold">
        Products
      </h2>

      <p className="text-sm text-gray-500">
        Select products to add to your cart
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          onAdd={() => onAdd(product.id)}
        />
      ))}
    </div>
  </div>
);
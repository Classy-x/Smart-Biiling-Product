import { useMemo } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { CartPanel } from './components/CartPanel';
import { products } from './data/products';
import {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from './features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { calculateBill } from './utils/calculateBill';

function App() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const bill = useMemo(
    () => calculateBill(cartItems, products),
    [cartItems],
  );

  const quantities = useMemo(
    () =>
      cartItems.reduce<Record<string, number>>((result, item) => {
        result[item.productId] = item.quantity;
        return result;
      }, {}),
    [cartItems],
  );
  //5000 
  //maxReachCal = 5000 / 10 = 500
  const maxBudget = 5000;
  const maxReachCal = (maxBudget / 10)
  const totalMax = (bill.totalPaise/10)
  const tatalReach = bill.totalPaise - totalMax
  console.log(bill.totalPaise,"bill.totalPaise",maxReachCal,"maxReachCal");
  const maxreach = bill.totalPaise - maxReachCal
  // console.log((90 /100) * ,"90%");
  console.log(maxreach >= bill.totalPaise,"condition");
  console.log(maxreach,"maxreach");
  
  if(maxreach >= tatalReach){
      alert("You Total Amount has reached 90%")
      // return;
  }
  let isDiasble = false
  if(bill.totalPaise>=maxBudget){
    isDiasble = true;
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <ProductGrid
            products={products}
            quantities={quantities}
            onAdd={(productId) => dispatch(addToCart(productId))}
            isDiasble={isDiasble}
          />

          <CartPanel
            items={cartItems}
            products={products}
            bill={bill}
            onIncrement={(productId) => dispatch(incrementQuantity(productId))}
            onDecrement={(productId) => dispatch(decrementQuantity(productId))}
            onRemove={(productId) => dispatch(removeFromCart(productId))}
            onClear={() => dispatch(clearCart())}
            onSaveSuccess={() => dispatch(clearCart())}
            isDiasble={isDiasble}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-xs text-slate-400 tracking-[0.2em]">
          SMARTBILL
        </p>
      </div>
    </div>
  );
}

export default App;

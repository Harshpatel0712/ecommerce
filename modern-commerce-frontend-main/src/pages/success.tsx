import { createFileRoute, Navigate } from '@tanstack/react-router';
import { Check, ShoppingBag } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { useCart } from '~/store/cart-store';

export const Route = createFileRoute('/success')({
  component: Success,
});

function Success() {
  const { resetCart, totalProducts } = useCart();
  const totalProductsValue = useRef(totalProducts);

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  if (totalProductsValue.current === 0) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-center text-2xl font-semibold">Order Completed!</h2>
          <p className="text-center text-sm text-muted-foreground">Thank you for your purchase</p>
        </div>
        <div className="p-6 pt-0">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-center text-gray-600">
              We&apos;ll send you an email with your order details and tracking information.
            </p>
          </div>
        </div>
        <div className="flex items-center p-6 pt-0">
          <a href="/" className="w-full">
            <Button className="flex w-full items-center justify-center gap-x-2">
              <span>Continue Shopping</span>
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

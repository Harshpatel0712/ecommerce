import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Minus, Plus, Trash2Icon, X } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';
import { useCart } from '~/store/cart-store';

export const Route = createFileRoute('/(app)/_layout/cart/')({
  component: CartPage,
});

function CartPage() {
  const {
    products: cartItems,
    removeProducts,
    totalPrice,
    resetCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice !== 0 ? 20.99 : 0.0;
  const total = totalPrice + shipping;

  return (
    <div className="flex max-h-[calc(100vh-3rem)] flex-col py-10">
      <div className="flex w-full justify-between">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        <Button
          variant="outline"
          className={cn(
            'border-red-500 text-red-500 hover:border-red-400 hover:bg-red-200/35 hover:text-red-500',
            {
              invisible: cartItems.length === 0,
            },
          )}
          onClick={resetCart}
        >
          <Trash2Icon />
          Clear Cart
        </Button>
      </div>
      <div className="grid flex-1 gap-8 overflow-hidden lg:grid-cols-3">
        <div className="flex flex-col overflow-hidden lg:col-span-2">
          <div className="flex-1 overflow-auto rounded-md border p-6">
            {cartItems.length === 0 && (
              <div className="flex h-full w-full items-center justify-center">
                <h1 className="text-xl font-medium text-gray-400">Cart is empty</h1>
              </div>
            )}
            {cartItems &&
              cartItems.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.media}
                        alt={item.title}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            decreaseQuantity(item);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input value={item.quantity} className="h-8 w-16 text-center" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            increaseQuantity(item);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500"
                        onClick={() => removeProducts(item)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
        <div className="lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!cartItems.length}
                onClick={() => {
                  navigate({ to: '/checkout' });
                }}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

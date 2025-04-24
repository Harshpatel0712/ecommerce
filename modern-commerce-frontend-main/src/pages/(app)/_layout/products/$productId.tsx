import { Minus, Plus, ShoppingCart } from 'lucide-react';

import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductLoadingSkeleton from '~/components/ProductLoadingSkeleton';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { fetchProduct } from '~/hooks/use-product';
import { useCart } from '~/store/cart-store';

export const Route = createFileRoute('/(app)/_layout/products/$productId')({
  component: ProductDetail,
  async loader(ctx) {
    return fetchProduct(Number(ctx.params.productId));
  },
  pendingComponent: ProductLoadingSkeleton,
  errorComponent: () => <p>Error</p>,
  preload: true,
  staleTime: Infinity,
});

export default function ProductDetail() {
  const product = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const { addProducts, products } = useCart();

  const getCartQuantity = () => {
    const cartItem = products.find((item) => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };
  const getMaxQuantity = () => {
    if (product.inventory && product.inventory.tracking) {
      const cartQuantity = getCartQuantity();
      return Math.max(0, product.inventory.quantity - cartQuantity);
    }
    return Number.MAX_SAFE_INTEGER;
  };

  const handleIncrement = () => {
    const maxQuantity = getMaxQuantity();
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const isIncrementDisabled = () => {
    const maxQuantity = getMaxQuantity();
    return quantity >= maxQuantity || maxQuantity === 0;
  };

  const isOutOfStock = () => {
    return product.inventory && product.inventory.tracking && product.inventory.quantity <= 0;
  };
  const isAddToCartDisabled = () => {
    // Disable if out of stock
    if (isOutOfStock()) {
      return true;
    }

    // Disable if trying to add more than available quantity
    const maxQuantity = getMaxQuantity();
    if (maxQuantity === 0) {
      return true;
    }

    // Disable if selected quantity would exceed available quantity
    const cartQuantity = getCartQuantity();
    if (product.inventory && product.inventory.tracking) {
      return cartQuantity + quantity > product.inventory.quantity;
    }

    return false;
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-10 py-8 xl:w-[60%]">
      <div className="mt-0 grid gap-8 sm:mt-5 md:grid-cols-2">
        <img
          src={product.media}
          alt={product.title}
          className="size-[350px] w-full rounded-lg md:h-[350px] md:w-[713px] lg:size-[470px] xl:size-[400px]"
        />

        {/* Product Information */}
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <Badge variant="default">{product?.category.title}</Badge>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">€{product?.price.toFixed(2)}</span>
          </div>
          {!product.inventory ||
          !product.inventory.tracking ||
          (product.inventory.tracking && product.inventory.quantity > 0) ? (
            <Badge className="bg-green-600 hover:bg-green-600/80">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}

          {/* Quantity Selection */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-10 text-center text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={isIncrementDisabled()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="mt-4 w-full"
            disabled={isAddToCartDisabled()}
            onClick={() => {
              addProducts(product, quantity);
              setQuantity(1);
              toast.info(`${product.title} Added`);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-3">
        <h1 className="text-2xl font-bold text-primary">Product Description</h1>
        <p className="text-md text-balance text-justify">{product?.description}</p>
      </div>
    </div>
  );
}

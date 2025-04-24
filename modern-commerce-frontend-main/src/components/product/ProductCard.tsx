import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Product } from '~/hooks/use-products';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const preloadProductPage = async () => {
      try {
        await router.preloadRoute({
          to: `/products/$productId`,
          params: { productId: String(product.id) },
        });
      } catch (error) {
        console.log(error);
      }
    };

    preloadProductPage();
  }, [router, product.id]);

  return (
    <Card
      className="flex h-full cursor-pointer flex-col"
      onClick={() => {
        navigate({ to: `/products/${product.id}`, replace: false });
      }}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.media}
            alt={product.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="mb-2 text-lg font-semibold">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
        <Badge variant="default">{product.category.title}</Badge>
      </CardFooter>
    </Card>
  );
}

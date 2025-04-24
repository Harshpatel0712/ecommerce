import { PackageSearch } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useProducts } from '~/hooks/use-products';
import { Route } from '~/pages/(app)/_layout/products';
import ProductsLoadingSkeleton from '../ProductsLoadingSkeleton';
import { ProductCard } from './ProductCard';

const NothingFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
      <PackageSearch className="mb-4 h-16 w-16 text-muted-foreground" />
      <h2 className="mb-2 text-2xl font-bold tracking-tight">No Products Found</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        We couldn{"'"}t find any products matching your criteria. Try adjusting your filters or
        search terms.
      </p>
    </div>
  );
};

export function ProductGrid() {
  const searchParams = Route.useSearch();
  const [page] = useQueryState('page', { defaultValue: 1, parse: Number });
  const { data: products = [], isFetching } = useProducts(page, searchParams);

  if (isFetching) {
    return <ProductsLoadingSkeleton />;
  }

  if (products.length === 0) {
    return <NothingFound />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

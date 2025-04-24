import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/_layout/products/')({
  component: ProductsPage,
});

import { SlidersHorizontal } from 'lucide-react';
import { Suspense } from 'react';
import { ProductFilters } from '~/components/product/ProductFilters';
import { ProductGrid } from '~/components/product/ProductGrid';
import { ProductsPagination } from '~/components/product/ProductsPagination';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

export function ProductsPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex gap-6">
          <aside className="hidden w-[300px] flex-shrink-0 overflow-y-auto lg:block">
            <Suspense>
              <ProductFilters />
            </Suspense>
          </aside>
          <div className="flex w-full flex-col gap-10">
            <h1 className="size-5 text-3xl font-medium">Products</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-fit lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <Suspense>
                  <ProductFilters />
                </Suspense>
              </SheetContent>
            </Sheet>
            <main className="flex-1">
              <ProductsPagination />
              <ProductGrid />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

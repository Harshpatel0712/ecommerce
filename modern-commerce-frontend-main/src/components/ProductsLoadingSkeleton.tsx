import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function ProductsLoadingSkeleton() {
  const productsLoader = Array(10).fill(0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {productsLoader.map((_, idx) => (
        <Card key={idx} className="flex h-full flex-col">
          <CardHeader className="p-0">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Skeleton className="absolute inset-0" />
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3 p-4">
            <Skeleton className="h-5 w-4/5" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <Skeleton className="h-6 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

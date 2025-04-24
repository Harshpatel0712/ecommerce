import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { fetchAllProducts } from '~/hooks/use-products';
import { cn } from '~/lib/utils';
import { Route } from '~/pages/(app)/_layout/products';
import { Button } from '../ui/button';

export function ProductsPagination() {
  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number });
  const search = Route.useSearch();

  const { data } = useQuery({
    queryKey: ['products', page, search],
    queryFn: () => fetchAllProducts(page, search),
    enabled: false,
  });

  const getPreviousPage = async () => {
    if (data && data.has_previous) setPage(data.previous);
  };

  const getNextPage = async () => {
    if (data && data.has_next) setPage(data.next);
  };

  const paginationEnabled = !data?.has_next && !data?.has_previous;

  return (
    <div
      className={cn('flex flex-1 items-center justify-between gap-x-2 py-5', {
        invisible: paginationEnabled,
      })}
    >
      <Button disabled={!data || !data.has_previous} onClick={getPreviousPage}>
        Previous
      </Button>
      <Button disabled={!data || !data.has_next} onClick={getNextPage}>
        Next
      </Button>
    </div>
  );
}

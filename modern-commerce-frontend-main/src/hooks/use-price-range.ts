import { useSuspenseQuery } from '@tanstack/react-query';
import { http } from '~/lib/http';

const fetchPriceRange = async () => {
  const response = await http.get('/products/price-range');
  return response.data;
};

export default function usePriceRange() {
  return useSuspenseQuery({
    queryFn: fetchPriceRange,
    queryKey: ['price-range'],
    staleTime: Infinity, // never refetch again,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  });
}

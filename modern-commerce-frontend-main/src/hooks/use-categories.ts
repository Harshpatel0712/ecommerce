import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { http } from '~/lib/http';
import { ProductCategory } from './use-products';

const Response = z.array(ProductCategory);

export const fetchCategories = async () => {
  const response = await http.get('/products/category');
  const parsedResponse = await Response.parseAsync(response.data);
  return parsedResponse;
};

export function useCategories() {
  return useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity, // never refetch again,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  });
}

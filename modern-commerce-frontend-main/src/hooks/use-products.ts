import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { http } from '~/lib/http';
import { wait } from '~/lib/utils';

export const ProductCategory = z.object({
  id: z.number(),
  title: z.string(),
});

export const ProductInventory = z
  .object({
    quantity: z.number(),
    tracking: z.boolean(),
  })
  .nullable();

export type ProductInventory = z.infer<typeof ProductInventory>;

export type ProductCategory = z.infer<typeof ProductCategory>;

export const Product = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  category: ProductCategory,
  inventory: ProductInventory,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  media: z.string().url().default('https://placehold.co/5000x5000'),
});

export type Product = z.infer<typeof Product>;

const ResponseSchema = z.object({
  count: z.number(),
  results: z.array(Product),
  has_next: z.boolean(),
  next: z.number().nullable(),
  has_previous: z.boolean(),
  previous: z.number().nullable(),
});

export const fetchAllProducts = async (page: number, query: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams(query);

  if (searchParams.has('page')) {
    searchParams.delete('page');
  }
  searchParams.append('page', String(page));

  const response = await http.get(`/products?${searchParams}`);
  const parsedResponse = await ResponseSchema.parseAsync(response.data);
  return parsedResponse;
};

export function useProducts(page = 1, search: Record<string, string> = {}) {
  return useQuery({
    queryKey: ['products', page, search],
    queryFn: async () => {
      const [response] = await Promise.all([fetchAllProducts(page, search), wait(1000)]);
      return response;
    },
    select: ({ results }) => results,
    staleTime: Infinity,
    refetchOnMount: false,
  });
}

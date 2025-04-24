import { useQuery } from '@tanstack/react-query';
import { http } from '~/lib/http';
import { Product } from './use-products';

export const fetchProduct = async (productId: number) => {
  const response = await http.get(`/products/${productId}`);
  const parsedResponse = await Product.parseAsync(response.data);
  return parsedResponse;
};

export default function useProduct(productId: number) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    refetchOnMount: false,
  });
}

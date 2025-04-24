import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { http } from '~/lib/http';

type LineItem = {
  product_id: number;
  quantity: number;
  price: number;
};

type CheckoutPayload = {
  name: string;
  email: string;
  phone: string;
  line_items: LineItem[];
};

const CheckoutResponseSchema = z.object({
  client_secret: z.string(),
  customer_id: z.coerce.string(),
  order_id: z.coerce.number(),
});

async function checkout(payload: CheckoutPayload) {
  const response = await http.post('/orders/payment/', payload);
  const parsedResponse = await CheckoutResponseSchema.parseAsync(response.data);
  return parsedResponse;
}

export function useCheckoutMutation() {
  return useMutation({
    mutationKey: ['checkout'],
    mutationFn: checkout,
  });
}

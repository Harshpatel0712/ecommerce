import { zodResolver } from '@hookform/resolvers/zod';
import { Elements } from '@stripe/react-stripe-js';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { formSchema } from '~/components/checkout/form-schema';
import { PaymentForm } from '~/components/checkout/PaymentForm';
import { UserDetailsForm } from '~/components/checkout/UserDetailsForm';
import { useCheckoutMutation } from '~/hooks/mutations/use-checkout-mutation';
import { Product } from '~/hooks/use-products';
import { stripe } from '~/lib/stripe';
import { useCart } from '~/store/cart-store';

export const Route = createFileRoute('/checkout/')({
  component: CheckoutPage,
});

type FormStep = 1 | 2;

function CheckoutPage() {
  const checkout = useCheckoutMutation();
  const [step, setStep] = useState<FormStep>(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const [clientSecret, setClientSecret] = useState<string>();
  const { totalProducts, products } = useCart();

  const onSubmit = async ({ name, email, phone }: z.infer<typeof formSchema>) => {
    const payload = {
      name,
      email,
      phone,
      line_items: products.map(toLineItem),
    };
    checkout.mutate(payload, {
      onError(error) {
        if (error instanceof AxiosError) {
          const errorData = error.response?.data as { error: string };
          toast.error(errorData.error);
          return;
        }

        toast.error(error.message);
      },
      onSuccess(response) {
        setClientSecret(response.client_secret);
        setStep(2);
      },
    });
  };

  if (totalProducts === 0) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {step === 1 ? (
        <UserDetailsForm
          form={form}
          onSubmit={onSubmit}
          isLoading={checkout.isPending}
          isSubmissionDisabled={!form.formState.isValid || checkout.isPending}
        />
      ) : null}

      {step === 2 && clientSecret ? (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      ) : null}
    </div>
  );
}

function toLineItem(product: Product & { quantity: number }) {
  return {
    product_id: product.id,
    quantity: product.quantity,
    price: product.price,
  };
}

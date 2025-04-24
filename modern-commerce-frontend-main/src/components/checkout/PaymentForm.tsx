import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '~/store/cart-store';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { resetCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const response = await elements.submit();

    if (response.error) {
      toast.error(response.error.message);
      setLoading(false);

      return;
    }

    const payment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (payment.error) {
      toast.error(payment.error.message);
      setLoading(false);
    }

    toast.success(`Payment successful`);
    resetCart();
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <PaymentElement />
          <Button type="submit" disabled={!stripe || !elements || loading} className="w-full">
            Pay Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

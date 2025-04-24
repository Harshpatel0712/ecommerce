import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowRight, Shield, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex h-[600px] items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-shopping.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">Modern Commerce</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Shop the latest trends with confidence. Quality products, competitive prices, and
            exceptional service.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="font-medium"
            onClick={() => {
              navigate({ to: '/products' });
            }}
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="border-y bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Wide Selection</h3>
              <p className="text-muted-foreground">
                Thousands of products to choose from across multiple categories
              </p>
            </Card>
            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Safe and secure checkout with multiple payment options
              </p>
            </Card>
            <Card className="p-6 text-center transition-shadow hover:shadow-lg">
              <Truck className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping to your doorstep</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-background">Ready to Start Shopping?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-background/90">
            Join thousands of satisfied customers and experience the best in online shopping.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="font-medium"
            onClick={() => navigate({ to: '/products' })}
          >
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
}

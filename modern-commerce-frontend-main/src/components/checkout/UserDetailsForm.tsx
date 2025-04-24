import { ArrowRight, CreditCardIcon, Loader, LockOpenIcon, UserIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { formSchema } from './form-schema';

type UserDetailsFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  isSubmissionDisabled?: boolean;
  isLoading: boolean;
};

export function UserDetailsForm({
  form,
  isSubmissionDisabled,
  onSubmit,
  isLoading = false,
}: UserDetailsFormProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Checkout</CardTitle>
        <CardDescription className="text-center">
          Complete your order by providing your details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        size={18}
                      />
                      <Input placeholder="John Doe" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCardIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        size={18}
                      />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockOpenIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        size={18}
                      />
                      <Input placeholder="1234567890" {...field} className="pl-10" type="tel" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full space-x-1"
          type="submit"
          disabled={isSubmissionDisabled || isLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>Proceed to Payment</span>
              <ArrowRight />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

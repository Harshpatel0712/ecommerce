import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().regex(/^[0-9]{10,14}$/, {
    message: 'Please enter a valid 10-digit phone number.',
  }),
});

import { z } from 'zod';

export const env = z.object({
  // server
  PORT: z.coerce.number().optional(),

  // client
  VITE_APP_TITLE: z.string().min(1),
  VITE_API_URL: z.string().url(),
  VITE_STRIPE_PUB_KEY: z.string().min(1),
});

type Environment = Readonly<z.infer<typeof env>>;

export type ClientEnvironment = {
  readonly [K in Extract<keyof Environment, `VITE_${string}`>]: Environment[K];
};

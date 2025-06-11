import { z } from 'zod/v4';

export const envSchema = z.object({
  APP_NAME: z.string().default('Server APP'),
  APP_URL: z.string().default('http://***'),
  APP_DESCRIPTION: z.string().default('Projeto.'),
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;

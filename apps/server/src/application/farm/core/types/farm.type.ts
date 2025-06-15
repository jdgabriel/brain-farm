import { z } from 'zod';

export const FarmPublicId = z.string().uuid();

export const Farm = z.object({
  id: FarmPublicId,
  name: z.string().max(100),
  city: z.string().max(150),
  state: z.string().max(75),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
});

export type Farm = z.infer<typeof Farm>;

export const FarmPublicInput = z.object({
  producerId: z.string().uuid(),
  name: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
});

export type FarmPublicInput = z.infer<typeof FarmPublicInput>;

export const FarmPublicSearch = z.object({
  farmId: FarmPublicId,
  producerId: FarmPublicId,
  name: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  totalArea: z.coerce.number(),
  arableArea: z.coerce.number(),
  vegetationArea: z.coerce.number(),
});

export type FarmPublicSearch = z.infer<typeof FarmPublicSearch>;

import { z } from 'zod';
import { FarmCropPublic } from './farm-crop.type';

export const FarmPublicId = z.string().uuid();

export const Farm = z.object({
  id: FarmPublicId,
  name: z.string().max(100),
  city: z.string().max(150),
  state: z.string().max(75),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
  crops: z.array(FarmCropPublic).optional(),
});

export type Farm = z.infer<typeof FarmInput>;

export const FarmInput = z.object({
  name: z.string().max(100),
  city: z.string().max(150),
  state: z.string().max(75),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
});

export type FarmInput = z.infer<typeof FarmInput>;

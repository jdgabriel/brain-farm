import { z } from 'zod';
import { HarvestPublicId } from './harvest.type';

export const FarmCropPublicId = z.string().uuid();

export const FarmCrop = z.object({
  id: FarmCropPublicId,
  culture: z.string().max(50),
  harvestId: HarvestPublicId,
});

export type FarmCrop = z.infer<typeof FarmCrop>;

export const FarmCropPublicInput = z.object({
  harvestId: HarvestPublicId,
  culture: z.string().max(50),
});

export type FarmCropPublicInput = z.infer<typeof FarmCropPublicInput>;

export const FarmCropPublicSearch = z.object({
  farmCropId: FarmCropPublicId,
  culture: z.string().min(1),
});

export type FarmCropPublicSearch = z.infer<typeof FarmCropPublicSearch>;

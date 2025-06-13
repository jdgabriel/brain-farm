import { z } from 'zod';
import { HarvestPublic } from './harvest.type';

export const FarmCropPublic = z.object({
  id: z.string().uuid(),
  culture: z.string().max(50),
  harvest: HarvestPublic.optional(),
});

export type FarmCropPublic = z.infer<typeof FarmCropPublic>;

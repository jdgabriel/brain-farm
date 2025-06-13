import { z } from 'zod';

export const FarmCropPublic = z.object({
  id: z.string().uuid(),
  culture: z.string().max(50),
  // harvest: HarvestPublic.optional(),
});

export type FarmCropPublic = z.infer<typeof FarmCropPublic>;

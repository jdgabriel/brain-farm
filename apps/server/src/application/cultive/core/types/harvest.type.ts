import { FarmPublicId } from '@application/farm/core/types/farm.type';
import { z } from 'zod';

export const HarvestPublicId = z.string().uuid();

export const HarvestPublic = z.object({
  farmId: FarmPublicId,
  name: z.string().max(25),
});

export type HarvestPublic = z.infer<typeof HarvestPublic>;

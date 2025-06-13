import { z } from 'zod';

export const HarvestPublicId = z.string().uuid();

export const HarvestPublic = z.object({
  name: z.string().max(25),
});

export type HarvestPublic = z.infer<typeof HarvestPublic>;

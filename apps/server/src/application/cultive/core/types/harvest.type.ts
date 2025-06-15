import { FarmPublicId } from '@application/farm/core/types/farm.type';
import { z } from 'zod';
import { CultivationStatus } from '../enum/cultivation.enum';

export const HarvestPublicId = z.string().uuid();

export const Harvest = z.object({
  id: HarvestPublicId,
  farmId: FarmPublicId,
  name: z.string().max(25),
  status: z.nativeEnum(CultivationStatus),
  plantingDate: z.coerce.date(),
  expectedHarvestDate: z.coerce.date(),
});
export type Harvest = z.infer<typeof Harvest>;

export const HarvestPublic = z.object({
  farmId: FarmPublicId,
  name: z.string().max(25),
});

export type HarvestPublic = z.infer<typeof HarvestPublic>;

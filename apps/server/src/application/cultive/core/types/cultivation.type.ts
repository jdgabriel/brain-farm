import { z } from 'zod';
import { CultivationStatus } from '../enum/cultivation.enum';
import { HarvestPublicId } from './harvest.type';

export const CultivationPublicId = z.string().uuid();

export const Cultivation = z.object({
  id: CultivationPublicId,
  culture: z.string().max(50),
  harvestId: HarvestPublicId,
  area: z.number(),
  plantingDate: z.coerce.date(),
  expectedHarvestDate: z.coerce.date(),
  status: z.nativeEnum(CultivationStatus),
});

export type Cultivation = z.infer<typeof Cultivation>;

export const CultivationPublicInput = z.object({
  harvestId: HarvestPublicId,
  culture: z.string().max(50),
  area: z.number(),
  plantingDate: z.coerce.date(),
  expectedHarvestDate: z.coerce.date(),
  status: z.nativeEnum(CultivationStatus),
});

export type CultivationPublicInput = z.infer<typeof CultivationPublicInput>;

export const CultivationPublicSearch = z.object({
  cultivationId: CultivationPublicId,
  culture: z.string().min(1),
  area: z.number(),
  plantingDate: z.coerce.date(),
  expectedHarvestDate: z.coerce.date(),
  status: z.nativeEnum(CultivationStatus),
});

export type CultivationPublicSearch = z.infer<typeof CultivationPublicSearch>;

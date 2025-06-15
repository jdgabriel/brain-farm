import { z } from 'zod';

export const CountFarms = z.object({
  count: z.number(),
});

export const CountProducers = z.object({
  count: z.number(),
});

export const TotalAreas = z.object({
  totalHectares: z.number(),
});

export const TotalCultives = z.array(
  z.object({
    culture: z.string(),
    total: z.number(),
  }),
);

export type CountFarms = z.infer<typeof CountFarms>;
export type CountProducers = z.infer<typeof CountProducers>;
export type TotalAreas = z.infer<typeof TotalAreas>;
export type TotalCultives = z.infer<typeof TotalCultives>;

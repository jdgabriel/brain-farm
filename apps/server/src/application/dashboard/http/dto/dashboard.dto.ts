import {
  CountFarms,
  CountProducers,
  TotalAreas,
  TotalCultives,
} from '@application/dashboard/core/types/dashboard.type';
import { createZodDto } from 'nestjs-zod';

export class OutputCountFarms extends createZodDto(CountFarms) {}

export class OutputCountProducers extends createZodDto(CountProducers) {}

export class OutputTotalAreas extends createZodDto(TotalAreas) {}

export class OutputTotalCultives extends createZodDto(TotalCultives) {}

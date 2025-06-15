import {
  Harvest,
  HarvestPublic,
} from '@application/cultive/core/types/harvest.type';
import { createZodDto } from 'nestjs-zod';

export class InputHarvest extends createZodDto(HarvestPublic) {}

export class InputUpdateHarvest extends createZodDto(
  HarvestPublic.pick({ name: true }),
) {}

export class HarvestByFarmId extends createZodDto(
  HarvestPublic.pick({ farmId: true }),
) {}

export class OutputHarvest extends createZodDto(Harvest) {}

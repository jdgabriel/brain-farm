import { HarvestPublic } from '@application/cultive/core/types/harvest.type';
import { createZodDto } from 'nestjs-zod';

export class CreateHarvestDto extends createZodDto(HarvestPublic) {}

export class UpdateHarvestDto extends createZodDto(
  HarvestPublic.pick({ name: true }),
) {}

export class HarvestByFarmId extends createZodDto(
  HarvestPublic.pick({ farmId: true }),
) {}

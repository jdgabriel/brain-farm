import { createZodDto } from 'nestjs-zod';
import {
  Cultivation,
  CultivationPublicInput,
  CultivationPublicSearch,
} from '../../core/types/cultivation.type';

export class InputCultivation extends createZodDto(CultivationPublicInput) {}

export class UpdateCultivation extends createZodDto(
  CultivationPublicInput.partial(),
) {}

export class InputSearchCultivationId extends createZodDto(
  CultivationPublicSearch.pick({ cultivationId: true }),
) {}

export class InputSearchCultivation extends createZodDto(
  CultivationPublicSearch.partial(),
) {}

export class OutputCultivation extends createZodDto(Cultivation) {}

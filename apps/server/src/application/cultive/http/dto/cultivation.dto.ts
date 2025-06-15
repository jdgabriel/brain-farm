import { createZodDto } from 'nestjs-zod';
import {
  CultivationPublicInput,
  CultivationPublicSearch,
} from '../../core/types/cultivation.type';

export class InputCultivationDto extends createZodDto(CultivationPublicInput) {}

export class UpdateCultivationDto extends createZodDto(
  CultivationPublicInput.partial(),
) {}

export class InputSearchCultivationId extends createZodDto(
  CultivationPublicSearch.pick({ cultivationId: true }),
) {}

export class InputSearchCultivation extends createZodDto(
  CultivationPublicSearch.partial(),
) {}

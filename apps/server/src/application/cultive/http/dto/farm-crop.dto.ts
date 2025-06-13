import { createZodDto } from 'nestjs-zod';
import {
  FarmCropPublicInput,
  FarmCropPublicSearch,
} from '../../core/types/farm-crop.type';

export class InputFarmCropDto extends createZodDto(FarmCropPublicInput) {}

export class UpdateFarmCropDto extends createZodDto(
  FarmCropPublicInput.partial(),
) {}

export class InputSearchFarmCropId extends createZodDto(
  FarmCropPublicSearch.pick({ farmCropId: true }),
) {}

export class InputSearchFarmCrop extends createZodDto(
  FarmCropPublicSearch.partial(),
) {}

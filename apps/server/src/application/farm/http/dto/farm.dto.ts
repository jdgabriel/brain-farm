import { createZodDto } from 'nestjs-zod';
import {
  Farm,
  FarmPublicInput,
  FarmPublicSearch,
} from '../../core/types/farm.type';

export class InputFarm extends createZodDto(
  FarmPublicInput.refine(
    (data) => {
      if (
        data.totalArea !== undefined &&
        data.arableArea !== undefined &&
        data.vegetationArea !== undefined
      ) {
        return data.arableArea + data.vegetationArea <= data.totalArea;
      }
      return true;
    },
    {
      message:
        'The sum of arable area and vegetation area cannot be greater than the total area.',
      path: ['arableArea'],
    },
  ),
) {}

export class InputUpdateFarm extends createZodDto(
  FarmPublicInput.partial().refine(
    (data) => {
      if (
        data.totalArea !== undefined &&
        data.arableArea !== undefined &&
        data.vegetationArea !== undefined
      ) {
        return data.arableArea + data.vegetationArea <= data.totalArea;
      }
      return true;
    },
    {
      message:
        'The sum of arable area and vegetation area cannot be greater than the total area.',
      path: ['arableArea'],
    },
  ),
) {}

export class InputSearchFarmId extends createZodDto(
  FarmPublicSearch.pick({ farmId: true }),
) {}

export class InputSearchFarm extends createZodDto(FarmPublicSearch.partial()) {}

export class OutputFarm extends createZodDto(Farm) {}

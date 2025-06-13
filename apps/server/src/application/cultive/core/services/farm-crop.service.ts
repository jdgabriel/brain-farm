import {
  InputFarmCropDto,
  InputSearchFarmCrop,
  UpdateFarmCropDto,
} from '@application/cultive/http/dto/farm-crop.dto';
import { Injectable } from '@nestjs/common';
import { FarmCrop } from '@shared-modules/persistence/entity/farm-crop.entity';
import { FarmCropRepository } from '@shared-modules/persistence/repository/farm-crop.repository';
import { rawString } from '@shared-modules/persistence/utils/search-param';
import { FarmCropNotFound } from '../exceptions/farm-crop-not-found.exception';

@Injectable()
export class FarmCropService {
  constructor(private readonly farmCropRepository: FarmCropRepository) {}

  async create(data: InputFarmCropDto) {
    const farmCrop = new FarmCrop(data);
    await this.farmCropRepository.save(farmCrop);
    return farmCrop;
  }

  async find(farmCropId: string) {
    const farmCrop = await this.farmCropRepository.findOneById(farmCropId);

    if (!farmCrop) {
      throw new FarmCropNotFound();
    }
    return farmCrop;
  }

  async fetch(data: InputSearchFarmCrop) {
    const farmCrops = await this.farmCropRepository.find({
      where: {
        id: data.farmCropId ?? undefined,
        culture: rawString(data.culture),
      },
    });

    return farmCrops;
  }

  async update(data: UpdateFarmCropDto, farmCropId: string) {
    const farmCropExists =
      await this.farmCropRepository.findOneById(farmCropId);

    if (!farmCropExists) {
      throw new FarmCropNotFound();
    }

    const farmCrop = new FarmCrop({
      id: farmCropId,
      ...data,
    });

    await this.farmCropRepository.save(farmCrop);
    return farmCrop;
  }

  async delete(farmCropId: string) {
    const farmCropExists =
      await this.farmCropRepository.findOneById(farmCropId);

    if (!farmCropExists) {
      throw new FarmCropNotFound();
    }

    await this.farmCropRepository.softDelete(farmCropExists.id);
  }
}

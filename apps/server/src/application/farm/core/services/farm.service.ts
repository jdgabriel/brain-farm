import { Injectable } from '@nestjs/common';
import { Farm } from '@shared-modules/persistence/entity/farm.entity';
import { FarmRepository } from '@shared-modules/persistence/repository/farm.repository';
import {
    rawNumber,
    rawString,
} from '@shared-modules/persistence/utils/search-param';
import {
    InputFarm,
    InputSearchFarm,
    InputUpdateFarm,
} from '../../http/dto/farm.dto';
import { FarmNotFound } from '../exceptions/farm-not-found.exception';

@Injectable()
export class FarmService {
  constructor(private readonly farmRepository: FarmRepository) {}

  async create(data: InputFarm) {
    const farm = new Farm(data);
    await this.farmRepository.save(farm);
    return farm;
  }

  async find(farmId: string) {
    const farm = await this.farmRepository.findOneById(farmId);

    if (!farm) {
      throw new FarmNotFound();
    }
    return farm;
  }

  async fetch(data: InputSearchFarm) {
    const farms = await this.farmRepository.find({
      where: {
        id: data.farmId ?? undefined,
        producerId: data.producerId ?? undefined,
        name: rawString(data.name),
        city: rawString(data.city),
        state: rawString(data.state),
        arableArea: rawNumber(data.arableArea),
        vegetationArea: rawNumber(data.vegetationArea),
        totalArea: rawNumber(data.totalArea),
      },
    });

    return farms;
  }

  async update(data: InputUpdateFarm, farmId: string) {
    const farmExists = await this.farmRepository.findOneById(farmId);

    if (!farmExists) {
      throw new FarmNotFound();
    }

    const farm = new Farm({
      id: farmId,
      ...data,
    });

    await this.farmRepository.save(farm);
    return farm;
  }

  async delete(farmId: string) {
    const farmExists = await this.farmRepository.findOneById(farmId);

    if (!farmExists) {
      throw new FarmNotFound();
    }

    await this.farmRepository.softDelete(farmExists.id);
  }
}

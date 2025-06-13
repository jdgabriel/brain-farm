import {
  CreateHarvestDto,
  UpdateHarvestDto,
} from '@application/cultive/http/dto/harvest.dto';
import { FarmNotFound } from '@application/farm/core/exceptions/farm-not-found.exception';
import { Injectable } from '@nestjs/common';
import { Harvest } from '@shared-modules/persistence/entity/harvest.entity';
import { FarmRepository } from '@shared-modules/persistence/repository/farm.repository';
import { HarvestRepository } from '@shared-modules/persistence/repository/harvest.repository';
import { HarvestNotFound } from '../exceptions/harvest-not-found.exception';

@Injectable()
export class HarvestService {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async create(data: CreateHarvestDto) {
    const farm = await this.farmRepository.exists(data.farmId);
    if (!farm) {
      throw new FarmNotFound();
    }

    const harvest = new Harvest({
      name: data.name,
      farmId: data.farmId,
    });

    await this.harvestRepository.save(harvest);
    return harvest;
  }

  async fetchFarmId(farmId: string) {
    const harvests = await this.harvestRepository.find({
      where: { farmId },
    });
    return harvests;
  }

  async update(data: UpdateHarvestDto, harvestId: string) {
    const harvestExists = await this.harvestRepository.exists(harvestId);
    if (!harvestExists) {
      throw new HarvestNotFound();
    }

    const harvest = new Harvest({
      id: harvestId,
      ...data,
    });
    await this.harvestRepository.save(harvest);
    return harvest;
  }

  async delete(farmCropId: string) {
    const farmCropExists = await this.harvestRepository.findOneById(farmCropId);

    if (!farmCropExists) {
      throw new HarvestNotFound();
    }

    await this.harvestRepository.softDelete(farmCropExists.id);
  }
}

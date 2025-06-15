import {
    InputHarvest,
    InputUpdateHarvest,
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

  async create(data: InputHarvest) {
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

  async getHarvest(harvestId: string) {
    const harvest = await this.harvestRepository.findOneById(harvestId);
    return harvest;
  }

  async update(data: InputUpdateHarvest, harvestId: string) {
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

  async delete(cultivationId: string) {
    const cultivationExists = await this.harvestRepository.findOneById(cultivationId);

    if (!cultivationExists) {
      throw new HarvestNotFound();
    }

    await this.harvestRepository.softDelete(cultivationExists.id);
  }
}

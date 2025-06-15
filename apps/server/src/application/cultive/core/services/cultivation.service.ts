import {
    InputCultivation,
    UpdateCultivation,
} from '@application/cultive/http/dto/cultivation.dto';
import { Injectable } from '@nestjs/common';
import { Cultivation } from '@shared-modules/persistence/entity/cultivation.entity';
import { Harvest } from '@shared-modules/persistence/entity/harvest.entity';
import { CultivationRepository } from '@shared-modules/persistence/repository/farm-crop.repository';
import { HarvestRepository } from '@shared-modules/persistence/repository/harvest.repository';
import { CultivationNotFound } from '../exceptions/cultivation-not-found.exception';

@Injectable()
export class CultivationService {
  constructor(
    private readonly cultivationRepository: CultivationRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async create(data: InputCultivation) {
    const cultivation = new Cultivation(data);
    await this.cultivationRepository.save(cultivation);

    await this.updateHarvestStatus(cultivation.harvestId);
    return cultivation;
  }

  async find(cultivationId: string) {
    const cultivation =
      await this.cultivationRepository.findOneById(cultivationId);

    if (!cultivation) {
      throw new CultivationNotFound();
    }
    return cultivation;
  }

  async fetch(harvestId: string) {
    const cultivations = await this.cultivationRepository.find({
      where: {
        harvestId,
      },
    });

    return cultivations;
  }

  async update(data: UpdateCultivation, cultivationId: string) {
    const cultivationExists =
      await this.cultivationRepository.findOneById(cultivationId);

    if (!cultivationExists) {
      throw new CultivationNotFound();
    }

    const cultivation = new Cultivation({
      id: cultivationId,
      ...data,
    });

    await this.cultivationRepository.save(cultivation);
    await this.updateHarvestStatus(cultivationExists.harvestId);

    return cultivation;
  }

  async delete(cultivationId: string) {
    const cultivationExists =
      await this.cultivationRepository.findOneById(cultivationId);

    if (!cultivationExists) {
      throw new CultivationNotFound();
    }
    await this.updateHarvestStatus(cultivationExists.harvestId);
    await this.cultivationRepository.softDelete(cultivationExists.id);
  }

  private async updateHarvestStatus(harvestId: string) {
    const { status, maxDate, minDate } =
      await this.cultivationRepository.maxStatus(harvestId);
    const harvest = new Harvest({
      id: harvestId,
      status,
      plantingDate: minDate,
      expectedHarvestDate: maxDate,
    });
    await this.harvestRepository.save(harvest);
  }
}

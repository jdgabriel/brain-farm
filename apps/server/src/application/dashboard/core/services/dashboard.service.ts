import { Injectable } from '@nestjs/common';
import { FarmCropRepository } from '@shared-modules/persistence/repository/farm-crop.repository';
import { FarmRepository } from '@shared-modules/persistence/repository/farm.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly farmCropRepository: FarmCropRepository,
  ) {}

  async countFarms() {
    const count = await this.farmRepository.count();
    return { count };
  }

  async totalAreas() {
    const totalHectares = await this.farmRepository.sumTotalArea();
    return { totalHectares };
  }

  async totalCultives() {
    const totalCultives = await this.farmCropRepository.countCulture();
    return totalCultives;
  }
}

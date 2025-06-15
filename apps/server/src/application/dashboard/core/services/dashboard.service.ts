import { Injectable } from '@nestjs/common';
import { CultivationRepository } from '@shared-modules/persistence/repository/farm-crop.repository';
import { FarmRepository } from '@shared-modules/persistence/repository/farm.repository';
import { ProducerRepository } from '@shared-modules/persistence/repository/producer.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly cultivationRepository: CultivationRepository,
    private readonly producerRepository: ProducerRepository,
  ) {}

  async countFarms() {
    const count = await this.farmRepository.count();
    return { count };
  }

  async producersCount() {
    const count = await this.producerRepository.count();
    return { count };
  }

  async totalAreas() {
    const totalHectares = await this.farmRepository.sumTotalArea();
    return { totalHectares };
  }

  async totalCultives() {
    const totalCultives = await this.cultivationRepository.countCulture();
    return totalCultives;
  }
}

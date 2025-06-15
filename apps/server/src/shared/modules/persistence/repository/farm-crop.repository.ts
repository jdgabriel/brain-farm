import { CultivationStatus } from '@application/cultive/core/enum/cultivation.enum';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cultivation } from '../entity/cultivation.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';
import { DefaultTypeOrmRepository } from './default.repository';

@Injectable()
export class CultivationRepository extends DefaultTypeOrmRepository<Cultivation> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Cultivation, dataSource.manager);
  }

  async countCulture() {
    const countCulture = await this.manager
      .createQueryBuilder(Cultivation, 'crop')
      .select('crop.culture', 'culture')
      .addSelect('COUNT(*)::int', 'total')
      .groupBy('crop.culture')
      .orderBy('total', 'DESC')
      .limit(5)
      .getRawMany();

    return countCulture;
  }

  async maxStatus(
    harvestId: string,
  ): Promise<{ status: CultivationStatus; minDate: Date; maxDate: Date }> {
    const result = await this.manager
      .createQueryBuilder(Cultivation, 'cultivations')
      .where('cultivations.harvestId = :harvestId', { harvestId })
      .select([
        `(SELECT cultivations_inner.status
          FROM cultivations cultivations_inner
          ORDER BY CASE cultivations_inner.status
            WHEN 'PLOWING' THEN 4
            WHEN 'PLANTED' THEN 3
            WHEN 'GROWING' THEN 2
            WHEN 'HARVESTED' THEN 1
          END DESC
          LIMIT 1
        ) AS "status"`,
        'MIN(cultivations.plantingDate)::date AS "minDate"',
        'MAX(cultivations.expectedHarvestDate)::date AS "maxDate"',
      ])
      .getRawOne();

    return result;
  }
}

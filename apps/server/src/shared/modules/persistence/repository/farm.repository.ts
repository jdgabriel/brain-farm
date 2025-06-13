import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Farm } from '../entity/farm.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';
import { DefaultTypeOrmRepository } from './default.repository';

@Injectable()
export class FarmRepository extends DefaultTypeOrmRepository<Farm> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Farm, dataSource.manager);
  }

  async count() {
    const count = await this.manager
      .createQueryBuilder(Farm, 'farm')
      .getCount();
    return count;
  }

  async sumTotalArea() {
    const { totalHectares } = await this.manager
      .createQueryBuilder(Farm, 'farm')
      .select('SUM(farm.totalArea)::int', 'totalHectares')
      .getRawOne();
    return totalHectares;
  }

  async countByState() {
    const farmsByState = await this.manager
      .createQueryBuilder(Farm, 'farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)::int', 'count')
      .groupBy('farm.state')
      .getRawMany();

    return farmsByState;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '../../../shared/modules/persistence/repository/default.repository';
import { Harvest } from '../entity/harvest.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';

@Injectable()
export class HarvestRepository extends DefaultTypeOrmRepository<Harvest> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Harvest, dataSource.manager);
  }
}

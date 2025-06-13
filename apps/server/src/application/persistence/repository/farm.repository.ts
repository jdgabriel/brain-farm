import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '../../../shared/modules/persistence/repository/default.repository';
import { Farm } from '../entity/farm.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';

@Injectable()
export class FarmRepository extends DefaultTypeOrmRepository<Farm> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Farm, dataSource.manager);
  }
}

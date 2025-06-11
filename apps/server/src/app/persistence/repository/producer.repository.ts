import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '../../../shared/modules/persistence/repository/default.repository';
import { Producer } from '../entity/producer.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';

@Injectable()
export class ProducerRepository extends DefaultTypeOrmRepository<Producer> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Producer, dataSource.manager);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Not } from 'typeorm';
import { Producer } from '../entity/producer.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';
import { DefaultTypeOrmRepository } from './default.repository';

@Injectable()
export class ProducerRepository extends DefaultTypeOrmRepository<Producer> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(Producer, dataSource.manager);
  }

  async count() {
    const count = await this.manager
      .createQueryBuilder(Producer, 'farm')
      .getCount();
    return count;
  }

  existsWithSameDocument(producerId: string, document: string) {
    return this.findOne({
      where: {
        document: document,
        id: Not(producerId),
      },
    });
  }
}

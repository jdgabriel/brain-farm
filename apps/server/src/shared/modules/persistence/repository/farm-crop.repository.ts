import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FarmCrop } from '../entity/farm-crop.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';
import { DefaultTypeOrmRepository } from './default.repository';

@Injectable()
export class FarmCropRepository extends DefaultTypeOrmRepository<FarmCrop> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(FarmCrop, dataSource.manager);
  }
}

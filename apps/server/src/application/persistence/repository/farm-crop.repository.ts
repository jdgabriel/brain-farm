import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '../../../shared/modules/persistence/repository/default.repository';
import { FarmCrop } from '../entity/farm-crop.entity';
import { DATA_SOURCE_NAME } from '../typeorm-datasource.factory';

@Injectable()
export class FarmCropRepository extends DefaultTypeOrmRepository<FarmCrop> {
  constructor(
    @InjectDataSource(DATA_SOURCE_NAME)
    dataSource: DataSource,
  ) {
    super(FarmCrop, dataSource.manager);
  }
}

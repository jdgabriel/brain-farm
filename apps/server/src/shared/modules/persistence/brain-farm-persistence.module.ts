import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from '@shared-modules/env/env.service';
import { FarmCropRepository } from './repository/farm-crop.repository';
import { FarmRepository } from './repository/farm.repository';
import { HarvestRepository } from './repository/harvest.repository';
import { ProducerRepository } from './repository/producer.repository';
import {
  DATA_SOURCE_NAME,
  dataSourceOptionsFactory,
} from './typeorm-datasource.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATA_SOURCE_NAME,
      inject: [EnvService],
      useFactory: (configService: EnvService) => {
        return dataSourceOptionsFactory(configService);
      },
    }),
  ],
  providers: [
    ProducerRepository,
    FarmRepository,
    FarmCropRepository,
    HarvestRepository,
  ],
  exports: [
    ProducerRepository,
    FarmRepository,
    FarmCropRepository,
    HarvestRepository,
  ],
})
export class BrainFarmPersistenceModule {}

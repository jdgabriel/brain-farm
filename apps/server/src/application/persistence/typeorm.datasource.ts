import { NestFactory } from '@nestjs/core';
import { EnvModule } from '@shared-modules/env/env.module';
import { EnvService } from '@shared-modules/env/env.service';
import { DataSource } from 'typeorm';
import { dataSourceOptionsFactory } from './typeorm-datasource.factory';

const getDataSource = async () => {
  const configModule = await NestFactory.createApplicationContext(EnvModule);
  const configService = configModule.get<EnvService>(EnvService);

  return new DataSource(dataSourceOptionsFactory(configService));
};

export default getDataSource();

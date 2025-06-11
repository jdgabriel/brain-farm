import { EnvModule } from '@internal-modules/env/env.module';
import { EnvService } from '@internal-modules/env/env.service';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { dataSourceOptionsFactory } from './typeorm-datasource.factory';

const getDataSource = async () => {
  const configModule = await NestFactory.createApplicationContext(EnvModule);
  const configService = configModule.get<EnvService>(EnvService);

  return new DataSource(dataSourceOptionsFactory(configService));
};

export default getDataSource();

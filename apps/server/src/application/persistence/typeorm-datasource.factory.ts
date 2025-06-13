import { EnvService } from '@shared-modules/env/env.service';
import { SnakeNamingStrategy } from '@shared-modules/persistence';
import { join } from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const DATA_SOURCE_NAME = 'brain_farm';

export const dataSourceOptionsFactory = (
  configService: EnvService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  name: DATA_SOURCE_NAME,
  url: configService.get('DATABASE_URL'),
  synchronize: false,
  entities: [join(__dirname, 'entity', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migration', '*-migration.{ts,js}')],
  migrationsRun: false,
  migrationsTableName: `${DATA_SOURCE_NAME}_migrations`,
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
});

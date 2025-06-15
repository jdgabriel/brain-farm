import 'dotenv/config';

import { faker } from '@faker-js/faker';
import {
  cultivationsFactory,
  farmFactory,
  harvestFactory,
  producerFactory,
} from '@test/factory';
import { Tables, testDbClient } from '.';

export async function SeedDatabase() {
  /**CREATE PRODUCERS */
  const producers = producerFactory.buildList(5);

  /**CREATE FARMS */
  const farms = producers
    .map((producer) => farmFactory.build({ producerId: producer.id }))
    .flat();

  /**CREATE HARVEST */
  const harvests = farms
    .map((farm) => harvestFactory.buildList(2, { farmId: farm.id }))
    .flat();

  /**CREATE FARM CROPS */
  const cultivations = harvests
    .map((harvest) =>
      cultivationsFactory.buildList(2, {
        harvestId: harvest.id,
        culture: faker.helpers.arrayElement([
          'Corn',
          'Wheat',
          'Soybean',
          'Coffee',
          'Rice',
          'Orange',
          'Potato',
        ]),
      }),
    )
    .flat();

  await testDbClient.table(Tables.PRODUCERS).insert(producers);
  await testDbClient.table(Tables.FARMS).insert(farms);
  await testDbClient.table(Tables.HARVEST).insert(harvests);
  await testDbClient.table(Tables.CULTIVATIONS).insert(cultivations);
  await testDbClient.destroy();
}

SeedDatabase()
  .then(() => {
    console.log('🪴 Database Seed running successfully');
  })
  .catch((error) => console.log(error))
  .finally(() => process.exit(0));

import { faker } from '@faker-js/faker';
import { Harvest } from '@shared-modules/persistence/entity/harvest.entity';
import * as Factory from 'factory.ts';

export const harvestFactory = Factory.Sync.makeFactory<Partial<Harvest>>({
  id: Factory.each(() => faker.string.uuid()),
  farmId: Factory.each(() => faker.string.uuid()),
  name: Factory.each(
    () => `Harvest ${faker.number.int({ min: 2020, max: 2030 })}`,
  ),
  plantingDate: Factory.each(() => faker.date.past({ years: 1 })),
  expectedHarvestDate: Factory.each(() =>
    faker.date.future({ years: faker.number.int({ min: 1, max: 2 }) }),
  ),
});

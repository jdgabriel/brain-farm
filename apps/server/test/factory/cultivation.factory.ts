import { faker } from '@faker-js/faker';
import { Cultivation } from '@shared-modules/persistence/entity/cultivation.entity';
import * as Factory from 'factory.ts';

export const cultivationsFactory = Factory.Sync.makeFactory<
  Partial<Cultivation>
>({
  id: Factory.each(() => faker.string.uuid()),
  culture: Factory.each(() => faker.food.fruit()),
  harvestId: Factory.each(() => faker.string.uuid()),
  area: Factory.each(() => faker.number.int({ min: 5_000, max: 15_000 })),
  plantingDate: Factory.each(() => faker.date.past({ years: 1 })),
  expectedHarvestDate: Factory.each(() =>
    faker.date.future({ years: faker.number.int({ min: 1, max: 2 }) }),
  ),
  status: Factory.each(() =>
    faker.helpers.arrayElement(['PLANTED', 'GROWING', 'HARVESTED']),
  ),
});

import { faker } from '@faker-js/faker';
import { Farm } from '@shared-modules/persistence/entity/farm.entity';
import * as Factory from 'factory.ts';

export const farmFactory = Factory.Sync.makeFactory<Partial<Farm>>({
  id: Factory.each(() => faker.string.uuid()),
  producerId: Factory.each(() => faker.string.uuid()),
  city: Factory.each(() => faker.location.city()),
  name: Factory.each(() => faker.company.name()),
  state: Factory.each(() => faker.location.state()),
  totalArea: Factory.each(() =>
    faker.number.float({ min: 50_000, max: 100_000, fractionDigits: 2 }),
  ),
  arableArea: Factory.each(() =>
    faker.number.float({ min: 10_000, max: 25_000, fractionDigits: 2 }),
  ),
  vegetationArea: Factory.each(() =>
    faker.number.float({ min: 10_000, max: 25_000, fractionDigits: 2 }),
  ),
});

import { faker } from '@faker-js/faker';
import { FarmCrop } from '@shared-modules/persistence/entity/farm-crop.entity';
import * as Factory from 'factory.ts';

export const farmCropFactory = Factory.Sync.makeFactory<Partial<FarmCrop>>({
  id: Factory.each(() => faker.string.uuid()),
  culture: Factory.each(() => faker.food.fruit()),
  harvestId: Factory.each(() => faker.string.uuid()),
});

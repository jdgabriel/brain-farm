import { DocumentType } from '@application/producer/core/enum/document-type.enum';
import { faker } from '@faker-js/faker';
import { Producer } from '@shared-modules/persistence/entity/producer.entity';
import * as Factory from 'factory.ts';

export const producerFactory = Factory.Sync.makeFactory<Partial<Producer>>({
  id: Factory.each(() => faker.string.uuid()),
  name: Factory.each(() => faker.person.fullName()),
  document: Factory.each(() => faker.string.numeric(14)),
  docType: Factory.each(() => DocumentType.CNPJ),
});

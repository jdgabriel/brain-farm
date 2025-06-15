import { CultiveModule } from '@application/cultive/cultive.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { createNestApp } from '@test/application.setup';
import { Tables, testDbClient } from '@test/database';
import { cultivationsFactory, farmFactory } from '@test/factory';
import { harvestFactory } from '@test/factory/harvest.factory';
import * as request from 'supertest';

describe('(E2E) Cultive - Cultivation', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    const nestTestSetup = await createNestApp([CultiveModule]);
    app = nestTestSetup.app;
    module = nestTestSetup.module;
  });

  afterAll(async () => {
    await module.close();
    await testDbClient.table(Tables.CULTIVATIONS).del();
    await testDbClient.table(Tables.HARVEST).del();
    await testDbClient.table(Tables.FARMS).del();
    await testDbClient.table(Tables.PRODUCERS).del();
    await testDbClient.destroy();
  });

  it('should be create a crop at harvest successfully', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });
    const crop = cultivationsFactory.build({ harvestId: harvest.id });

    await testDbClient.table(Tables.HARVEST).insert(harvest);
    await testDbClient.table(Tables.FARMS).insert(farm);

    await request(app.getHttpServer())
      .post(`/harvest/${harvest.id}/cultivations`)
      .send(crop)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            culture: crop.culture,
          }),
        );
      });
  });

  it('should be update a crop', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });
    const cultivation = cultivationsFactory.build({ harvestId: harvest.id });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvest);
    await testDbClient.table(Tables.CULTIVATIONS).insert(cultivation);

    await request(app.getHttpServer())
      .patch(`/harvest/${harvest.id}/cultivations/${cultivation.id}`)
      .send({ cultive: 'updated-cultive-cultivation' })
      .expect(HttpStatus.NO_CONTENT);
  });

  it('should be delete a crop', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });
    const cultivation = cultivationsFactory.build({ harvestId: harvest.id });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvest);
    await testDbClient.table(Tables.CULTIVATIONS).insert(cultivation);

    await request(app.getHttpServer())
      .delete(`/harvest/${harvest.id}/cultivations/${cultivation.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});

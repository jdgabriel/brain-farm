import { CultiveModule } from '@application/cultive/cultive.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { createNestApp } from '@test/application.setup';
import { Tables, testDbClient } from '@test/database';
import { farmFactory } from '@test/factory';
import { harvestFactory } from '@test/factory/harvest.factory';
import * as request from 'supertest';

describe('(E2E) Cultive - Harvest', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    const nestTestSetup = await createNestApp([CultiveModule]);
    app = nestTestSetup.app;
    module = nestTestSetup.module;
  });

  afterAll(async () => {
    await module.close();
    await testDbClient.table(Tables.FARM_CROPS).del();
    await testDbClient.table(Tables.HARVEST).del();
    await testDbClient.table(Tables.FARMS).del();
    await testDbClient.table(Tables.PRODUCERS).del();
    await testDbClient.destroy();
  });

  it('should be create a harvest successfully', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });
    await testDbClient.table(Tables.FARMS).insert(farm);

    await request(app.getHttpServer())
      .post('/harvest')
      .send(harvest)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: harvest.name,
          }),
        );
      });
  });

  it('should be fetch harvest list by farm id', async () => {
    const farm = farmFactory.build();
    const harvests = harvestFactory.buildList(3, { farmId: farm.id });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvests);

    await request(app.getHttpServer())
      .get(`/harvest/${farm.id}`)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(3);
      });
  });

  it('should be update harvest data info', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvest);

    await request(app.getHttpServer())
      .patch(`/harvest/${harvest.id}`)
      .send({ name: 'updated-harvest-name' })
      .expect(HttpStatus.NO_CONTENT);
  });
});

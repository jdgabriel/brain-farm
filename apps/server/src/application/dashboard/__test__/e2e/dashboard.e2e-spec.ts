import { DashboardModule } from '@application/dashboard/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { createNestApp } from '@test/application.setup';
import { Tables, testDbClient } from '@test/database';
import { farmCropFactory, farmFactory } from '@test/factory';
import { harvestFactory } from '@test/factory/harvest.factory';
import * as request from 'supertest';

describe('(E2E) Dashboard Report', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    const nestTestSetup = await createNestApp([DashboardModule]);
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

  it('should be show total of farms in database', async () => {
    const farm = farmFactory.buildList(10);
    const harvest = harvestFactory.build({ farmId: farm[0].id });
    const crop = farmCropFactory.build({ harvestId: harvest.id });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvest);
    await testDbClient.table(Tables.FARM_CROPS).insert(crop);

    await request(app.getHttpServer())
      .get('/dashboard/farm-count')
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            count: 10,
          }),
        );
      });
  });

  it('should be show total area of cultive', async () => {
    const farms = farmFactory.buildList(5);
    await testDbClient.table(Tables.FARMS).insert(farms);

    await request(app.getHttpServer())
      .get('/dashboard/total-area-count')
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            totalHectares: expect.any(Number),
          }),
        );
      });
  });

  it('should be show total of each cultive', async () => {
    const farm = farmFactory.build();
    const harvest = harvestFactory.build({ farmId: farm.id });
    const cropOne = farmCropFactory.buildList(2, {
      culture: 'Corn',
      harvestId: harvest.id,
    });
    const cropTwo = farmCropFactory.buildList(5, {
      culture: 'Soja',
      harvestId: harvest.id,
    });

    await testDbClient.table(Tables.FARMS).insert(farm);
    await testDbClient.table(Tables.HARVEST).insert(harvest);
    await testDbClient
      .table(Tables.FARM_CROPS)
      .insert([...cropOne, ...cropTwo]);

    await request(app.getHttpServer())
      .get('/dashboard/total-cultives')
      .expect((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ culture: cropOne[0].culture, total: 2 }),
            expect.objectContaining({ culture: cropTwo[0].culture, total: 5 }),
          ]),
        );
      });
  });
});

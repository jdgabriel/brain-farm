import { FarmModule } from '@application/farm/farm.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { createNestApp } from '@test/application.setup';
import { Tables, testDbClient } from '@test/database';
import { farmFactory, producerFactory } from '@test/factory';
import * as request from 'supertest';

describe('(E2E) Farm', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    const nestTestSetup = await createNestApp([FarmModule]);
    app = nestTestSetup.app;
    module = nestTestSetup.module;
  });

  afterAll(async () => {
    await module.close();
    await testDbClient.table(Tables.FARMS).del();
    await testDbClient.table(Tables.PRODUCERS).del();
    await testDbClient.destroy();
  });

  it('should be create a farm successfully', async () => {
    const farmInput = farmFactory.build();

    await request(app.getHttpServer())
      .post('/farms')
      .send(farmInput)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: farmInput.name,
            producerId: farmInput.producerId,
          }),
        );
      });
  });

  it('should be not create a farm when sum farm areas of cultives biggest the total area', async () => {
    const farmInput = farmFactory.build({
      totalArea: 10,
      arableArea: 5,
      vegetationArea: 6,
    });

    await request(app.getHttpServer())
      .post('/farms')
      .send(farmInput)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            statusCode: 400,
            message: 'Please provide a valid input for this action.',
            code: 'VALIDATION_INPUT',
            errors: expect.arrayContaining([
              expect.objectContaining({
                message:
                  'The sum of arable area and vegetation area cannot be greater than the total area.',
                path: 'arableArea',
              }),
            ]),
          }),
        );
      });
  });

  it('should be update info when exists a valida farm', async () => {
    const producer = producerFactory.build();
    const farmInput = farmFactory.build({
      producerId: producer.id,
    });
    await testDbClient.table(Tables.PRODUCERS).insert(producer);
    await testDbClient.table(Tables.FARMS).insert(farmInput);

    await request(app.getHttpServer())
      .patch(`/farms/${farmInput.id}`)
      .send({ name: 'updated-farm-name' })
      .expect(HttpStatus.NO_CONTENT);
  });

  it('should be get one farm by id', async () => {
    const farmInput = farmFactory.build();
    await testDbClient.table(Tables.FARMS).insert(farmInput);

    await request(app.getHttpServer())
      .get(`/farms/${farmInput.id}`)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: farmInput.name,
          }),
        );
      });
  });

  it('should be fetch farms list with search params', async () => {
    const farmInput = farmFactory.build();
    await testDbClient.table(Tables.FARMS).insert(farmInput);

    await request(app.getHttpServer())
      .get('/farms')
      .query({ city: farmInput.city })
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: farmInput.id,
              city: farmInput.city,
            }),
          ]),
        );
      });
  });

  it('should be fetch farms list', async () => {
    await request(app.getHttpServer())
      .get('/farms')
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('should be delete a farm by id', async () => {
    const farmInput = farmFactory.build();
    await testDbClient.table(Tables.FARMS).insert(farmInput);

    await request(app.getHttpServer())
      .del(`/farms/${farmInput.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});

import { ProducerConflictData } from '@application/producer/core/exceptions/producer-conflict.exception';
import { ProducerModule } from '@application/producer/producer.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { createNestApp } from '@test/application.setup';
import { Tables, testDbClient } from '@test/database';
import { producerFactory } from '@test/factory';
import * as request from 'supertest';

describe('(E2E) Producer', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    const nestTestSetup = await createNestApp([ProducerModule]);
    app = nestTestSetup.app;
    module = nestTestSetup.module;
  });

  afterAll(async () => {
    await module.close();
    await testDbClient.table(Tables.FARMS).del();
    await testDbClient.table(Tables.PRODUCERS).del();
    await testDbClient.destroy();
  });

  it('should be create a producer', async () => {
    const producerInput = producerFactory.build({ document: '12345678900' });

    await request(app.getHttpServer())
      .post('/producers')
      .send({
        name: producerInput.name,
        document: producerInput.document,
        docType: producerInput.docType,
      })
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: producerInput.name,
            document: producerInput.document,
          }),
        );
      });
  });

  it('should be return a conflict error on create producer with same document', async () => {
    const producerInput = producerFactory.build({ document: '12345678900' });

    await request(app.getHttpServer())
      .post('/producers')
      .send({
        name: producerInput.name,
        document: producerInput.document,
        docType: producerInput.docType,
      })
      .expect(HttpStatus.CONFLICT)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining(ProducerConflictData),
        );
      });
  });

  it('should be update info at producer', async () => {
    const producerInput = producerFactory.build();
    await testDbClient.table(Tables.PRODUCERS).insert(producerInput);

    await request(app.getHttpServer())
      .patch(`/producers/${producerInput.id}`)
      .send({ name: 'updated-producer-name' })
      .expect(HttpStatus.NO_CONTENT);
  });

  it('should be get one producer', async () => {
    const producerInput = producerFactory.build();
    await testDbClient.table(Tables.PRODUCERS).insert(producerInput);

    await request(app.getHttpServer())
      .get(`/producers/${producerInput.id}`)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: producerInput.name,
          }),
        );
      });
  });

  it('should be fetch producers list', async () => {
    await request(app.getHttpServer())
      .get('/producers')
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });
});

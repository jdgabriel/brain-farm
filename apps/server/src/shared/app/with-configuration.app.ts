import { INestApplication } from '@nestjs/common';
import { json } from 'express';

export const withApiConfiguration = (
  app: INestApplication,
): INestApplication => {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type',
  });
  app.use(json({ limit: '50mb' }));
  app.enableShutdownHooks();

  return app;
};

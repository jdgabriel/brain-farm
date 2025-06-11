import { INestApplication } from '@nestjs/common';
import { json } from 'express';

export const withApiConfiguration = (
  app: INestApplication,
): INestApplication => {
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.enableShutdownHooks();

  return app;
};

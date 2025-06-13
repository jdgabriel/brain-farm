import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ZodValidationExceptionFilter } from '@shared-http/filters/zod-validation.filter';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from '../src/app.module';

export const createNestApp = async (modules: any[] = [AppModule]) => {
  const module = await Test.createTestingModule({
    imports: modules,
    providers: [
      { provide: APP_PIPE, useClass: ZodValidationPipe },
      { provide: APP_FILTER, useClass: ZodValidationExceptionFilter },
    ],
  }).compile();

  const app = module.createNestApplication();
  await app.init();
  return { module, app };
};

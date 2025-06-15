import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalHttpExceptionFilter } from '@shared-http/filters/global-exception.filter';
import { ZodValidationExceptionFilter } from '@shared-http/filters/zod-validation.filter';
import { ZodValidationPipe } from 'nestjs-zod';
import { BrainFarmModule } from './application/brain-farm.module';

@Module({
  imports: [BrainFarmModule],
  providers: [
    { provide: APP_FILTER, useClass: GlobalHttpExceptionFilter },
    { provide: APP_FILTER, useClass: ZodValidationExceptionFilter },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule {}

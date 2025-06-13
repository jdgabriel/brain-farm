import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationExceptionFilter } from '@shared-http/filters/zod-validation.filter';
import { ZodValidationPipe } from 'nestjs-zod';
import { BrainFarmModule } from './application/brain-farm.module';

@Module({
  imports: [BrainFarmModule],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_FILTER, useClass: ZodValidationExceptionFilter },
  ],
})
export class AppModule {}

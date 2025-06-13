import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { lastValueFrom, map, of, switchMap } from 'rxjs';
import { AppModule } from './app.module';

import { withApiConfiguration, withApiVersion, withSwagger } from '@app-config';
import { EnvService } from '@shared-modules/env/env.service';

async function bootstrap() {
  const application = await NestFactory.create(AppModule);
  const logger = new Logger('Application');

  const configService = application.get<EnvService>(EnvService);
  const port = configService.get('PORT');
  const title = configService.get('APP_NAME');
  const description = configService.get('APP_DESCRIPTION');
  const url = configService.get('APP_URL');

  await lastValueFrom(
    of(application).pipe(
      map(withApiConfiguration),
      map(withApiVersion({ defaultVersion: '1' })),
      map(withSwagger({ title, description })),
      switchMap((app) => app.listen(port)),
    ),
  );

  logger.log(`🚀 ${title} is up and running at ${url}`);
  logger.log(`📃 Swagger documentation available at ${url}/docs`);
}

bootstrap();

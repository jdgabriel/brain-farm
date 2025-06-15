import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationInputResponse } from '@shared-http/filters/zod-validation.filter';
import { patchNestJsSwagger } from 'nestjs-zod';

export const withSwagger =
  (params: { title: string; description: string }) =>
  (app: INestApplication): INestApplication => {
    // modifies the Nest Swagger module to be compatible with DTOs created by Zod schemas.
    patchNestJsSwagger();

    const documentBuilder = new DocumentBuilder()
      .setTitle(params.title)
      .setDescription(params.description)
      .setVersion('v1.0')
      .addGlobalResponse({
        status: 400,
        description: 'Invalid body input(s)',
        type: ValidationInputResponse,
      });

    const document = SwaggerModule.createDocument(app, documentBuilder.build());

    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: `${params.title} API`,
    });

    return app;
  };

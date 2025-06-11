import { INestApplication, VersioningType } from '@nestjs/common';
import { VersionValue } from '@nestjs/common/interfaces';

export const withApiVersion =
  (params: { defaultVersion: VersionValue }) =>
  (app: INestApplication): INestApplication => {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: params.defaultVersion,
    });

    return app;
  };

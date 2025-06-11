import { EnvModule } from '@internal-modules/env/env.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EnvModule],
})
export class AppModule {}

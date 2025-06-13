import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { BrainFarmPersistenceModule } from '@shared-modules/persistence/brain-farm-persistence.module';
import { FarmService } from './core/services/farm.service';
import { FarmController } from './http/controller/farm.controller';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}

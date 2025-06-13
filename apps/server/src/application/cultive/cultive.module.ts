import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { BrainFarmPersistenceModule } from '@shared-modules/persistence/brain-farm-persistence.module';
import { FarmCropService } from './core/services/farm-crop.service';
import { HarvestService } from './core/services/harvest.service';
import { FarmCropController } from './http/controller/farm-crop.controller';
import { HarvestController } from './http/controller/harvest.controller';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [FarmCropController, HarvestController],
  providers: [FarmCropService, HarvestService],
})
export class CultiveModule {}

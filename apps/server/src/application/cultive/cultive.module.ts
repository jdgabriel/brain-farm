import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { BrainFarmPersistenceModule } from '@shared-modules/persistence/brain-farm-persistence.module';
import { CultivationService } from './core/services/cultivation.service';
import { HarvestService } from './core/services/harvest.service';
import { CultivationsController } from './http/controller/culltivations.controller';
import { HarvestController } from './http/controller/harvest.controller';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [CultivationsController, HarvestController],
  providers: [CultivationService, HarvestService],
})
export class CultiveModule {}

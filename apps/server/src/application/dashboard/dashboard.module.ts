import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { BrainFarmPersistenceModule } from '@shared-modules/persistence/brain-farm-persistence.module';
import { DashboardService } from './core/services/dashboard.service';
import { DashboardController } from './http/controller/dashboard.controller';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

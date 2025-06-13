import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { ProducerService } from './core/services/producer.service';
import { ProducerController } from './http/controller/producer.controller';
import { BrainFarmPersistenceModule } from './persistence/brain-farm-persistence.module';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class BrainFarmModule {}

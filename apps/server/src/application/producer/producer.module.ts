import { Module } from '@nestjs/common';
import { EnvModule } from '@shared-modules/env/env.module';
import { BrainFarmPersistenceModule } from '@shared-modules/persistence/brain-farm-persistence.module';
import { ProducerService } from './core/services/producer.service';
import { ProducerController } from './http/controller/producer.controller';

@Module({
  imports: [EnvModule, BrainFarmPersistenceModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}

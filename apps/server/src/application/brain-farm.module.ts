import { Module } from '@nestjs/common';
import { FarmModule } from './farm/farm.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ProducerModule, FarmModule],
})
export class BrainFarmModule {}

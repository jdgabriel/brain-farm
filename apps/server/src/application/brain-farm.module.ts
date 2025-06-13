import { Module } from '@nestjs/common';
import { CultiveModule } from './cultive/cultive.module';
import { FarmModule } from './farm/farm.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ProducerModule, FarmModule, CultiveModule],
})
export class BrainFarmModule {}

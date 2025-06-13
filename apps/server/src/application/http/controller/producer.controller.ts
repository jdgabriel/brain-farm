import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConflictResponse } from '@nestjs/swagger';
import { ProducerConflictResponse } from 'src/application/core/exceptions/producer-conflict.exception';
import { ProducerService } from '../../core/services/producer.service';
import { InputProducerDto } from '../dto/producer.dto';

@Controller({ path: 'producer', version: '1' })
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiBody({ type: InputProducerDto })
  @ApiConflictResponse({
    description: 'Producer already exists',
    type: ProducerConflictResponse,
  })
  producer(@Body() producer: InputProducerDto) {
    return this.producerService.createProducer(producer);
  }
}

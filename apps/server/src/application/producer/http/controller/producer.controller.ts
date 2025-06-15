import { ProducerConflictResponse } from '@application/producer/core/exceptions/producer-conflict.exception';
import { ProducerNotFoundResponse } from '@application/producer/core/exceptions/producer-not-found.exception';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProducerService } from '../../core/services/producer.service';
import {
  InputProducerDto,
  InputSearchProducer,
  InputSearchProducerId,
  UpdateProducerDto,
} from '../dto/producer.dto';

@Controller({ path: 'producers', version: '1' })
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  @ApiQuery({
    name: 'producerId',
    type: String,
    description: 'Valid producer UUID',
    required: false,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Producer Name',
  })
  @ApiQuery({
    name: 'document',
    type: String,
    required: false,
    description: 'Valid producer document',
  })
  async fetchProducers(@Query() query: InputSearchProducer) {
    return await this.producerService.fetch(query);
  }

  @Get(':producerId')
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  async getProducerById(@Param() { producerId }: InputSearchProducerId) {
    return await this.producerService.find(producerId!);
  }

  @Post()
  @ApiBody({ type: InputProducerDto })
  @ApiConflictResponse({
    description: 'Producer already exists',
    type: ProducerConflictResponse,
  })
  async createProducer(@Body() producer: InputProducerDto) {
    return await this.producerService.create(producer);
  }

  @Patch(':producerId')
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  @ApiBody({ type: UpdateProducerDto })
  @ApiNotFoundResponse({
    description: 'Producer not found',
    type: ProducerNotFoundResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProducer(
    @Param() { producerId }: InputSearchProducerId,
    @Body() producer: UpdateProducerDto,
  ) {
    await this.producerService.update(producer, producerId!);
  }

  @Delete(':producerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  async deleteProducer(@Param() { producerId }: InputSearchProducerId) {
    await this.producerService.delete(producerId!);
  }
}

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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProducerService } from '../../core/services/producer.service';
import {
  InputProducer,
  InputSearchProducer,
  InputSearchProducerId,
  InputUpdateProducer,
  OutputProducer,
} from '../dto/producer.dto';

@Controller({ path: 'producers', version: '1' })
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

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
  @ApiOkResponse({
    description: 'List of producers',
    type: OutputProducer,
    isArray: true,
  })
  @Get()
  async fetchProducers(@Query() query: InputSearchProducer) {
    return await this.producerService.fetch(query);
  }

  @Get(':producerId')
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  @ApiOkResponse({
    description: 'Get a producer',
    type: OutputProducer,
  })
  async getProducerById(@Param() { producerId }: InputSearchProducerId) {
    return await this.producerService.find(producerId!);
  }

  @Post()
  @ApiBody({ type: InputProducer })
  @ApiConflictResponse({
    description: 'Producer already exists',
    type: ProducerConflictResponse,
  })
  @ApiCreatedResponse({
    description: 'Producer created successfully',
    type: OutputProducer,
  })
  async createProducer(@Body() producer: InputProducer) {
    return await this.producerService.create(producer);
  }

  @Patch(':producerId')
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  @ApiBody({ type: InputUpdateProducer })
  @ApiNotFoundResponse({
    description: 'Producer not found',
    type: ProducerNotFoundResponse,
  })
  @ApiNoContentResponse({ description: 'Producer updated successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProducer(
    @Param() { producerId }: InputSearchProducerId,
    @Body() producer: InputUpdateProducer,
  ) {
    await this.producerService.update(producer, producerId!);
  }

  @Delete(':producerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'producerId', type: String, description: 'Valid UUID' })
  @ApiNoContentResponse({ description: 'Producer deleted successfully' })
  async deleteProducer(@Param() { producerId }: InputSearchProducerId) {
    await this.producerService.delete(producerId!);
  }
}

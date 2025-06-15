import { FarmConflictResponse } from '@application/farm/core/exceptions/farm-conflict.exception';
import { FarmNotFoundResponse } from '@application/farm/core/exceptions/farm-not-found.exception';
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
import { FarmService } from '../../core/services/farm.service';
import {
  InputFarm,
  InputSearchFarm,
  InputSearchFarmId,
  InputUpdateFarm,
  OutputFarm,
} from '../dto/farm.dto';

@Controller({ path: 'farms', version: '1' })
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Farm Name',
  })
  @ApiQuery({
    name: 'city',
    required: false,
    type: String,
    description: 'Farm City',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    type: String,
    description: 'Farm State',
  })
  @ApiQuery({
    name: 'totalArea',
    required: false,
    type: Number,
    description: 'Total area of the farm (in hectares)',
  })
  @ApiQuery({
    name: 'arableArea',
    required: false,
    type: Number,
    description: 'Arable area of the farm (in hectares)',
  })
  @ApiQuery({
    name: 'vegetationArea',
    required: false,
    type: Number,
    description: 'Vegetation area of the farm (in hectares)',
  })
  @ApiQuery({
    name: 'producerId',
    required: false,
    type: String,
    description: 'Producer valid id (UUID)',
  })
  @ApiOkResponse({
    description: 'List of farms',
    type: OutputFarm,
    isArray: true,
  })
  fetchFarms(@Query() query: InputSearchFarm) {
    return this.farmService.fetch(query);
  }

  @Get(':farmId')
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  @ApiOkResponse({
    description: 'Get farm',
    type: OutputFarm,
  })
  getFarmById(@Param() { farmId }: InputSearchFarmId) {
    return this.farmService.find(farmId);
  }

  @Post()
  @ApiBody({ type: InputFarm })
  @ApiConflictResponse({
    description: 'Farm already exists',
    type: FarmConflictResponse,
  })
  @ApiCreatedResponse({
    description: 'Create farm successfully',
    type: OutputFarm,
  })
  createFarm(@Body() farm: InputFarm) {
    return this.farmService.create(farm);
  }

  @Patch(':farmId')
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  @ApiBody({ type: InputUpdateFarm })
  @ApiNotFoundResponse({
    description: 'Farm not found',
    type: FarmNotFoundResponse,
  })
  @ApiNoContentResponse({ description: 'Farm updated successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateFarm(
    @Param() { farmId }: InputSearchFarmId,
    @Body() farm: InputUpdateFarm,
  ) {
    await this.farmService.update(farm, farmId);
  }

  @Delete(':farmId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  @ApiNoContentResponse({ description: 'Farm deleted successfully' })
  async deleteFarm(@Param() { farmId }: InputSearchFarmId) {
    await this.farmService.delete(farmId);
  }
}

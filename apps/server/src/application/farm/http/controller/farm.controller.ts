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
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FarmService } from '../../core/services/farm.service';
import {
  InputFarmDto,
  InputSearchFarm,
  InputSearchFarmId,
  UpdateFarmDto,
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
  fetchFarms(@Query() query: InputSearchFarm) {
    return this.farmService.fetch(query);
  }

  @Get(':farmId')
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  getFarmById(@Param() { farmId }: InputSearchFarmId) {
    return this.farmService.find(farmId);
  }

  @Post()
  @ApiBody({ type: InputFarmDto })
  @ApiConflictResponse({
    description: 'Farm already exists',
    type: FarmConflictResponse,
  })
  createFarm(@Body() farm: InputFarmDto) {
    return this.farmService.create(farm);
  }

  @Patch(':farmId')
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  @ApiBody({ type: UpdateFarmDto })
  @ApiNotFoundResponse({
    description: 'Farm not found',
    type: FarmNotFoundResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateFarm(
    @Param() { farmId }: InputSearchFarmId,
    @Body() farm: UpdateFarmDto,
  ) {
    await this.farmService.update(farm, farmId);
  }

  @Delete(':farmId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'farmId', type: String, description: 'Valid UUID' })
  async deleteFarm(@Param() { farmId }: InputSearchFarmId) {
    await this.farmService.delete(farmId);
  }
}

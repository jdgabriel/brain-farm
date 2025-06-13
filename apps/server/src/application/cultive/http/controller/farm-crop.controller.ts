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

import { FarmCropConflictResponse } from '@application/cultive/core/exceptions/farm-crop-conflict.exception';
import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { FarmCropService } from '@application/cultive/core/services/farm-crop.service';
import {
  InputFarmCropDto,
  InputSearchFarmCrop,
  InputSearchFarmCropId,
  UpdateFarmCropDto,
} from '../dto/farm-crop.dto';

@Controller({ path: 'crops', version: '1' })
export class FarmCropController {
  constructor(private readonly farmCropService: FarmCropService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'FarmCrop Name',
  })
  fetchFarmCrops(@Query() query: InputSearchFarmCrop) {
    return this.farmCropService.fetch(query);
  }

  @Get(':farmCropId')
  @ApiParam({ name: 'farmCropId', type: String, description: 'Valid UUID' })
  getFarmCropById(@Param() { farmCropId }: InputSearchFarmCropId) {
    return this.farmCropService.find(farmCropId);
  }

  @Post()
  @ApiBody({ type: InputFarmCropDto })
  @ApiConflictResponse({
    description: 'FarmCrop already exists',
    type: FarmCropConflictResponse,
  })
  createFarmCrop(@Body() farmCrop: InputFarmCropDto) {
    return this.farmCropService.create(farmCrop);
  }

  @Patch(':farmCropId')
  @ApiParam({ name: 'farmCropId', type: String, description: 'Valid UUID' })
  @ApiBody({ type: UpdateFarmCropDto })
  @ApiNotFoundResponse({
    description: 'FarmCrop not found',
    type: HarvestNotFoundResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateFarmCrop(
    @Param() { farmCropId }: InputSearchFarmCropId,
    @Body() farmCrop: UpdateFarmCropDto,
  ) {
    await this.farmCropService.update(farmCrop, farmCropId);
  }

  @Delete(':farmCropId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'farmCropId', type: String, description: 'Valid UUID' })
  async deleteFarmCrop(@Param() { farmCropId }: InputSearchFarmCropId) {
    await this.farmCropService.delete(farmCropId);
  }
}

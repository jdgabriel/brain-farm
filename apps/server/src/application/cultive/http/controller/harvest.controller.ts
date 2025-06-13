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
} from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';

import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { HarvestService } from '@application/cultive/core/services/harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from '../dto/harvest.dto';

@Controller({ path: 'harvest', version: '1' })
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiBody({ type: CreateHarvestDto })
  @HttpCode(HttpStatus.CREATED)
  createHarvest(@Body() harvest: CreateHarvestDto) {
    return this.harvestService.create(harvest);
  }

  @Get(':farmId')
  fetchHarvests(@Param('farmId') farmId: string) {
    return this.harvestService.fetchFarmId(farmId);
  }

  @Patch(':harvestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse({
    description: 'Harvest not found',
    type: HarvestNotFoundResponse,
  })
  async updateHarvest(
    @Param('harvestId') harvestId: string,
    @Body() harvest: UpdateHarvestDto,
  ) {
    await this.harvestService.update(harvest, harvestId);
  }

  @Delete(':harvestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteHarvest(@Param('harvestId') harvestId: string) {
    await this.harvestService.delete(harvestId);
  }
}

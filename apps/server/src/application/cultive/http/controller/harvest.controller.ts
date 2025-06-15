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
import { ApiBody, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { HarvestService } from '@application/cultive/core/services/harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from '../dto/harvest.dto';

@Controller({ path: 'farm', version: '1' })
@ApiTags('Harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post(':farmId/harvest')
  @ApiBody({ type: CreateHarvestDto })
  @HttpCode(HttpStatus.CREATED)
  createHarvest(@Body() harvest: CreateHarvestDto) {
    return this.harvestService.create(harvest);
  }

  @Get(':farmId/harvest')
  fetchHarvests(@Param('farmId') farmId: string) {
    return this.harvestService.fetchFarmId(farmId);
  }

  @Get(':farmId/harvest/:harvestId')
  getHarvest(@Param('harvestId') harvestId: string) {
    return this.harvestService.getHarvest(harvestId);
  }

  @Patch(':farmId/harvest/:harvestId')
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

  @Delete(':farmId/harvest/:harvestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteHarvest(@Param('harvestId') harvestId: string) {
    await this.harvestService.delete(harvestId);
  }
}

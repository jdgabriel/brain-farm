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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { HarvestService } from '@application/cultive/core/services/harvest.service';
import {
  InputHarvest,
  InputUpdateHarvest,
  OutputHarvest,
} from '../dto/harvest.dto';

@Controller({ path: 'farm', version: '1' })
@ApiTags('Harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post(':farmId/harvest')
  @ApiBody({ type: InputHarvest })
  @ApiCreatedResponse({
    description: 'Harvest created successfully',
    type: OutputHarvest,
  })
  @HttpCode(HttpStatus.CREATED)
  createHarvest(@Body() harvest: InputHarvest) {
    return this.harvestService.create(harvest);
  }

  @Get(':farmId/harvest')
  @ApiOkResponse({
    description: 'List of harvest by farm id',
    type: OutputHarvest,
    isArray: true,
  })
  fetchHarvests(@Param('farmId') farmId: string) {
    return this.harvestService.fetchFarmId(farmId);
  }

  @Get(':farmId/harvest/:harvestId')
  @ApiOkResponse({
    description: 'Get harvest successfully',
    type: OutputHarvest,
  })
  getHarvest(@Param('harvestId') harvestId: string) {
    return this.harvestService.getHarvest(harvestId);
  }

  @Patch(':farmId/harvest/:harvestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Harvest updated successfully' })
  @ApiNotFoundResponse({
    description: 'Harvest not found',
    type: HarvestNotFoundResponse,
  })
  async updateHarvest(
    @Param('harvestId') harvestId: string,
    @Body() harvest: InputUpdateHarvest,
  ) {
    await this.harvestService.update(harvest, harvestId);
  }

  @Delete(':farmId/harvest/:harvestId')
  @ApiNoContentResponse({ description: 'Harvest deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteHarvest(@Param('harvestId') harvestId: string) {
    await this.harvestService.delete(harvestId);
  }
}

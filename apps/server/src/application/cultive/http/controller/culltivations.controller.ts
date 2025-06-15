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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { CultivationService } from '@application/cultive/core/services/cultivation.service';
import {
  InputCultivation,
  OutputCultivation,
  UpdateCultivation,
} from '../dto/cultivation.dto';

@Controller({ path: 'harvest', version: '1' })
@ApiTags('Cultivations')
export class CultivationsController {
  constructor(private readonly cultivationService: CultivationService) {}

  @Get(':harvestId/cultivations')
  @ApiOkResponse({
    description: 'List of cultivations by harvest id',
    type: OutputCultivation,
    isArray: true,
  })
  fetchCultivations(@Param('harvestId') harvestId: string) {
    return this.cultivationService.fetch(harvestId);
  }

  @Post(':harvestId/cultivations')
  @ApiBody({ type: InputCultivation })
  @ApiCreatedResponse({
    description: 'Cultivation created',
    type: OutputCultivation,
  })
  createCultivation(@Body() cultivation: InputCultivation) {
    return this.cultivationService.create(cultivation);
  }

  @Patch(':harvestId/cultivations/:cultivationId')
  @ApiBody({ type: UpdateCultivation })
  @ApiNotFoundResponse({
    description: 'Cultivation not found',
    type: HarvestNotFoundResponse,
  })
  @ApiNoContentResponse({ description: 'Cultivation updated successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCultivation(
    @Param('cultivationId') cultivationId: string,
    @Body() cultivation: UpdateCultivation,
  ) {
    await this.cultivationService.update(cultivation, cultivationId);
  }

  @Delete(':harvestId/cultivations/:cultivationId')
  @ApiParam({ name: 'cultivationId', type: String, description: 'Valid UUID' })
  @ApiNoContentResponse({ description: 'Cultivation deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCultivation(@Param('cultivationId') cultivationId: string) {
    await this.cultivationService.delete(cultivationId);
  }
}

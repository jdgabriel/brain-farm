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
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { HarvestNotFoundResponse } from '@application/cultive/core/exceptions/harvest-not-found.exception';
import { CultivationService } from '@application/cultive/core/services/cultivation.service';
import { InputCultivationDto, UpdateCultivationDto } from '../dto/cultivation.dto';

@Controller({ path: 'harvest', version: '1' })
@ApiTags('Cultivations')
export class CultivationsController {
  constructor(private readonly cultivationService: CultivationService) {}

  @Get(':harvestId/cultivations')
  fetchCultivations(@Param('harvestId') harvestId: string) {
    return this.cultivationService.fetch(harvestId);
  }

  @Post(':harvestId/cultivations')
  @ApiBody({ type: InputCultivationDto })
  createCultivation(@Body() cultivation: InputCultivationDto) {
    return this.cultivationService.create(cultivation);
  }

  @Patch(':harvestId/cultivations/:cultivationId')
  @ApiBody({ type: UpdateCultivationDto })
  @ApiNotFoundResponse({
    description: 'Cultivation not found',
    type: HarvestNotFoundResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCultivation(
    @Param('cultivationId') cultivationId: string,
    @Body() cultivation: UpdateCultivationDto,
  ) {
    await this.cultivationService.update(cultivation, cultivationId);
  }

  @Delete(':harvestId/cultivations/:cultivationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'cultivationId', type: String, description: 'Valid UUID' })
  async deleteCultivation(@Param('cultivationId') cultivationId: string) {
    await this.cultivationService.delete(cultivationId);
  }
}

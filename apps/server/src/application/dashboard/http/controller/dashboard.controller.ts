import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DashboardService } from '../../core/services/dashboard.service';
import {
  OutputCountFarms,
  OutputCountProducers,
  OutputTotalAreas,
  OutputTotalCultives,
} from '../dto/dashboard.dto';

@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('farm-count')
  @ApiOkResponse({
    description: 'Get farms count',
    type: OutputCountFarms,
  })
  async countFarms() {
    return await this.dashboardService.countFarms();
  }

  @Get('producers-count')
  @ApiOkResponse({
    description: 'Get producers count',
    type: OutputCountProducers,
  })
  async producersCount() {
    return await this.dashboardService.countProducers();
  }

  @Get('total-area-count')
  @ApiOkResponse({
    description: 'Get total areas registered',
    type: OutputTotalAreas,
  })
  async totalAreas() {
    return await this.dashboardService.totalAreas();
  }

  @Get('total-cultives')
  @ApiOkResponse({
    description: 'Get list of cultives and totals',
    type: OutputTotalCultives,
  })
  async totalCultives() {
    return await this.dashboardService.totalCultives();
  }
}

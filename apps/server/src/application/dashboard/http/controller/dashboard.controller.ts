import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../../core/services/dashboard.service';

@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('farm-count')
  async countFarms() {
    return await this.dashboardService.countFarms();
  }

  @Get('total-area-count')
  async totalAreas() {
    return await this.dashboardService.totalAreas();
  }

  @Get('total-cultives')
  async totalCultives() {
    return await this.dashboardService.totalCultives();
  }
}

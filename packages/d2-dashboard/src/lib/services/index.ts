import { DashboardConfigService } from './dashboard-config.service';
import { DashboardItemService } from './dashboard-item.service';
import { DashboardService } from './dashboard.service';

export const d2DashboardServices: any[] = [
  DashboardService,
  DashboardItemService,
];

export { DashboardService, DashboardItemService, DashboardConfigService };

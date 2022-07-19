import { DashboardConfigService } from './dashboard-config.service';
import { DashboardItemService } from './dashboard-item.service';
import { DashboardService } from './dashboard.service';
import { TrackerDashboardService } from './tracker-dashboard.service';

export const d2DashboardServices: any[] = [
  DashboardService,
  DashboardItemService,
  TrackerDashboardService,
];

export {
  DashboardService,
  DashboardItemService,
  DashboardConfigService,
  TrackerDashboardService,
};

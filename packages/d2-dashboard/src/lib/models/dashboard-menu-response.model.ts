import { DashboardMenuObject } from './dashboard-menu.model';

export interface DashboardMenuResponse {
  loading: boolean;
  error?: object;
  currentDashboardId: string;
  dashboardMenuItems: DashboardMenuObject[];
}

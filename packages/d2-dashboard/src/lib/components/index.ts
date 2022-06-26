import { CurrentDashboardHeaderComponent } from './current-dashboard-header/current-dashboard-header.component';
import { DashboardItemsComponent } from './dashboard-items/dashboard-items.component';
import { DashboardLoaderComponent } from './dashboard-loader/dashboard-loader.component';
import { DashboardMenuItemComponent } from './dashboard-menu-item/dashboard-menu-item.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';

export const d2DashboardComponents: any[] = [
  DashboardMenuComponent,
  CurrentDashboardHeaderComponent,
  DashboardItemsComponent,
  DashboardMenuItemComponent,
];

export const d2DashboardEntryComponents: any[] = [DashboardLoaderComponent];

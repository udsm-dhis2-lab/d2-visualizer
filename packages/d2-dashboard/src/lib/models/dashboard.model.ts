import { PeriodType } from '@iapps/period-utilities';
import { KtdGridLayout } from '@katoid/angular-grid-layout';
import { DashboardAccess } from './dashboard-access.model';
import { DashboardItem, DashboardItemObject } from './dashboard-item.model';

export interface DashboardObject {
  id: string;
  name?: string;
  displayName?: string;
  created?: string;
  lastUpdated?: string;
  description?: string;
  favorite?: boolean;
  bookmarkPending?: boolean;
  supportBookmark?: boolean;
  access?: DashboardAccess;
  addingItem?: boolean;
  hasNewUnsavedFavorite?: boolean;
  creating?: boolean;
  updating?: boolean;
  showDeleteDialog?: boolean;
  deleting?: boolean;
  saving?: boolean;
  updatedOrCreated?: boolean;
  error?: any;
  namespace?: string;
  unSaved?: boolean;
  publicAccess?: string;
  externalAccess?: boolean;
  userGroupAccesses?: any[];
  dashboardItems?: DashboardItemObject[];
  dashboardItemsLayout?: KtdGridLayout;
  userAccesses?: any[];
  user?: {
    id: string;
  };
}

export class Dashboard {
  constructor(
    public dashboardResponse: { [key: string]: string | number | object }
  ) {}

  get dashboardItems(): DashboardItemObject[] {
    return ((this.dashboardResponse['dashboardItems'] as any) || []).map(
      (
        dashboardItem: { [key: string]: string | number | object },
        dashboardItemIndex: number
      ) => {
        return new DashboardItem(dashboardItem, dashboardItemIndex).toObject();
      }
    );
  }

  get dashboardItemsLayout(): KtdGridLayout {
    return (this.dashboardItems || []).map((dashboardItem) => {
      const { id, x, y, h, w } = dashboardItem;
      return { id, x, y, h, w };
    });
  }

  toObject(): DashboardObject {
    return {
      id: this.dashboardResponse['id'] as string,
      name: this.dashboardResponse['name'] as string,
      dashboardItems: this.dashboardItems,
      dashboardItemsLayout: this.dashboardItemsLayout,
    };
  }
}

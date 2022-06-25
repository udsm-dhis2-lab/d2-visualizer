export interface DashboardItemObject {
  id: string;
  created?: string;
  lastUpdated?: string;
  type: string;
  height?: number;
  width?: number;
  gridColumn?: string;
  gridRow?: string;
  shape?: string;
  x: number;
  y: number;
  h: number;
  w: number;
  publicAccess?: string;
  externalAccess?: boolean;
  appKey?: string;
  singleValue?: boolean;
  visualization: DashboardVisualization;
}

export class DashboardItem {
  constructor(
    public dashboardItemResponse: { [key: string]: string | number | object }
  ) {}

  toObject(): DashboardItemObject {
    return {
      id: this.dashboardItemResponse['id'] as string,
      type: this.dashboardItemResponse['type'] as string,
      x: this.dashboardItemResponse['x'] as number,
      y: this.dashboardItemResponse['y'] as number,
      h: this.dashboardItemResponse['height'] as number,
      w: this.dashboardItemResponse['width'] as number,
      visualization: this.dashboardItemResponse[
        'visualization'
      ] as DashboardVisualization,
    };
  }
}

export interface DashboardVisualization {
  id?: string;
  name: string;
  description?: string;
  lastUpdated?: string;
  publicAccess?: string;
  regressionType: string;
  singleValue?: boolean;
  title?: string;
  type: string;
  dimensions: DashboardVisualizationDimension[];
}

export interface DashboardVisualizationDimension {
  id?: string;
  dimension: string;
  created?: string;
  lastUpdated?: string;
  layout: string;
  items: Array<{
    id?: string;
    created?: string;
    lastUpdated?: string;
    dimensionItem: string;
    dimensionItemType: string;
  }>;
}

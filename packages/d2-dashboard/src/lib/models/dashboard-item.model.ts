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
    public dashboardItemResponse: { [key: string]: string | number | object },
    public dashboardItemIndex: number
  ) {}

  get width(): number {
    return (this.dashboardItemResponse['width'] as number) || 29;
  }

  get height(): number {
    return (this.dashboardItemResponse['height'] as number) || 20;
  }

  get x(): number {
    if (this.dashboardItemResponse['x'] !== undefined) {
      return this.dashboardItemResponse['x'] as number;
    }

    return this.dashboardItemIndex % 2 === 0 ? 0 : 29;
  }

  get y(): number {
    if (this.dashboardItemResponse['y'] !== undefined) {
      return this.dashboardItemResponse['y'] as number;
    }
    return this.dashboardItemIndex === 0
      ? 0
      : this.dashboardItemIndex % 2 === 0
      ? this.dashboardItemIndex * 10
      : (this.dashboardItemIndex - 1) * 10;
  }

  toObject(): DashboardItemObject {
    return {
      id: this.dashboardItemResponse['id'] as string,
      type: this.dashboardItemResponse['type'] as string,
      x: this.x,
      y: this.y,
      h: this.height,
      w: this.width,
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

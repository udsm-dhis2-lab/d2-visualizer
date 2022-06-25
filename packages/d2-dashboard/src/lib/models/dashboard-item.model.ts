export interface DashboardItem {
  id?: string;
  created?: string;
  lastUpdated?: string;
  type: string;
  height?: number;
  width?: number;
  gridColumn?: string;
  gridRow?: string;
  shape?: string;
  x?: number;
  y?: number;
  publicAccess?: string;
  externalAccess?: boolean;
  appKey?: string;
  singleValue?: boolean;
  visualization: DashboardVisualization;
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

export interface DashboardConfig {
  useDataStore?: boolean;
  dataStoreNamespace?: string;
  rootUrl: string;
  selectionConfig?: DashboardSelectionConfig;
}

export interface DashboardSelectionConfig {
  allowSelectionOnStartUp: boolean;
  startUpPeriodType: string;
  startUpPeriod?: string;
}

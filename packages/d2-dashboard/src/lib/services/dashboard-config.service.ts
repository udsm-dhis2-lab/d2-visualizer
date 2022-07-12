import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DashboardConfig } from '../models';

export class DashboardConfigClass implements DashboardConfig {
  useDataStore = false;
  dataStoreNamespace = '';
}

export const DASHBARD_CONFIG = new InjectionToken<DashboardConfig>(
  'dashboardConfig'
);

@Injectable({ providedIn: 'root' })
export class DashboardConfigService {
  constructor(
    @Optional() @Inject(DASHBARD_CONFIG) private config: DashboardConfig
  ) {}

  getConfig(): DashboardConfig {
    return this.config;
  }
}

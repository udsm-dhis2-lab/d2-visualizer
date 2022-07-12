import { Injectable } from '@angular/core';
import {
  ErrorMessage,
  NgxDhis2HttpClientService,
} from '@iapps/ngx-dhis2-http-client';
import { catchError, map, of, zip } from 'rxjs';
import { DashboardConfig } from '../models';
import { DashboardConfigService } from './dashboard-config.service';

@Injectable()
export class DashboardItemService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private dashboardConfigService: DashboardConfigService
  ) {}

  getVisualization(id: string, hasExtension: boolean = false) {
    return zip(
      this.httpClient.get(
        `visualizations/${id}.json?fields=id,name,title,subtitle,type,hideEmptyColumns,rowSubTotals,cumulativeValues,showDimensionLabels,sortOrder,fontSize,topLimit,percentStackedValues,noSpaceBetweenColumns,showHierarchy,hideTitle,skipRounding,showData,hideEmptyRows,displayDensity,regressionType,colTotals,displayFormName,hideEmptyRowItems,aggregationType,hideSubtitle,hideLegend,colSubTotals,rowTotals,digitGroupSeparator,regression,columns[dimension,items[id,name,dimensionItem,dimensionItemType]],filters[dimension,items[id,name,dimensionItem,dimensionItemType]],rows[dimension,items[id,name,dimensionItem,dimensionItemType]],legendSet[id,name,legends[id,name,startValue,endValue,color]]`
      ),
      hasExtension ? this.getVisualizationExtension(id) : of(null)
    ).pipe(
      map((visualizationResponse: any[]) => {
        return {
          ...visualizationResponse[0],
          ...(visualizationResponse[1] || {}),
        };
      })
    );
  }

  getVisualizationExtension(id: string) {
    const config: DashboardConfig = this.dashboardConfigService.getConfig();
    return this.httpClient
      .get(`dataStore/${config?.dataStoreNamespace}-visualizations/${id}`)
      .pipe(
        catchError((error: ErrorMessage) => {
          console.warn(error.message);
          return of(null);
        })
      );
  }
}

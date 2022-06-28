import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable()
export class DashboardItemService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getVisualization(id: string) {
    return this.httpClient.get(
      `visualizations/${id}.json?fields=id,name,type,hideEmptyColumns,rowSubTotals,cumulativeValues,showDimensionLabels,sortOrder,fontSize,topLimit,percentStackedValues,noSpaceBetweenColumns,showHierarchy,hideTitle,skipRounding,showData,hideEmptyRows,displayDensity,regressionType,colTotals,displayFormName,hideEmptyRowItems,aggregationType,hideSubtitle,hideLegend,colSubTotals,rowTotals,digitGroupSeparator,regression,columns[dimension,items[id,name,dimensionItemtType]],filters[dimension,items[id,name,dimensionItemtType]],rows[dimension,items[id,name,dimensionItemtType]]`
    );
  }
}

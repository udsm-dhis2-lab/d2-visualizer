import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSelectionFiltersComponent } from './dashboard-selection-filters.component';
import { d2DashboardMaterialModules } from '../../shared';
import { d2DashboardSelectionFilterDialogs } from './dialogs';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';

@NgModule({
  imports: [
    CommonModule,
    ...d2DashboardMaterialModules,
    NgxDhis2OrgUnitFilterModule,
  ],
  declarations: [
    DashboardSelectionFiltersComponent,
    ...d2DashboardSelectionFilterDialogs,
  ],
  entryComponents: [...d2DashboardSelectionFilterDialogs],
  exports: [DashboardSelectionFiltersComponent],
})
export class DashboardSelectionFiltersModule {}

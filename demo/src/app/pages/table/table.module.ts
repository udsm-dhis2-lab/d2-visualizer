import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { SharedModule } from '../../shared/shared.module';
import { TableVisualizationComponent } from './containers/table-visualization/table-visualization.component';

@NgModule({
  declarations: [TableComponent, TableVisualizationComponent],
  imports: [CommonModule, TableRoutingModule, SharedModule],
})
export class TableModule {}

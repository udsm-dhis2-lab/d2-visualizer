import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { SharedModule } from '../../shared/shared.module';
import { TableVisualizationComponent } from './containers/table-visualization/table-visualization.component';
import { NgxD2TableModule } from '@iapps/ngx-d2-table';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [TableComponent, TableVisualizationComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
    NgxD2TableModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class TableModule {}

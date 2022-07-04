import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './containers/menu/menu.component';
import { VisualizationComponent } from './containers/visualization/visualization.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [ChartComponent, MenuComponent, VisualizationComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    SharedModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
  ],
})
export class ChartModule {}

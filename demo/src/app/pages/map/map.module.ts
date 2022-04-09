import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { SharedModule } from '../../shared/shared.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class MapModule {}

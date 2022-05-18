import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { SharedModule } from '../../shared/shared.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgxD2MapModule } from '@iapps/ngx-d2-map';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
    NgxD2MapModule,
    MonacoEditorModule.forRoot(),
  ],
})
export class MapModule {}

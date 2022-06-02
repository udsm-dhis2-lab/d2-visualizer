import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxD2MapComponent } from './ngx-d2-map.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatButtonToggleModule,
  ],
  declarations: [NgxD2MapComponent],
  exports: [NgxD2MapComponent],
})
export class NgxD2MapModule {}

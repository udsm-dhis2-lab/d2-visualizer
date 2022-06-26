import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import {
  d2DashboardComponents,
  d2DashboardEntryComponents,
} from './components';
import { d2DashboardContainers } from './containers';
import { D2DashboardRoutingModule } from './d2-dashboard-routing.module';
import { D2DashboardComponent } from './d2-dashboard.component';
import { d2DashboardServices } from './services';

@NgModule({
  imports: [
    CommonModule,
    D2DashboardRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ScrollingModule,
    NgxDhis2HttpClientModule,
    KtdGridModule,
    OverlayModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    D2DashboardComponent,
    ...d2DashboardContainers,
    ...d2DashboardComponents,
    ...d2DashboardEntryComponents,
  ],
  providers: [
    ...d2DashboardServices,
    {
      provide: MatSnackBarRef,
      useValue: {},
    },
  ],
  entryComponents: [...d2DashboardEntryComponents],
  exports: [D2DashboardComponent],
})
export class D2DashboardModule {}

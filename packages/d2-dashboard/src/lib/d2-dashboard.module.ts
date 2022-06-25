import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { d2DashboardContainers } from './containers';
import { D2DashboardComponent } from './d2-dashboard.component';
import { D2DashboardRoutingModule } from './d2-dashboard-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { d2DashboardComponents } from './components';
import { d2DashboardServices } from './services';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { KtdGridModule } from '@katoid/angular-grid-layout';

@NgModule({
  imports: [
    CommonModule,
    D2DashboardRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    NgxDhis2HttpClientModule,
    KtdGridModule,
  ],
  declarations: [
    D2DashboardComponent,
    ...d2DashboardContainers,
    ...d2DashboardComponents,
  ],
  providers: [...d2DashboardServices],
  exports: [D2DashboardComponent],
})
export class D2DashboardModule {}

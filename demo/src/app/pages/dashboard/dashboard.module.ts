import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { D2DashboardModule } from '@iapps/d2-dashboard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    D2DashboardModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMenuResponse } from './models/dashboard-menu-response.model';
import { DashboardService } from './services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'd2-dashboard',
  templateUrl: './d2-dashboard.component.html',
  styleUrls: ['./d2-dashboard.component.scss'],
})
export class D2DashboardComponent implements OnInit {
  dashboardMenuResponse$!: Observable<DashboardMenuResponse>;
  currentDashboardId$!: Observable<any>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardMenuResponse$ = this.dashboardService.getMenuResponse();
    this.currentDashboardId$ = this.dashboardService.getCurrentDashboardId();
  }

  onSetCurrentDashboard(id: string) {
    this.dashboardService.setCurrentDashboard(id);
  }
}

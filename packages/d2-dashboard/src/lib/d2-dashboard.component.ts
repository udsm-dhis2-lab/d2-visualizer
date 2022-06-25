import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardMenuObject } from './models';
import { DashboardService } from './services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'd2-dashboard',
  templateUrl: './d2-dashboard.component.html',
  styleUrls: ['./d2-dashboard.component.scss'],
})
export class D2DashboardComponent implements OnInit {
  dashboardMenuItems$!: Observable<DashboardMenuObject[]>;
  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardMenuItems$ = this.dashboardService.getMenuList();
    this.router.navigate(['/dashboard/id']);
  }

  onSetCurrentDashboard(id: string) {
    this.router.navigate(['/dashboard/' + id]);
  }
}

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { DashboardLoaderComponent } from './components/dashboard-loader/dashboard-loader.component';
import { DashboardMenuObject } from './models';
import { DashboardMenuResponse } from './models/dashboard-menu-response.model';
import { DashboardService } from './services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'd2-dashboard',
  templateUrl: './d2-dashboard.component.html',
  styleUrls: ['./d2-dashboard.component.scss'],
})
export class D2DashboardComponent implements OnInit {
  dashboardMenuList$!: Observable<DashboardMenuObject[]>;
  currentDashboardId$?: Observable<string | undefined>;
  loading = true;
  error?: object;
  constructor(private dashboardService: DashboardService) {}

  get dashboardMenuLoaded(): boolean {
    return !this.loading && !this.error;
  }

  ngOnInit() {
    this.dashboardMenuList$ = this.dashboardService.getMenuList().pipe(
      tap(() => {
        this.loading = false;
      }),
      catchError((error) => {
        this.loading = false;
        this.error = error;
        return of([]);
      })
    );
    this.currentDashboardId$ = this.dashboardService.getCurrentDashboardId();
  }

  onSetCurrentDashboard(dashboardMenuItem: DashboardMenuObject) {
    this.dashboardService.setCurrentDashboard(dashboardMenuItem);
  }
}
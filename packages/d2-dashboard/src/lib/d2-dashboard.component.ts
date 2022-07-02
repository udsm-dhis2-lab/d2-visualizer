import { Component, Input, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { DashboardMenuObject } from './models';
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
        console.log(error);
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

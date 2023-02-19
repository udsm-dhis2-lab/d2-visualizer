import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { DashboardMenuObject } from './models';
import { DashboardService } from './services';
import {
  D2DashboardMenuState,
  getAllDashboardMenus,
  getDashboardMenuLoadedStatus,
  getDashboardMenuLoadingStatus,
  getDashboardMenuLoadingStatusErrorMessage,
} from './store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'd2-dashboard',
  templateUrl: './d2-dashboard.component.html',
  styleUrls: ['./d2-dashboard.component.scss'],
})
export class D2DashboardComponent implements OnInit {
  dashboardMenuList$!: Observable<DashboardMenuObject[]>;
  dashboardMenuLoaded$!: Observable<boolean>;
  dashboardMenuLoading$!: Observable<boolean>;
  dashboardMenuLoadingError$!: Observable<ErrorMessage>;
  currentDashboardId$?: Observable<string | undefined>;

  constructor(
    private dashboardService: DashboardService,
    private d2DashboardMenuStore: Store<D2DashboardMenuState>
  ) {}

  ngOnInit() {
    this.dashboardMenuList$ = this.d2DashboardMenuStore.pipe(
      select(getAllDashboardMenus)
    );
    this.dashboardMenuLoaded$ = this.d2DashboardMenuStore.pipe(
      select(getDashboardMenuLoadedStatus)
    );
    this.dashboardMenuLoading$ = this.d2DashboardMenuStore.pipe(
      select(getDashboardMenuLoadingStatus)
    );
    this.dashboardMenuLoadingError$ = this.d2DashboardMenuStore.pipe(
      select(getDashboardMenuLoadingStatusErrorMessage)
    );
    // this.dashboardMenuList$ = this.dashboardService.getMenuList().pipe(
    //   tap(() => {
    //     this.loading = false;
    //   }),
    //   catchError((error) => {
    //     this.loading = false;
    //     this.error = error;
    //     return of([]);
    //   })
    // );
    this.currentDashboardId$ = this.dashboardService.getCurrentDashboardId();
  }

  onSetCurrentDashboard(dashboardMenuItem: DashboardMenuObject) {
    this.dashboardService.setCurrentDashboard(dashboardMenuItem);
  }
}

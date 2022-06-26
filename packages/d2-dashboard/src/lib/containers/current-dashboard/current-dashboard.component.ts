import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { filter, Observable, of, switchMap, map, catchError, tap } from 'rxjs';
import { DashboardObject, DashboardResponse } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'iapps-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$?: Observable<DashboardObject | undefined>;
  error?: object;
  constructor(
    private dashboardService: DashboardService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentDashboard$ = this.activateRoute.params.pipe(
      switchMap(({ id }) => {
        return this.dashboardService.getCurrentDashboard(id);
      }),
      catchError((error) => {
        this.error = error;
        return of(undefined);
      })
    );
  }
}

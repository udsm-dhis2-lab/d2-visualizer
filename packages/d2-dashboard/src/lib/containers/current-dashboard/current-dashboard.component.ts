import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, Observable, of, switchMap } from 'rxjs';
import { DashboardObject, VisualizationDataSelection } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'iapps-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$?: Observable<DashboardObject | undefined>;
  globalSelection$?: Observable<VisualizationDataSelection[]>;
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
    this.globalSelection$ = this.dashboardService.getGlobalSelection();
  }

  onSetGlobalFilter(dataSelections: VisualizationDataSelection[], id: string) {
    this.dashboardService.setGlobalSelections(dataSelections, id);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import {
  DashboardObject,
  DashboardSelectionConfig,
  VisualizationDataSelection,
} from '../../models';
import { GlobalSelection } from '../../models/global-selection.model';
import { DashboardConfigService, DashboardService } from '../../services';

@Component({
  selector: 'd2-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$?: Observable<DashboardObject | undefined>;
  globalSelection$!: Observable<GlobalSelection>;
  error?: object;
  loading = true;
  selectionConfig?: DashboardSelectionConfig;
  constructor(
    private dashboardService: DashboardService,
    private activateRoute: ActivatedRoute,
    private dashboardConfig: DashboardConfigService
  ) {}

  ngOnInit() {
    this.selectionConfig = this.dashboardConfig.getConfig()?.selectionConfig;
    this.currentDashboard$ = this.activateRoute.params.pipe(
      switchMap(({ id }) => {
        this.loading = true;
        return this.dashboardService.getCurrentDashboard(id);
      }),
      tap(() => {
        this.loading = false;
      }),
      catchError((error) => {
        this.error = error;
        this.loading = false;
        return of(undefined);
      })
    );
    this.globalSelection$ = this.dashboardService.getGlobalSelection();
  }

  onSetGlobalFilter(dataSelections: VisualizationDataSelection[], id: string) {
    this.dashboardService.setGlobalSelections(dataSelections, id);
  }
}

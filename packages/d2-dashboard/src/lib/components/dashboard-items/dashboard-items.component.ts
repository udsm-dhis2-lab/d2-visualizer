import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { Observable, of, switchMap } from 'rxjs';
import {
  DashboardItemObject,
  DashboardObject,
  VisualizationDataSelection,
} from '../../models';
import { DashboardItemService, TrackerDashboardService } from '../../services';

@Component({
  selector: 'd2-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemsComponent implements OnInit, OnChanges {
  @Input() dashboard$?: Observable<DashboardObject | undefined>;
  @Input() dashboardItems!: DashboardItemObject[];
  @Input() dashboardItemsLayout!: KtdGridLayout;
  @Input() dataSelections?: VisualizationDataSelection[];

  cols = 60;
  rowHeight = 20;

  trackById = ktdTrackById;

  trackedEntityInstances$?: Observable<any>;

  constructor(private trackerDashboardService: TrackerDashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSelections'] && !changes['dataSelections'].firstChange) {
      this._setTrackedEntityInstances();
    }
  }

  ngOnInit(): void {
    this._setTrackedEntityInstances();
  }

  private _setTrackedEntityInstances() {
    this.trackedEntityInstances$ = this.dashboard$?.pipe(
      switchMap((dashboard: DashboardObject | undefined) =>
        dashboard?.isTrackerDashboard
          ? this.trackerDashboardService.getTrackedEntityInstances(
              dashboard,
              this.dataSelections
            )
          : of(undefined)
      )
    );
  }
}

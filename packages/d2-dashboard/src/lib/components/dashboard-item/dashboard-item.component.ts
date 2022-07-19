import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { D2Visualizer } from '@iapps/d2-visualizer';
import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
  Observable,
  Subject,
} from 'rxjs';
import { DashboardItemObject, VisualizationDataSelection } from '../../models';
import { DashboardItemService, TrackerDashboardService } from '../../services';

@Component({
  selector: 'd2-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemComponent implements OnInit, OnChanges {
  @Input() trackedEntityInstances?: any[];
  @Input() isTrackerDashboard?: boolean;
  @Input() dashboardItem!: DashboardItemObject;
  @Input() dataSelections?: VisualizationDataSelection[];

  visualizationConfig: any;

  private _loading$: BehaviorSubject<boolean>;
  loading$: Observable<boolean>;
  error?: any;
  visualizationContainerHeight!: number;
  constructor(
    private dashboardItemService: DashboardItemService,
    private trackerDashboardService: TrackerDashboardService
  ) {
    this._loading$ = new BehaviorSubject<boolean>(true);
    this.loading$ = this._loading$.asObservable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSelections'] && !changes['dataSelections'].firstChange) {
      this.setVisualization();
    }
  }

  async ngOnInit() {
    this.visualizationContainerHeight =
      document.getElementsByClassName(
        'dashboard-item-' + this.dashboardItem.id
      )[0]?.clientHeight || 400;
    this.setVisualization();
  }

  async setVisualization() {
    this._loading$.next(true);
    if (this.dashboardItem?.visualization?.id) {
      try {
        this.visualizationConfig =
          this.visualizationConfig ||
          (await firstValueFrom(
            this.dashboardItemService.getVisualization(
              this.dashboardItem?.visualization?.id as string,
              this.dashboardItem.hasExtension
            )
          ));

        const trackedEntityInstances = this.visualizationConfig
          .isTrackerVisualization
          ? await this._getTrackedEntityInstances()
          : undefined;

        await new D2Visualizer()
          .setId(this.visualizationConfig?.id)
          .setConfig(this.visualizationConfig)
          .setSelections(this.dataSelections || [])
          .setType(this.visualizationConfig.type)
          .setChartType(this.visualizationConfig.type)
          .setTrackedEntityInstances(trackedEntityInstances as any[])
          .draw();
      } catch (error) {
        this._loading$.next(false);
        console.log(error);
      }
    }
    this._loading$.next(false);
  }

  private _getTrackedEntityInstances() {
    return firstValueFrom(
      this.trackerDashboardService.getTrackedEntityInstances(
        this.visualizationConfig.program as string,
        this.visualizationConfig.periodType as string,
        this.dataSelections
      )
    );
  }
}

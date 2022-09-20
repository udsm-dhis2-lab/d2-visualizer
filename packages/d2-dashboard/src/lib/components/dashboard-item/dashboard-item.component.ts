import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  D2Visualizer,
  DownloadFormat,
  VisualizerPlotOptions,
} from '@iapps/d2-visualizer';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
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
  visualizationContainerHeight!: string;
  fullScreen!: boolean;
  visualizationElement: any;
  hideVisualization?: boolean;
  visualizer!: D2Visualizer;

  get dashboardContainerId(): string {
    return (
      (this.dashboardItem?.visualization?.id || 'visualization_id') +
      '__container'
    );
  }

  get dashboardVisualizationId(): string {
    return this.dashboardItem?.visualization?.id || 'visualization_id';
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullScreenModes(event: any) {
    event.stopPropagation();

    if (!document.fullscreenElement) {
      this.fullScreen = false;
    }
  }

  get isChart(): boolean {
    return (
      (this.dashboardItem?.visualization?.type || this.dashboardItem.type) ===
      ('CHART' ||
        'LINE' ||
        'COLUMN' ||
        'BAR' ||
        'DOTTED' ||
        'PIE' ||
        'STACKED_BAR' ||
        'STACKED_COLUMN')
    );
  }

  get visualizationHeight(): string {
    return this.fullScreen
      ? '100vh'
      : (document.getElementsByClassName(
          'dashboard-item-' + this.dashboardItem.id
        )[0]?.clientHeight || 400) + 'px';
  }

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
      (document.getElementsByClassName(
        'dashboard-item-' + this.dashboardItem.id
      )[0]?.clientHeight || 400) + 'px';
    this.setVisualization();
  }

  async setVisualization() {
    this._loading$.next(true);
    if (this.dashboardItem?.visualization?.id) {
      try {
        this.visualizationConfig =
          this.visualizationConfig ||
          (await firstValueFrom(
            this.dashboardItemService.getItem(
              this.dashboardItem.visualization.id as string,
              this.dashboardItem.type,
              this.dashboardItem.hasExtension
            )
          ));

        const trackedEntityInstances = this.visualizationConfig
          .isTrackerVisualization
          ? await this._getTrackedEntityInstances()
          : undefined;

        this.visualizer = await new D2Visualizer()
          .setId(this.visualizationConfig?.id)
          .setConfig(this.visualizationConfig)
          .setSelections(this.dataSelections || [])
          .setType(this.visualizationConfig.type)
          .setChartType(this.visualizationConfig.type)
          .setPlotOptions(
            new VisualizerPlotOptions().setHeight(this.visualizationHeight)
          )
          .setTrackedEntityInstances(trackedEntityInstances as any[])
          .draw();
      } catch (error) {
        this._loading$.next(false);
        console.log(error);
      }
    }
    this._loading$.next(false);
  }

  onDownload(format: DownloadFormat) {
    this.visualizer.download(format);
  }

  async onFullScreenAction() {
    this.visualizationElement = document.getElementById(
      this.dashboardContainerId
    );

    this.hideVisualization = true;

    if (!this.fullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }

    this.fullScreen = !this.fullScreen;
    this.hideVisualization = false;
    this.visualizer.plotOptions.height = this.visualizationHeight;

    await this.visualizer.draw();

    // setTimeout(async () => {

    // }, 100);
  }

  async onTypeChange(visualizationType: any) {
    this.visualizer.setChartType(visualizationType).setType(visualizationType);
    await this.visualizer.draw();
  }

  openFullscreen() {
    if (this.visualizationElement.requestFullscreen) {
      this.visualizationElement.requestFullscreen();
    } else if (this.visualizationElement.mozRequestFullScreen) {
      /* Firefox */
      this.visualizationElement.mozRequestFullScreen();
    } else if (this.visualizationElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.visualizationElement.webkitRequestFullscreen();
    } else if (this.visualizationElement.msRequestFullscreen) {
      /* IE/Edge */
      this.visualizationElement.msRequestFullscreen();
    }
  }

  closeFullscreen() {
    document.exitFullscreen();
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

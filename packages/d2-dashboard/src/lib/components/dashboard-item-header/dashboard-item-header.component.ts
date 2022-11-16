import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VISUALIZATION_TYPES, DownloadFormat } from '@iapps/d2-visualizer';

@Component({
  selector: 'd2-dashboard-item-header',
  templateUrl: './dashboard-item-header.component.html',
  styleUrls: ['./dashboard-item-header.component.scss'],
})
export class DashboardItemHeaderComponent {
  @Input() fullScreen!: boolean;
  @Input() isChart!: boolean;
  @Input() hideChartTypes!: boolean | undefined;
  @Input() visualizationTitle?: string;
  @Input() visualizationType!: any;
  @Input() disableVisualizationChange!: boolean;
  visualizationTypes!: any[];

  showVisualizationTypes!: boolean;
  @Output()
  download: EventEmitter<DownloadFormat> = new EventEmitter<DownloadFormat>();
  @Output() fullscreenChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() visualizationTypeChange: EventEmitter<any> =
    new EventEmitter<any>();

  constructor() {
    this.visualizationTypes = VISUALIZATION_TYPES.filter(
      (visualizationType) => !visualizationType.hiddenInList
    );
  }

  onDownload(event: MouseEvent, format: DownloadFormat) {
    event.stopPropagation();
    this.download.emit(format);
  }

  onFullScreenAction(event: MouseEvent) {
    event.stopPropagation();
    this.fullscreenChange.emit();
  }

  onVisualizationTypeChange(event: MouseEvent, visualizationType: string) {
    event.stopPropagation();
    this.showVisualizationTypes = false;
    this.visualizationTypeChange.emit(visualizationType);
  }

  onToggleVisualizationType(event: MouseEvent) {
    event.stopPropagation();
    this.showVisualizationTypes = !this.showVisualizationTypes;
  }
}

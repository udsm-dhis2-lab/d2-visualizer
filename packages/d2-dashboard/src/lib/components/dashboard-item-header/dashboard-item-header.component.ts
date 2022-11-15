import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CHART_TYPES, DownloadFormat } from '@iapps/d2-visualizer';

@Component({
  selector: 'd2-dashboard-item-header',
  templateUrl: './dashboard-item-header.component.html',
  styleUrls: ['./dashboard-item-header.component.scss'],
})
export class DashboardItemHeaderComponent {
  @Input() fullScreen!: boolean;
  @Input() isChart!: boolean;
  @Input() hideChartTypes!: boolean | undefined;
  chartTypes!: any[];
  @Input() visualizationTitle?: string;
  @Input() visualizationType!: any;
  @Output()
  download: EventEmitter<DownloadFormat> = new EventEmitter<DownloadFormat>();
  @Output() fullscreenChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() typeChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.chartTypes = CHART_TYPES;
  }

  onDownload(event: MouseEvent, format: DownloadFormat) {
    event.stopPropagation();
    this.download.emit(format);
  }

  onFullScreenAction(event: MouseEvent) {
    event.stopPropagation();
    this.fullscreenChange.emit();
  }

  updateChartType(chartType: string, event: MouseEvent) {
    event.stopPropagation();
    // this.currentChartType = chartType;
    this.typeChange.emit(chartType);
  }
}

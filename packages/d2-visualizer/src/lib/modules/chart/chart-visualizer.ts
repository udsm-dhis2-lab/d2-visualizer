import * as Highcharts from 'highcharts';
import {
  BaseVisualizer,
  Visualizer,
} from '../../shared/models/base-visualizer.model';
import { DownloadFormat } from '../../shared/models/download-format.model';
import { VisualizationLayout } from '../../shared/models/visualization-layout.model';
import { VisualizationType } from '../../shared/models/visualization-type.model';
import { drawChart } from './helpers/draw-chart.helper';

declare const require: any;
const HighchartsGroupedCategories = require('highcharts-grouped-categories')(
    Highcharts
  ),
  HighchartsExporting = require('highcharts/modules/exporting')(Highcharts),
  OfflineHighchartExporting =
    require('highcharts/modules/offline-exporting.js')(Highcharts),
  HighchartsExportData = require('highcharts/modules/export-data')(Highcharts),
  HighchartsMore = require('highcharts/highcharts-more.js')(Highcharts),
  HighchartGauge = require('highcharts/modules/solid-gauge.js')(Highcharts),
  HighchartDrilldown = require('highcharts/modules/drilldown.js')(Highcharts);

/**
 *
 */
export class ChartVisualizer extends BaseVisualizer implements Visualizer {
  private _visualizationType: VisualizationType = 'CHART';
  private _layout: VisualizationLayout = new VisualizationLayout();
  private _chart: any;

  /**
   *
   * @param visualizationType
   * @returns
   */
  setVisualizationType(visualizationType: VisualizationType) {
    this._visualizationType = visualizationType;
    return this;
  }

  /**
   *
   * @param chartType
   * @returns
   */
  setChartType(chartType: string) {
    // this._chart = chartType;
    return this;
  }

  /**
   *
   */
  draw() {
    const chartObject = drawChart(this._data, this._config);
    setTimeout(() => {
      this._chart = Highcharts.chart(chartObject);
    }, 20);
  }

  /**
   *
   * @param downloadFormat
   */
  download(downloadFormat: DownloadFormat) {
    const filename = this._config?.title || 'chart-data';
    switch (downloadFormat) {
      case 'PNG':
        this._chart.exportChart({ filename, type: 'image/png' });
        break;
      case 'CSV':
        this._chart.getCSV();
        break;
    }
  }
}

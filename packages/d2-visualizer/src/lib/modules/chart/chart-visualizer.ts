import { VisualizationConfiguration } from '../../shared/visualization-configuration';
import * as Highcharts from 'highcharts';
import { drawChart } from './helpers/draw-chart.helper';
import { VisualizationLayout } from '../../shared/visualization-layout';
import { DownloadFormat } from '../../shared/download-format';
import { VisualizationType } from '../../shared/visualization-type';

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
export class ChartVisualization {
  private _visualizationType: VisualizationType = 'CHART';
  private _data: any;
  private _config?: VisualizationConfiguration;
  private _id!: string;
  private _layout: VisualizationLayout = new VisualizationLayout();
  private _chart: any;
  private _dataSelections: any;

  /**
   *
   * @param id
   * @returns
   */
  setId(id: string) {
    this._id = id;
    return this;
  }

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
    this._chart = chartType;
    return this;
  }

  /**
   *
   * @param data
   * @returns
   */
  setData(data: any) {
    this._data = data;
    return this;
  }

  /**
   * @description Set data selection criterias
   * @param dataSelections {any[]}
   * @returns {D2Visualizer}
   */
  setSelections(dataSelections: any[]) {
    this._dataSelections = dataSelections;
    return this;
  }

  /**
   *
   * @param config
   * @returns
   */
  setConfig(config: VisualizationConfiguration) {
    this._config = config;
    return this;
  }

  /**
   *
   */
  draw() {
    const chartObject = drawChart(this._data, {
      ...this._config,
      type: this._chart ? this._chart : 'column',
    });
    setTimeout(() => {
      this._chart = Highcharts.chart(chartObject);
    }, 20);
  }

  /**
   *
   * @param downloadFormat
   */
  download(downloadFormat: DownloadFormat) {
    const filename = this._config?.name || 'chart-data';
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

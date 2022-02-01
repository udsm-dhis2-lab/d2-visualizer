import { VisualizationConfiguration } from '../../shared/visualization-configuration';
import * as Highcharts from 'highcharts';
import { drawChart } from './helpers/draw-chart.helper';
import { VisualizationLayout } from '../../shared/visualization-layout';
import { DownloadFormat } from '../../shared/download-format';
import { ChartType, VisualizationType } from '../../shared/visualization-type';

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

export class ChartVisualization {
  private _type: ChartType = 'COLUMN';
  private _data: any;
  private _config?: VisualizationConfiguration;
  private _id!: string;
  private _layout: VisualizationLayout = new VisualizationLayout();
  private _chart: any;

  setId(id: string) {
    this._id = id;
    return this;
  }

  setType(type: ChartType) {
    this._type = type;
    return this;
  }

  setData(data: any) {
    this._data = data;
    return this;
  }

  setConfig(config: VisualizationConfiguration) {
    this._config = config;
    return this;
  }

  draw() {
    const chartObject = drawChart(this._data, this._config);
    setTimeout(() => {
      this._chart = Highcharts.chart(chartObject);
    }, 20);
  }

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

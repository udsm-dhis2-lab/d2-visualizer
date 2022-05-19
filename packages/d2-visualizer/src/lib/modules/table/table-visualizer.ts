import { DownloadFormat } from '../../shared/download-format';
import { VisualizationConfiguration } from '../../shared/visualization-configuration';
import { VisualizationLayout } from '../../shared/visualization-layout';
import { VisualizationType } from '../../shared/visualization-type';
import { tableCreate } from './helpers/table-helper';

export class TableVisualization {
  private _visualizationType: VisualizationType = 'REPORT_TABLE';
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
    console.log('what configs are passed');
    console.log(config);

    this._config = config;
    return this;
  }

  /**
   *
   */
  draw() {
    //   add logic to draw table
    tableCreate(this._id, this._data, this._config);
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

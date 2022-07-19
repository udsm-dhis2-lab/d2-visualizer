import { VisualizationConfiguration } from './visualization-configuration';
import { VisualizationType } from './visualization-type';

export interface Visualizer {
  draw: () => void;
}

export class BaseVisualizer {
  protected _id!: string;
  protected _data: any;
  protected _config?: VisualizationConfiguration;
  private _dataSelections: any;
  protected _trackedEntityInstances?: any[];
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
   * @param data
   * @returns
   */
  setData(data: any) {
    this._data = data;
    return this;
  }

  /**
   *
   * @param tracked entity instances
   * @returns
   */
  setTrackedEntityInstances(trackedEntityInstances?: any[]) {
    this._trackedEntityInstances = trackedEntityInstances;
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
   * @description Set data selection criterias
   * @param dataSelections {any[]}
   * @returns {D2Visualizer}
   */
  setSelections(dataSelections: any[]) {
    this._dataSelections = dataSelections;
    return this;
  }
}

import { Fn } from '@iapps/function-analytics';
import { ChartVisualization } from './modules/chart/chart-visualizer';
import { TableVisualization } from './modules/table/table-visualizer';
import { LegendSet } from './modules/map/models/legend-set.model';
import { MapAnalytic } from './modules/map/models/map-analytic.model';
import { MapUtil } from './modules/map/utils/map.util';
import { VisualizationConfiguration } from './shared/visualization-configuration';
import { VisualizationLayout } from './shared/visualization-layout';
import { ChartType, VisualizationType } from './shared/visualization-type';

export class D2Visualizer {
  dataSelections: any[] = [];
  geoFeatures: any[] = [];
  dataAnalytics: unknown = null;
  legendSet: LegendSet | undefined | any = null;
  type!: VisualizationType;
  visualizationType!: VisualizationType;
  config!: VisualizationConfiguration;
  chartType!: any;
  id!: string;
  /**
   * @description Set id to be used in rendering intended visualization
   * @param id String
   * @returns {D2Visualizer}
   */
  setId(id: string) {
    this.id = id;
    return this;
  }

  /**
   *
   * @param chartType
   * @returns
   */
  setChartType(chartType: string) {
    this.chartType = chartType;
    return this;
  }

  /**
   * @description Set data selection criterias
   * @param dataSelections {any[]}
   * @returns {D2Visualizer}
   */
  setSelections(dataSelections: any[]) {
    this.dataSelections = dataSelections;
    return this;
  }

  /**
   * @description Set visualization type
   * @param type {VisualizationType}
   * @returns {D2Visualizer}
   */
  setType(type: VisualizationType) {
    this.visualizationType = type;
    return this;
  }

  /**
   * @description Set visualization configurations
   * @param config {any}
   * @returns {D2Visualizer}
   */
  setConfig(config: any) {
    this.config = new VisualizationConfiguration(config);
    return this;
  }

  /**
   *
   * @param analytics
   * @returns
   */
  setData(analytics: any) {
    this.dataAnalytics = analytics;
    return this;
  }

  /**
   *
   * @param geoFeatures
   * @returns
   */
  setGeoFeatures(geoFeatures: any) {
    this.geoFeatures = geoFeatures;
    return this;
  }

  /**
   *
   * @param legendSet
   * @returns
   */
  setLegendSet(legendSet: LegendSet) {
    this.legendSet = legendSet;
    return this;
  }

  /**
   * @description Get data selection layout orientation
   * @returns {VisualizationLayout}
   */
  get layout(): VisualizationLayout | null {
    // TODO Find best way to pass data Selections
    return VisualizationLayout.getLayout();
  }

  private getData(): Promise<any> {
    const analyticPromise = new Fn.Analytics();

    (this.dataSelections || []).forEach((dataSelection) => {
      switch (dataSelection.dimension) {
        case 'dx':
          analyticPromise.setData(
            dataSelection.items
              .map(
                (item: { dimensionItem: any; id: any }) =>
                  item.dimensionItem || item.id
              )
              .join(';')
          );
          break;

        case 'pe':
          analyticPromise.setPeriod(
            dataSelection.items
              .map(
                (item: { dimensionItem: any; id: any }) =>
                  item.dimensionItem || item.id
              )
              .join(';')
          );
          break;

        case 'ou':
          analyticPromise.setOrgUnit(
            dataSelection.items
              .map(
                (item: { dimensionItem: any; id: any }) =>
                  item.dimensionItem || item.id
              )
              .join(';')
          );
          break;

        default:
          analyticPromise.setDimension(
            dataSelection?.dimension,
            dataSelection.items.map((item: { id: any }) => item.id).join(';')
          );

          break;
      }
    });

    return analyticPromise.get();
  }

  async draw(): Promise<any> {

    console.log("should be CHART | MAP | REPORT_TABLE")
    console.log(this.visualizationType)

    if (this.dataAnalytics) {
      switch (this.visualizationType) {
        case 'CHART':
          return new ChartVisualization()
            .setId(this.id)
            .setConfig(this.config.config)
            .setData(this.dataAnalytics)
            .setVisualizationType(this.visualizationType as ChartType)
            .setChartType(this.chartType)
            .draw();
        case 'MAP':
          return new MapUtil()
            .setMapAnalytics(this.dataAnalytics as MapAnalytic)
            .setGeofeature(this.geoFeatures as any)
            .setLegendSet(this.legendSet)
            .setContainer('map-container-demo')
            .setType('thematic')
            .setShowLabel(true)
            .draw();
        case 'REPORT_TABLE':
          return new TableVisualization()
            .setId(this.id)
            .setConfig(this.config)
            .setData(this.dataAnalytics)
            .draw();
        default:
          return null;
      }
    }

    if (!this.dataAnalytics) {
      const data = await this.getData();
      switch (this.visualizationType) {
        case 'CHART':
          return new ChartVisualization()
            .setId(this.id)
            .setConfig(this.config)
            .setData(data.data)
            .setVisualizationType(this.visualizationType as ChartType)
            .setChartType(this.chartType)
            .draw();
        case 'MAP':
          return new MapUtil()
            .setMapAnalytics(this.dataAnalytics as MapAnalytic)
            .setGeofeature(this.geoFeatures as any)
            .setLegendSet(this.legendSet)
            .setContainer('map-container-demo')
            .setShowLabel(true)
            .draw();
        default:
          return null;
      }
    }
  }

  async download(downloadFormat: any): Promise<any> {
    const data = await this.getData();

    switch (this.visualizationType) {
      case 'CHART':
        return new ChartVisualization()
          .setId(this.id)
          .setConfig(this.config)
          .setData(data.data)
          .setVisualizationType(this.visualizationType as ChartType)
          .download(downloadFormat);
      default:
        return null;
    }
  }
}

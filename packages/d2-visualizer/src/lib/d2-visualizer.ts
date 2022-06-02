import { Fn } from '@iapps/function-analytics';
import { ChartVisualization } from './modules/chart/chart-visualizer';
import { LegendSet } from './modules/map/models/legend-set.model';
import { MapAnalytics } from './modules/map/models/map-analytic.model';
import { D2VisualizerMapControl } from './modules/map/models/map-control.model';
import { MapDashboardExtensionItem } from './modules/map/models/map-dashboard-extension.model';
import { MapDashboardItem } from './modules/map/models/map-dashboard-item.model';
import { MapUtil } from './modules/map/utils/map.util';
import { VisualizationConfiguration } from './shared/visualization-configuration';
import { VisualizationLayout } from './shared/visualization-layout';
import { ChartType, VisualizationType } from './shared/visualization-type';

export class D2Visualizer {
  dataSelections: any[] = [];
  type!: VisualizationType;
  visualizationType!: VisualizationType;
  config!: VisualizationConfiguration;
  chartType!: any;
  id!: string;
  d2VisualizerMapControl: D2VisualizerMapControl | any;
  legendSets: LegendSet[] | any = null;
  mapDashboardItem: MapDashboardItem | any;
  mapDashboardExtensionItem: MapDashboardExtensionItem | any;
  geoFeatures: any[] = [];
  dataAnalytics: unknown = null;
  layerStyle = 'default';

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
   * @param legendSets
   * @returns
   */
  setLegendSet(legendSets: LegendSet[]) {
    this.legendSets = legendSets;
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

  /**
   *
   * @param d2VisualizerMapControl
   * @returns
   */
  setD2VisualizerMapControl(d2VisualizerMapControl: D2VisualizerMapControl) {
    this.d2VisualizerMapControl = d2VisualizerMapControl;
    return this;
  }

  /**
   *
   * @returns
   */
  getD2VisualizerMapControl(): D2VisualizerMapControl {
    return this.d2VisualizerMapControl;
  }

  /**
   *
   * @param layerStyle
   * @returns
   */
  setLayerStyle(layerStyle: string) {
    this.layerStyle = layerStyle;
    return this;
  }

  /**
   *
   * @returns
   */
  getLayerStyle() {
    return this.layerStyle;
  }

  /**
   *
   */
  setDashboardItem(dashboardItem: MapDashboardItem) {
    this.mapDashboardItem = dashboardItem;
    return this;
  }

  /**
   *
   * @returns
   */
  getDashboardItem(): MapDashboardItem {
    return this.mapDashboardItem;
  }

  /**
   *
   * @param dashboardExtensionItem
   * @returns
   */
  setDashboardExtensionItem(dashboardExtensionItem: MapDashboardExtensionItem) {
    this.mapDashboardExtensionItem = dashboardExtensionItem;
    return this;
  }

  /**
   *
   * @returns
   */
  getDashboardExtensionItem(): MapDashboardExtensionItem {
    return this.mapDashboardExtensionItem;
  }

  /**
   *
   * @returns
   */
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

  /**
   *
   * @returns
   */
  async draw(): Promise<any> {
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
            .setMapAnalytics(this.dataAnalytics as MapAnalytics)
            .setGeofeature(this.geoFeatures as any)
            .setLegendSet(this.legendSets)
            .setMapDashboardItem(this.mapDashboardItem)
            .setMapDashboardExtensionItem(this.mapDashboardExtensionItem)
            .setContainer(this.id)
            .setStyle(this.layerStyle)
            .setShowLegend(this.d2VisualizerMapControl?.showMapLegend)
            .setShowLabel(this.d2VisualizerMapControl?.showMapLabel)
            .setShowValue(this.d2VisualizerMapControl?.showMapValue)
            .setShowMapTitle(this.d2VisualizerMapControl?.showMapTitle)
            .setShowBoundary(this.d2VisualizerMapControl?.showMapBoundary)
            .setShowMapSummary(this.d2VisualizerMapControl?.showMapSummary)
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
            .setMapAnalytics(this.dataAnalytics as MapAnalytics)
            .setGeofeature(this.geoFeatures as any)
            .setLegendSet(this.legendSets)
            .setContainer('map-container-demo')
            .setShowLabel(true)
            .draw();
        default:
          return null;
      }
    }
  }

  /**
   *
   * @param downloadFormat
   * @returns
   */
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

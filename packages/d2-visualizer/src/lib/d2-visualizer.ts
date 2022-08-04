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
import { TableUtil } from './modules/table/utils/table.util';
import { TableAnalytics } from './modules/table/models/table-analytics.model';
import { TableDashboardItem } from './modules/table/models/table-dashboard-item.model';
import { TableConfiguration } from './modules/table/models/table-config.model';

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

  nxAnalytic: any = {
    headers: [
      {
        name: 'dx',
        column: 'Data',
        valueType: 'TEXT',
        type: 'java.lang.String',
        hidden: false,
        meta: true,
      },
      {
        name: 'pe',
        column: 'Period',
        valueType: 'TEXT',
        type: 'java.lang.String',
        hidden: false,
        meta: true,
      },
      {
        name: 'value',
        column: 'Value',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false,
      },
    ],
    metaData: {
      items: {
        '2018': {
          name: '2018',
        },
        '2019': {
          name: '2019',
        },
        '2020': {
          name: '2020',
        },
        '2021': {
          name: '2021',
        },
        '2022': {
          name: '2022',
        },
        zTV6mfXXO8I: {
          name: 'TB-LTB: No. of household contacts of bacteriologically confirmed pulmonary TB started IPT, children under 5 years',
        },
        dx: {
          name: 'Data',
        },
        pe: {
          name: 'Period',
        },
        ou: {
          name: 'Organisation unit',
        },
        CAWjYmd5Dea: {
          name: 'United Republic of Tanzania',
        },
      },
      dimensions: {
        dx: ['zTV6mfXXO8I'],
        pe: ['2018', '2019', '2020', '2021', '2022'],
        ou: ['CAWjYmd5Dea'],
        co: [],
      },
    },
    width: 3,
    height: 5,
    rows: [
      ['zTV6mfXXO8I', '2018', '4754.0'],
      ['zTV6mfXXO8I', '2019', '8467.0'],
      ['zTV6mfXXO8I', '2020', '13225.0'],
      ['zTV6mfXXO8I', '2021', '16241.0'],
      ['zTV6mfXXO8I', '2022', '9780.0'],
    ],
    headerWidth: 3,
    id: 'pdb5xUfLHnM',
  };

  nxConfiguration: any = {
    renderId: 'visualization-container',
    type: 'cascade',
    title: 'Total Preventative Therapy (PT) targets',
    subtitle: 'Total Preventative Therapy (PT) targets',
    hideTitle: false,
    hideSubtitle: false,
    showData: true,
    hideEmptyRows: true,
    hideLegend: true,
    cumulativeValues: false,
    targetLineValue: 0,
    targetLineLabel: '',
    baseLineValue: 0,
    baseLineLabel: '',
    legendAlign: 'bottom',
    reverseLegend: false,
    showLabels: true,
    axes: [],
    rangeAxisMaxValue: 0,
    rangeAxisMinValue: 0,
    sortOrder: 0,
    percentStackedValues: false,
    multiAxisTypes: [],
    xAxisType: ['pe'],
    yAxisType: 'dx',
    zAxisType: ['ou'],
  };

  nxDataStoreConfig: any = {
    categories: [
      {
        color: '#70C8BE',
        id: '2018',
        name: '2018',
        sortOrder: '1',
        target: '303150',
      },
      {
        color: '#70C8BE',
        id: '2019',
        name: '2019',
        sortOrder: '2',
        target: '104460',
      },
      {
        color: '#70C8BE',
        id: '2020',
        name: '2020',
        sortOrder: '3',
        target: '148160',
      },
      {
        color: '#70C8BE',
        id: '2021',
        name: '2021',
        sortOrder: '4',
        target: '153680',
      },
      {
        color: '#70C8BE',
        id: '2022',
        name: '2022',
        sortOrder: '5',
        target: '161250',
      },
    ],
    id: 'pdb5xUfLHnM',
    indicator: {
      description:
        'TB-LTB: No. of household contacts of bacteriologically confirmed pulmonary TB started IPT, children under 5 years',
      id: 'zTV6mfXXO8I',
      name: 'TB-LTB: No. of household contacts of bacteriologically confirmed pulmonary TB started IPT, children under 5 years',
    },
    xAlignment: 'pe',
    yAlignment: 'dx',
    zAlignment: 'ou',
  };

  // Table Configuration
  tableDashboardItem: TableDashboardItem | any;
  tableAnalytics: TableAnalytics | any;
  tableConfiguration: TableConfiguration | any;
  tableLegendSets: LegendSet[] | any;

  /**
   *
   * @param tableDashboardItem
   * @returns
   */
  setTableDashboardItem(tableDashboardItem: TableDashboardItem) {
    this.tableDashboardItem = tableDashboardItem;
    return this;
  }

  /**
   *
   * @returns
   */
  getTableDashboardItem(): TableDashboardItem {
    return this.tableDashboardItem;
  }

  /**
   *
   * @param tableAnalytics
   * @returns
   */
  setTableAnalytics(tableAnalytics: TableAnalytics) {
    this.tableAnalytics = tableAnalytics;
    return this;
  }

  /**
   *
   * @returns
   */
  getTableAnalytics(): TableAnalytics {
    return this.tableAnalytics;
  }

  /**
   *
   * @param tableConfiguration
   * @returns
   */
  setTableConfiguration(tableConfiguration: TableConfiguration) {
    this.tableConfiguration = tableConfiguration;
    return this;
  }

  /**
   *
   * @param tableLegendSets
   * @returns
   */
  setTableLegendSet(tableLegendSets: LegendSet[]) {
    this.tableLegendSets = tableLegendSets;
    return this;
  }

  /**
   *
   * @returns
   */
  getTableLegendSet(): LegendSet[] {
    return this.tableLegendSets;
  }

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
    switch (this.visualizationType) {
      case 'CHART':
        // return new ChartVisualization()
        //   .setId(this.id)
        //   .setConfig(this.config.config)
        //   .setData(this.dataAnalytics)
        //   .setVisualizationType(this.visualizationType as ChartType)
        //   .setChartType(this.chartType)
        //   .draw();
        return new ChartVisualization()
          .setId(this.id)
          .setDataStoreConfig(
            !this.chartType || this.chartType === 'cascade'
              ? this.nxDataStoreConfig
              : undefined
          )
          .setConfig(
            !this.chartType || this.chartType === 'cascade'
              ? this.nxConfiguration
              : this.config.config
          )
          .setData(
            !this.chartType || this.chartType === 'cascade'
              ? this.nxAnalytic
              : this.dataAnalytics
          )
          .setVisualizationType(this.visualizationType as ChartType)
          .setChartType(this.chartType ? this.chartType : 'cascade')
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
      case 'REPORT_TABLE':
        return new TableUtil()
          .setTableDashboardItem(this.tableDashboardItem)
          .setTableConfiguration(this.tableConfiguration)
          .setTableAnalytics(this.tableAnalytics)
          .setLegendSet(this.legendSets)
          .draw();
      default:
        return null;
    }

    // if (!this.dataAnalytics) {
    //   const data = await this.getData();
    //   switch (this.visualizationType) {
    //     case 'CHART':
    //       return new ChartVisualization()
    //         .setId(this.id)
    //         .setConfig(this.config)
    //         .setData(data.data)
    //         .setVisualizationType(this.visualizationType as ChartType)
    //         .setChartType(this.chartType)
    //         .draw();
    //     case 'MAP':
    //       return new MapUtil()
    //         .setMapAnalytics(this.dataAnalytics as MapAnalytics)
    //         .setGeofeature(this.geoFeatures as any)
    //         .setLegendSet(this.legendSets)
    //         .setContainer('map-container-demo')
    //         .setShowLabel(true)
    //         .draw();
    //     default:
    //       return null;
    //   }
    // }
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

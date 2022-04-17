import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { chartConfigurations } from '../chart/config/chart-viz.config';
import { chartConfigs } from '../chart/config/chart.config';
import { ChartConfiguration } from '../chart/models/chart-viz.model';
import { Chart } from '../chart/models/chart.model';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { chartVisualizationAnalytics } from '../chart/config/analytic-viz.config';
import { getQueryParamValue } from '../../shared/helpers/param.helper';
import { MapCodeConfig } from './models/map-config.model';
import { dhisAnalytics, dhisGeofeatures } from './config/map-constants';

@Component({
  selector: 'iapps-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  chartConfigurations: ChartConfiguration = chartConfigurations;
  chartConfigs: Chart[] = chartConfigs;
  mapCodeConfig: MapCodeConfig | null = null;
  isInfoOpen = false;
  panelOpenState = false;
  step? = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: { [key: string]: any }) => {
        this.step = +getQueryParamValue(queryParams, 'ps');
        this.panelOpenState = true;
      }
    );
  }

  setStep(route: string, index?: number) {
    this.step = index;
    if (route) {
      this.router.navigate(['./', _.trim(route)], {
        queryParams: { ps: index },
      });
    }
  }

  ngAfterViewInit(): void {
    // const visualizer = new D2Visualizer()
    //   .setConfig(this.chartConfigurations)
    //   .setData(chartVisualizationAnalytics)
    //   .setId('visualization-container')
    //   .setType('CHART')
    //   .draw();
  }

  // onMenuClick(chartConfig: Chart) {
  //   if (chartConfig) {
  //     const visualizer = new D2Visualizer()
  //       .setConfig(this.chartConfigurations)
  //       .setData(chartVisualizationAnalytics)
  //       .setId('visualization-container')
  //       .setType('CHART')
  //       .setChartType(chartConfig.id)
  //       .draw();
  //   }
  // }

  onOpenInfo() {
    this.isInfoOpen = !this.isInfoOpen;
  }

  onInfoClose(status: boolean) {
    this.isInfoOpen = status ? status : false;
  }

  onMapConfigTabClick(configType: string) {
    this.isInfoOpen = !this.isInfoOpen;

    if (configType === 'analytics') {
      this.mapCodeConfig = {
        title: 'Analytics',
        language: 'json',
        snippet: dhisAnalytics,
      };
    }
    if (configType === 'geoFeatures') {
      this.mapCodeConfig = {
        title: 'GeoFeatures',
        language: 'json',
        snippet: dhisGeofeatures,
      };
    }
    if (configType === 'mapConfigurations') {
      this.mapCodeConfig = {
        title: 'GeoFeatures',
        language: 'json',
        snippet: {
          latitude: -5.66901,
          longitude: 34.8888,
          zoom: 5.8,
          fillColor: '#b2acfa',
          mapboxApiKey: '',
          mapboxStyle: '',
        },
      };
    }
    if (configType === 'mapCode') {
      this.mapCodeConfig = {
        title: 'Map Code',
        language: 'javascript',
        theme: 'vs-white',
        snippet:
          "const visualizer = new D2Visualizer()\n\t.setConfig(mapconfig)\n\t.setId('map-container')\n\t.setType('MAP')\n\t.setChartType('map')\n\t.setData(dhisAnalytics)\n\t.setGeoFeatures(dhisGeofeatures)\n\t.draw();",
      };
    }
  }

  onOpenDrawer(mapCodeConfig: MapCodeConfig) {
    this.isInfoOpen = true;
    this.mapCodeConfig = mapCodeConfig;
  }

  onMapTypeChange() {
    const mapconfig = {
      latitude: -5.66901,
      longitude: 34.8888,
      zoom: 5.8,
      fillColor: '#ff9900',
      mapboxApiKey: '',
      mapboxStyle: '',
      width: '500px',
      height: '500px',
    };
    const selections = [
      {
        dimension: 'dx',
        items: [
          {
            id: 'dy1a1mseGR7',
          },
        ],
      },
      {
        dimension: 'pe',
        items: [
          {
            id: '2020',
          },
        ],
      },
      {
        dimension: 'ou',
        items: [
          {
            id: 'ImspTQPwCqd;LEVEL-2',
          },
        ],
      },
    ];

    const visualizer = new D2Visualizer()
      .setConfig(mapconfig)
      // .setData(chartVisualizationAnalytics)

      .setId('map-container')
      .setType('MAP')
      .setChartType('map')
      // .setSelections(selections)
      .setData(dhisAnalytics)
      .setGeoFeatures(dhisGeofeatures)
      .draw();
  }
}

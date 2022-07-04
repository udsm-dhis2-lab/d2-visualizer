import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { chartConfigurations } from '../chart/config/chart-viz.config';
import { chartConfigs } from '../chart/config/chart.config';
import { ChartConfiguration } from '../chart/models/chart-viz.model';
import { Chart } from '../chart/models/chart.model';
import { getQueryParamValue } from '../../shared/helpers/param.helper';
import { MapCodeConfig } from './models/map-config.model';
import { dhisAnalytics, dhisGeofeatures } from './config/map-constants';
import { demoMapAnalytic } from './config/demo-analytic.config';
import { demoGeofeatures } from './config/demo-geofeature.config';
import { demoLegendSet } from './config/demo-legend.config';
import { MapAnalytics } from 'packages/ngx-d2-map/src/lib/models/map-analytic.model';
import { GeoFeature } from 'packages/ngx-d2-map/src/lib/models/map-geofeature.model';
import { LegendSet } from 'packages/ngx-d2-map/src/lib/models/legend-set.model';
import { d2LegendSets } from './config/d2-legend-set.config';
import { d2GeoFeatureSnapshotConfigs } from './config/d2-geofeature-snapshot.config';
import { GeoFeatureSnapshot } from './models/map-geofeature-snapshot.model';
import { d2ConfigAnalytics } from './config/d2-config-analytics.config';
import { mapDashboardItemConfigs } from './config/d2-map-dashboard-item.config';
import { MapDashboardItem } from './models/map-dashboard-item.model';
import { MapDashboardExtensionItem } from './models/map-dashboard-extension.model';
import { mapDashboardExtensionItem } from './config/d2-map-dashboard-extension.config';

@Component({
  selector: 'iapps-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  chartConfigurations: ChartConfiguration = chartConfigurations;
  mapAnalytics: MapAnalytics = demoMapAnalytic;
  mapGeoFeature: GeoFeature[] = demoGeofeatures;
  mapLegendSet: LegendSet = demoLegendSet;
  chartConfigs: Chart[] = chartConfigs;
  mapCodeConfig: MapCodeConfig | null = null;
  isInfoOpen = false;
  panelOpenState = false;
  step? = 0;
  mapRenderId: string = 'map-container';
  d2MapDashboardItemConfigs: MapDashboardItem[] = mapDashboardItemConfigs;
  d2MapDashboardExtensionItem: MapDashboardExtensionItem =
    mapDashboardExtensionItem;
  d2LegendSetConfigs: LegendSet[] = d2LegendSets;
  d2GeoFeatureConfigs: GeoFeatureSnapshot[] = d2GeoFeatureSnapshotConfigs;
  d2MapAnalytics: MapAnalytics[] = d2ConfigAnalytics;
  // d2LegendSetConfigs:

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: { [key: string]: any }) => {
        this.step = +getQueryParamValue(queryParams, 'ps');
        this.panelOpenState = true;
      }
    );

    this.mapRenderId = (Math.random() + 1).toString(36).substring(2);

    // Supportive Configuration for Map
    this.mapAnalytics = demoMapAnalytic;
    this.mapGeoFeature = demoGeofeatures;
    this.mapLegendSet = demoLegendSet;
  }

  setStep(route: string, index?: number) {
    this.step = index;
    if (route) {
      this.router.navigate(['./', _.trim(route)], {
        queryParams: { ps: index },
      });
    }
  }

  ngAfterViewInit(): void {}

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
    // Supportive Configuration for Map
    this.mapAnalytics = demoMapAnalytic;
    this.mapGeoFeature = demoGeofeatures;
    this.mapLegendSet = demoLegendSet;
    this.mapRenderId = (Math.random() + 1).toString(36).substring(2);
  }
}

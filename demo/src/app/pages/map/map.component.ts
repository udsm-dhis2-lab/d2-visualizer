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

@Component({
  selector: 'iapps-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  chartConfigurations: ChartConfiguration = chartConfigurations;
  chartConfigs: Chart[] = chartConfigs;

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
    const visualizer = new D2Visualizer()
      .setConfig(this.chartConfigurations)
      .setData(chartVisualizationAnalytics)
      .setId('visualization-container')
      .setType('CHART')
      .draw();
  }

  onMenuClick(chartConfig: Chart) {
    if (chartConfig) {
      const visualizer = new D2Visualizer()
        .setConfig(this.chartConfigurations)
        .setData(chartVisualizationAnalytics)
        .setId('visualization-container')
        .setType('CHART')
        .setChartType(chartConfig.id)
        .draw();
    }
  }
}

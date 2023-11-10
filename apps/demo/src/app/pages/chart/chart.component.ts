import { AfterViewInit, Component, OnInit } from '@angular/core';
import { chartConfigs } from './config/chart.config';
import { Chart } from './models/chart.model';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { chartConfigurations } from './config/chart-viz.config';
import { ChartConfiguration } from './models/chart-configuration.model';
import { chartVisualizationAnalytics } from './config/analytic-viz.config';
import { SourceCodeConfig } from './models/source-code.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { getQueryParamValue } from '../../shared/helpers/param.helper';
@Component({
  selector: 'iapps-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  chartConfigurations: ChartConfiguration = chartConfigurations;
  chartConfigs: Chart[] = chartConfigs;
  sourceCodeConfig: SourceCodeConfig | null = null;
  code = '';
  isInfoOpen = false;
  panelOpenState = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  step? = 0;

  setStep(route: string, index?: number) {
    this.step = index;
    if (route) {
      this.router.navigate(['./', _.trim(route)], {
        queryParams: { ps: index },
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: { [key: string]: any }) => {
        this.step = +getQueryParamValue(queryParams, 'ps');
      }
    );
  }

  ngAfterViewInit(): void {
    const visualizer = new D2Visualizer()
      .setConfig(this.chartConfigurations as any)
      .setData(chartVisualizationAnalytics)
      .setId('visualization-container')
      .setType('CHART')
      .draw();
  }

  onMenuClick(chartConfig: Chart) {
    if (chartConfig) {
      const visualizer = new D2Visualizer()
        .setConfig(this.chartConfigurations as any)
        .setData(chartVisualizationAnalytics)
        .setId('visualization-container')
        .setType('CHART')
        .setChartType(chartConfig.id)
        .draw();
    }
  }

  onOpenInfo() {
    this.isInfoOpen = !this.isInfoOpen;
  }

  onInfoClose(status: boolean) {
    this.isInfoOpen = status ? status : false;
  }

  onOpenDrawer(sourceCodeConfig: SourceCodeConfig) {
    this.isInfoOpen = true;
    this.sourceCodeConfig = sourceCodeConfig;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { getQueryParamValue } from '../../shared/helpers/param.helper';
import { chartVisualizationAnalytics } from '../chart/config/analytic-viz.config';
import { Chart } from '../chart/models/chart.model';
import { tableAnalytics } from './config/analytic-table.config';
import { tableConfigurations } from './config/configs-table.config';

@Component({
  selector: 'iapps-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableConfigurations: any = tableConfigurations;
  tableAnalytics: any = tableAnalytics;
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

  onMenuClick() {

    console.log(tableConfigurations)

    const visualizer = new D2Visualizer()
    .setConfig(this.tableConfigurations)
    .setData(tableAnalytics)
    .setId('table-visualization')
    .setType('REPORT_TABLE')
    .draw();



    // if (chartConfig) {
    //   const visualizer = new D2Visualizer()
    //     .setConfig(this.chartConfigurations)
    //     .setData(chartVisualizationAnalytics)
    //     .setId('visualization-container')
    //     .setType('CHART')
    //     .setChartType(chartConfig.id)
    //     .draw();
    // }
  }
}

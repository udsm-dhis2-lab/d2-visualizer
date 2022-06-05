import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { getQueryParamValue } from '../../shared/helpers/param.helper';
import { tableAnalytics } from './config/d2-config-analytics.config';
import { tableConfiguration } from './config/d2-table-configuration.config';
import { tableDashboardItem } from './config/d2-table-dashboard-item.config';
import { TableDashboardItem } from './models/table-dashboard-item.model';
import { LegendSet } from './models/legend-set.model';
import { TableAnalytics } from './models/table-analytics.model';
import { TableConfiguration } from './models/table-config.model';
import { tableLegendSets } from './config/d2-legend-set.config';
import { TablePayload } from './models/table-object.model';

@Component({
  selector: 'iapps-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableDashboardItem: TableDashboardItem | any;
  tableConfiguration: TableConfiguration | any;
  tableAnalytics: TableAnalytics | any;
  tableLegendSets: LegendSet[] = [];
  panelOpenState = false;
  step? = 0;
  tablePayload: TablePayload | any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: { [key: string]: any }) => {
        this.step = +getQueryParamValue(queryParams, 'ps');
        this.panelOpenState = true;
        this.tableDashboardItem = tableDashboardItem;
        this.tableConfiguration = tableConfiguration;
        this.tableAnalytics = tableAnalytics;
        this.tableLegendSets = tableLegendSets;
        this.generateTable();
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

  onTableTypeChange() {
    // Supportive Configuration for Map
    this.tableDashboardItem = tableDashboardItem;
    this.tableAnalytics = tableAnalytics;
    this.tableConfiguration = tableConfiguration;
    this.tableLegendSets = [];

    this.generateTable();
  }

  generateTable = async () => {
    if (this.tableLegendSets) {
      this.tablePayload = await new D2Visualizer()
      .setTableDashboardItem(this.tableDashboardItem)
      .setTableAnalytics(this.tableAnalytics)
      .setLegendSet(this.tableLegendSets as any)
      .setTableConfiguration(this.tableConfiguration)
      .setType('REPORT_TABLE')
      .draw();
    }
  }
}

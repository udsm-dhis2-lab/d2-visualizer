/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LegendSet } from './models/legend-set.model';
import { TableConfiguration } from './models/table-config.model';
import { TablePayload } from './models/table-object.model';
import { D2Visualizer } from '@iapps/d2-visualizer';
import * as _ from 'lodash';
import { TableDashboardItem } from './models/table-dashboard-item.model';
import { TableAnalytics } from './models/table-analytics.model';

@Component({
  selector: 'iapps-ngx-d2-table',
  templateUrl: './ngx-d2-table.component.html',
  styleUrls: ['./ngx-d2-table.component.scss'],
})
export class NgxD2TableComponent implements OnInit {
  @Input() legendSets: LegendSet[] | any;
  @Input() tableDashboardItem: TableDashboardItem | any;
  @Input() tableConfiguration: TableConfiguration | any;
  @Input() tableAnalytics: TableAnalytics | any;
  @ViewChild('table') table: ElementRef | any;

  tablePayload: TablePayload | any;

  sort_direction: string[] = [];
  current_sorting: boolean[] = [];

  constructor() {}
  ngAfterViewInit(): void {
    this.generateDashboardTable();
  }

  generateDashboardTable = async () => {
    if (
      this.tableDashboardItem &&
      this.tableAnalytics &&
      this.tableConfiguration
    ) {
      try {
        this.tablePayload = await new D2Visualizer()
          .setTableDashboardItem(this.tableDashboardItem)
          .setTableAnalytics(this.tableAnalytics)
          .setTableConfiguration(this.tableConfiguration)
          .setType('REPORT_TABLE')
          .draw();
      } catch (error) {
        console.log(error);
      }
    }
  };

  sortData(tablePayload: TablePayload, n: any, isLastItem: any) {
    if (tablePayload.columns.length === 1 && isLastItem) {
      this.current_sorting = [];
      this.current_sorting[n] = true;
      let rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      const table = document.getElementById(
        `${_.trim(this.tableConfiguration.id)}_body`
      );
      switching = true;
      //  Set the sorting direction to ascending:
      dir = 'asc';
      /*Make a loop that will continue until
      no switching has been done:*/
      if (table) {
        while (switching) {
          //  start by saying: no switching is done:
          switching = false;
          rows = table.getElementsByTagName('TR');
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 0; i < rows.length - 1; i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 1].getElementsByTagName('TD')[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === 'asc') {
              if (parseFloat(x.innerHTML)) {
                if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                  // if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              } else {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  // if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              }
              this.sort_direction[n] = 'asc';
            } else if (dir === 'desc') {
              if (parseFloat(x.innerHTML)) {
                if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                  // if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              } else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  // if so, mark as a switch and break the loop:
                  shouldSwitch = true;
                  break;
                }
              }
              this.sort_direction[n] = 'desc';
            }
          }
          if (shouldSwitch && rows && rows[i] && rows[i].parentNode) {
            /*If a switch has been marked, make the switch and mark that a switch has been done:*/
            rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
          } else {
            /*If no switching has been done AND the direction is 'asc',
            set the direction to 'desc' and run the while loop again.*/
            if (switchcount === 0 && dir === 'asc') {
              dir = 'desc';
              this.sort_direction[n] = 'desc';
              switching = true;
            }
          }
        }
      }
    }
  }
}

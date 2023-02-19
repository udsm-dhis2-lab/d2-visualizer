import { Component, Input, OnInit } from '@angular/core';
import { DashboardMenuObject } from '../../models';

@Component({
  selector: 'd2-dashboard-sub-menu',
  templateUrl: './dashboard-sub-menu.component.html',
  styleUrls: ['./dashboard-sub-menu.component.scss'],
})
export class DashboardSubMenuComponent implements OnInit {
  @Input() dashboardSubMenus!: DashboardMenuObject[];
  constructor() {}

  ngOnInit() {
    console.log(this.dashboardSubMenus);
  }
}

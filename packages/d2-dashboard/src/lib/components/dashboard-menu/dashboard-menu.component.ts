import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardMenuObject } from '../../models';

@Component({
  selector: 'iapps-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
})
export class DashboardMenuComponent implements OnInit {
  @Input() dashboardMenuItems!: DashboardMenuObject[];
  @Input() currentDashboardId?: string;

  @Output() setCurrentDashboard: EventEmitter<DashboardMenuObject> =
    new EventEmitter<DashboardMenuObject>();

  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(dashboardMenuItem: DashboardMenuObject) {
    this.setCurrentDashboard.emit(dashboardMenuItem);
  }
}

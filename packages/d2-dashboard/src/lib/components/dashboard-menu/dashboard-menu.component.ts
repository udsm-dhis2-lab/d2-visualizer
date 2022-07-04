import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardMenuObject } from '../../models';

@Component({
  selector: 'iapps-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
})
export class DashboardMenuComponent {
  @Input() dashboardMenuItems!: DashboardMenuObject[];
  @Input() currentDashboardId?: string;

  searchTerm?: string;

  @Output() setCurrentDashboard: EventEmitter<DashboardMenuObject> =
    new EventEmitter<DashboardMenuObject>();

  constructor() {}

  onSetCurrentDashboard(dashboardMenuItem: DashboardMenuObject) {
    this.setCurrentDashboard.emit(dashboardMenuItem);
  }

  onSearchDashboard(e: KeyboardEvent) {
    e.stopPropagation();
    this.searchTerm = (e.target as any)?.value;
  }
}

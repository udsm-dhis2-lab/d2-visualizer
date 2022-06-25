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

  @Output() setCurrentDashboard: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }
}

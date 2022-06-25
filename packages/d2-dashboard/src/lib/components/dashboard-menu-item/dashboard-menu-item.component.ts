import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardMenuObject } from '../../models';

@Component({
  selector: 'iapps-dashboard-menu-item',
  templateUrl: './dashboard-menu-item.component.html',
  styleUrls: ['./dashboard-menu-item.component.scss'],
})
export class DashboardMenuItemComponent implements OnInit {
  @Input() dashboardMenuItem!: DashboardMenuObject;
  @Input() isCurrentDashboard?: boolean;
  @Output() setDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSetDashboard(e: MouseEvent) {
    e.stopPropagation();
    if (!this.isCurrentDashboard) {
      this.setDashboard.emit(this.dashboardMenuItem?.id);
    }
  }
}

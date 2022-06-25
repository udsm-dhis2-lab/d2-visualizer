import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'iapps-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.scss'],
})
export class DashboardItemsComponent implements OnInit {
  @Input() dashboardItems!: any[];
  constructor() {}

  ngOnInit() {}
}

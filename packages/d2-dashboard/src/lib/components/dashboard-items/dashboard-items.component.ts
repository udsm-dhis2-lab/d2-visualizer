import { Component, Input, OnInit } from '@angular/core';
import { ktdTrackById, KtdGridLayout } from '@katoid/angular-grid-layout';

@Component({
  selector: 'iapps-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.scss'],
})
export class DashboardItemsComponent implements OnInit {
  @Input() dashboardItems!: any[];

  cols = 12;
  rowHeight = 100;
  layout: KtdGridLayout = [
    { id: '0', x: 0, y: 0, w: 3, h: 3 },
    { id: '1', x: 3, y: 0, w: 3, h: 3 },
    { id: '2', x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 3 },
    { id: '3', x: 3, y: 3, w: 3, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 5 },
  ];
  trackById = ktdTrackById;
  constructor() {}

  ngOnInit() {}
}

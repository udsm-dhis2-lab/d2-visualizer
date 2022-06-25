import { Component, Input, OnInit } from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { DashboardItemObject } from '../../models';

@Component({
  selector: 'iapps-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.scss'],
})
export class DashboardItemsComponent implements OnInit {
  @Input() dashboardItems!: DashboardItemObject[];

  cols = 60;
  rowHeight = 20;
  // layout: KtdGridLayout = [
  //   { id: '0', x: 0, y: 0, w: 3, h: 3 },
  //   { id: '1', x: 3, y: 0, w: 3, h: 3 },
  //   { id: '2', x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 3 },
  //   { id: '3', x: 3, y: 3, w: 3, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 5 },
  // ];
  trackById = ktdTrackById;
  constructor() {}

  get layout(): KtdGridLayout {
    return (this.dashboardItems || []).map((dashboardItem) => {
      const { id, x, y, h, w } = dashboardItem;
      return { id, x, y, h, w };
    });
  }

  ngOnInit() {}
}

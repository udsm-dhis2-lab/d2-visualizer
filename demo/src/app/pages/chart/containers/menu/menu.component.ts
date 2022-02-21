import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { chartVisualizationAnalytics } from '../../config/analytic-viz.config';
import { chartConfigurations } from '../../config/chart-viz.config';

@Component({
  selector: 'iapps-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() onOpenDrawer = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onTabClick(config: string) {
    this.onOpenDrawer.emit({
      language: 'json',
      title:
        config === 'analyticsTab'
          ? 'DHIS2 Analytics Configuration'
          : 'Chart Configuration',
      snippet:
        config === 'analyticsTab'
          ? chartVisualizationAnalytics
          : chartConfigurations,
    });
  }
}

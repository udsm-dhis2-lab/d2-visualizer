import { Component, Input, OnInit } from '@angular/core';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { firstValueFrom } from 'rxjs';
import { DashboardItemObject } from '../../models';
import { DashboardItemService } from '../../services';

@Component({
  selector: 'iapps-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
})
export class DashboardItemComponent implements OnInit {
  @Input() dashboardItem!: DashboardItemObject;
  constructor(private dashboardItemService: DashboardItemService) {}

  async ngOnInit() {
    if (this.dashboardItem?.visualization?.id) {
      const visualiationConfig = await firstValueFrom(
        this.dashboardItemService.getVisualization(
          this.dashboardItem?.visualization?.id as string
        )
      );

      await new D2Visualizer()
        .setConfig(visualiationConfig)
        .setType('CHART')
        .setChartType(visualiationConfig.type)
        .draw();
    }
  }
}

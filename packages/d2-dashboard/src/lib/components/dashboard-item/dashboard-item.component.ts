import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { firstValueFrom } from 'rxjs';
import { DashboardItemObject, VisualizationDataSelection } from '../../models';
import { DashboardItemService } from '../../services';

@Component({
  selector: 'iapps-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemComponent implements OnInit, OnChanges {
  @Input() dashboardItem!: DashboardItemObject;
  @Input() dataSelections?: VisualizationDataSelection[];

  visualizationConfig: any;
  loading?: boolean;
  error?: any;
  constructor(private dashboardItemService: DashboardItemService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSelections'] && !changes['dataSelections'].firstChange) {
      this.setVisualization();
    }
  }

  async ngOnInit() {
    this.setVisualization();
  }

  async setVisualization() {
    if (this.dashboardItem?.visualization?.id) {
      this.loading = true;
      try {
        this.visualizationConfig =
          this.visualizationConfig ||
          (await firstValueFrom(
            this.dashboardItemService.getVisualization(
              this.dashboardItem?.visualization?.id as string
            )
          ));

        this.loading = false;
        await new D2Visualizer()
          .setConfig(this.visualizationConfig)
          .setSelections(this.dataSelections || [])
          .setType('CHART')
          .setChartType(this.visualizationConfig.type)
          .draw();
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    }
  }
}

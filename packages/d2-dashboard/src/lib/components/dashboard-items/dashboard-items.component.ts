import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { DashboardItemObject, VisualizationDataSelection } from '../../models';

@Component({
  selector: 'iapps-dashboard-items',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardItemsComponent {
  @Input() dashboardItems!: DashboardItemObject[];
  @Input() dashboardItemsLayout!: KtdGridLayout;
  @Input() dataSelections?: VisualizationDataSelection[];

  cols = 60;
  rowHeight = 20;

  trackById = ktdTrackById;
}

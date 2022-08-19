import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DashboardObject, VisualizationDataSelection } from '../../models';

@Component({
  selector: 'd2-current-dashboard-header',
  templateUrl: './current-dashboard-header.component.html',
  styleUrls: ['./current-dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentDashboardHeaderComponent {
  @Input() dashboard!: Partial<DashboardObject>;

  @Output() setGlobalFilter = new EventEmitter<VisualizationDataSelection[]>();

  onFilterSelection(selectedFilters: VisualizationDataSelection[]) {
    this.setGlobalFilter.emit(selectedFilters);
  }
}

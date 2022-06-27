import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { find } from 'lodash';
import { VisualizationDataSelection } from '../../models';

@Component({
  selector: 'iapps-dashboard-selection-summary',
  templateUrl: './dashboard-selection-summary.component.html',
  styleUrls: ['./dashboard-selection-summary.component.scss'],
})
export class DashboardSelectionSummaryComponent implements OnInit {
  @Input() dataSelections: VisualizationDataSelection[] = [];

  @Output() removeSelection: EventEmitter<VisualizationDataSelection[]> =
    new EventEmitter<VisualizationDataSelection[]>();
  constructor() {}

  ngOnInit(): void {}

  onRemoveSelection(e: MouseEvent, dimension: string) {
    e.stopPropagation();

    const availableSelection = find(this.dataSelections, [
      'dimension',
      dimension,
    ]);

    if (availableSelection) {
      const indexToRemove = this.dataSelections.indexOf(availableSelection);
      this.removeSelection.emit([
        ...this.dataSelections.slice(0, indexToRemove),
        ...this.dataSelections.slice(indexToRemove + 1),
      ]);
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  GlobalFilter,
  VisualizationDataSelection,
  VisualizationDataSelectionItem,
} from '../../models';
import { OrgUnitFilterDialogComponent } from './dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';
import { PeriodFilterDialogComponent } from './dialogs/period-filter-dialog/period-filter-dialog.component';
import { keys } from 'lodash';

@Component({
  selector: 'iapps-dashboard-selection-filters',
  templateUrl: './dashboard-selection-filters.component.html',
  styleUrls: ['./dashboard-selection-filters.component.scss'],
})
export class DashboardSelectionFiltersComponent {
  @Input() dataSelections!: VisualizationDataSelection[];
  selectionEntities: { [key: string]: object } = {};
  @Output() setFilterSelection = new EventEmitter<
    VisualizationDataSelection[]
  >();
  constructor(private dialog: MatDialog) {}

  onOpenPeriodDialog(e: MouseEvent) {
    e.stopPropagation();

    const periodDialog = this.dialog.open(PeriodFilterDialogComponent, {
      width: '800px',
      data: {},
    });

    periodDialog.afterClosed().subscribe((res) => {
      if (res?.action === 'UPDATE') {
        this.selectionEntities = {
          ...this.selectionEntities,
          pe: res?.periodObject?.items || [],
        };

        this.setFilterSelection.emit(this._getVisualizationSelections());
      }
    });
  }

  onOpenOrgUnitDialog(e: MouseEvent) {
    e.stopPropagation();

    const orgUnitDialog = this.dialog.open(OrgUnitFilterDialogComponent, {
      width: '800px',
      data: {},
    });

    orgUnitDialog.afterClosed().subscribe((res) => {
      if (res?.action === 'UPDATE') {
        this.selectionEntities = {
          ...this.selectionEntities,
          ou: res?.selectionItems?.items || [],
        };

        this.setFilterSelection.emit(this._getVisualizationSelections());
      }
    });
  }

  private _getVisualizationSelections(): VisualizationDataSelection[] {
    return keys(this.selectionEntities).map((dimensionKey: string) => {
      return {
        dimension: dimensionKey,
        items: this.selectionEntities[
          dimensionKey
        ] as VisualizationDataSelectionItem[],
      };
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrgUnitFilterDialogComponent } from './dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';

@Component({
  selector: 'iapps-dashboard-selection-filters',
  templateUrl: './dashboard-selection-filters.component.html',
  styleUrls: ['./dashboard-selection-filters.component.scss'],
})
export class DashboardSelectionFiltersComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  toggleCurrentFilter(e: MouseEvent, selectedFilter: any, layout?: string) {
    e.stopPropagation();
  }

  onOpenPeriodDialog(e: MouseEvent) {
    e.stopPropagation();
  }

  onOpenOrgUnitDialog(e: MouseEvent) {
    e.stopPropagation();

    const orgUnitDialog = this.dialog.open(OrgUnitFilterDialogComponent, {
      width: '800px',
      data: {},
    });

    orgUnitDialog.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}

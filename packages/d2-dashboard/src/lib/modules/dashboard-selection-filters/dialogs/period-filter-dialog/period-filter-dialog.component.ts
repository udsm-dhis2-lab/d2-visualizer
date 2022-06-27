import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';

@Component({
  selector: 'iapps-period-filter-dialog',
  templateUrl: './period-filter-dialog.component.html',
  styleUrls: ['./period-filter-dialog.component.css'],
})
export class PeriodFilterDialogComponent implements OnInit {
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: false,
    emitOnSelection: false,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
    contentHeight: '300px',
  };
  constructor(
    private dialogRef: MatDialogRef<PeriodFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {}

  ngOnInit() {}

  onPeriodUpdate(periodObject: any, action: string): void {
    this.dialogRef.close({
      periodObject,
      action,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { DashboardResponse } from '../../models';
import { DashboardService } from '../../services';

@Component({
  selector: 'iapps-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
})
export class CurrentDashboardComponent implements OnInit {
  dashboardResponse$!: Observable<DashboardResponse>;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService
      .getCurrentDashboardId()
      .pipe(filter((id: string) => id.length > 0))
      .subscribe((id) => {
        this.dashboardResponse$ =
          this.dashboardService.getCurrentDashboardResponse(id);
      });
  }
}

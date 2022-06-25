import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardMenu, DashboardMenuObject } from '../models';
import { DashboardMenuResponse } from '../models/dashboard-menu-response.model';

@Injectable()
export class DashboardService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private router: Router
  ) {}

  getMenuResponse(config?: any): Observable<DashboardMenuResponse> {
    return this.findMenuList(config).pipe(
      map((dashboardMenuItems: DashboardMenuObject[]) => {
        const currentDashboardId = dashboardMenuItems[0]?.id;
        this.setCurrentDashboard(currentDashboardId);
        return {
          loading: false,
          error: undefined,
          currentDashboardId,
          dashboardMenuItems,
        };
      }),
      catchError((error: any) => {
        return of({
          loading: false,
          error,
          currentDashboardId: '',
          dashboardMenuItems: [],
        });
      })
    );
  }

  setCurrentDashboard(id: string) {
    this.router.navigate(['/dashboard/' + id]);
  }

  findMenuList(config: any): Observable<DashboardMenuObject[]> {
    return (
      config?.useDataStore ? this.findAllFromDataStore() : this.findAllFromApi()
    ).pipe(
      map((res) =>
        (res?.dashboards || []).map(
          (dashboard: { [key: string]: string | number | object }) =>
            new DashboardMenu(dashboard).toObject()
        )
      )
    );
  }

  findAllFromApi() {
    return this.httpClient.get('dashboards.json?fields=id,name&paging=false');
  }

  findAllFromDataStore() {
    return of({ dashboards: [] });
  }

  findById(id: string, preference?: any) {}
}

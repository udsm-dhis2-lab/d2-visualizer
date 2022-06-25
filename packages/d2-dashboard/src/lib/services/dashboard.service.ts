import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardMenu, DashboardMenuObject } from '../models';

@Injectable()
export class DashboardService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getMenuList(config?: any): Observable<DashboardMenuObject[]> {
    return this.httpClient
      .get('dashboards.json?fields=id,name')
      .pipe(
        map((res) =>
          (res?.dashboards || []).map(
            (dashboard: { [key: string]: string | number | object }) =>
              new DashboardMenu(dashboard).toObject()
          )
        )
      );
  }

  findById(id: string, preference?: any) {}
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import {
  BehaviorSubject,
  firstValueFrom,
  from,
  lastValueFrom,
  Observable,
  of,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Dashboard,
  DashboardMenu,
  DashboardMenuObject,
  DashboardObject,
  DashboardResponse,
} from '../models';
import { DashboardMenuResponse } from '../models/dashboard-menu-response.model';

interface DashboardStore {
  currentDashboardId: string;
}

@Injectable()
export class DashboardService {
  private _dashboardStore$: BehaviorSubject<DashboardStore>;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this._dashboardStore$ = new BehaviorSubject({
      currentDashboardId: '',
    });
  }

  getMenuResponse(config?: any): Observable<DashboardMenuResponse> {
    return this._findMenuList(config).pipe(
      map((dashboardMenuItems: DashboardMenuObject[]) => {
        const splitedUrl = (window.location.href || '').split('/');
        const currentDashboardId =
          splitedUrl[splitedUrl.indexOf('dashboard') + 1] ||
          dashboardMenuItems[0]?.id;

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

  getCurrentDashboardResponse(
    id: string,
    config?: any
  ): Observable<DashboardResponse> {
    return (
      config?.useDataStore
        ? this._findByIdFromDataStore(id)
        : this._findByIdFromApi(id, config)
    ).pipe(
      map((dashboard: DashboardObject) => ({
        loading: false,
        error: undefined,
        dashboard: dashboard,
      })),
      catchError((error) => {
        return of({
          loading: false,
          error,
          dashboard: undefined,
        });
      })
    );
  }

  async setCurrentDashboard(id: string) {
    const dashboardStore = await firstValueFrom(
      this._dashboardStore$.asObservable()
    );
    this._dashboardStore$.next({ ...dashboardStore, currentDashboardId: id });
    this.router.navigate(['/dashboard/' + id]);
  }

  getCurrentDashboardId(): Observable<string> {
    return this._dashboardStore$
      .asObservable()
      .pipe(map((dashboardStore) => dashboardStore?.currentDashboardId));
  }

  private _findMenuList(config: any): Observable<DashboardMenuObject[]> {
    return (
      config?.useDataStore
        ? this._findAllFromDataStore()
        : this._findAllFromApi()
    ).pipe(
      map((res) =>
        (res?.dashboards || []).map(
          (dashboard: { [key: string]: string | number | object }) =>
            new DashboardMenu(dashboard).toObject()
        )
      )
    );
  }

  private _findAllFromApi() {
    return this.httpClient.get('dashboards.json?fields=id,name&paging=false');
  }

  private _findAllFromDataStore() {
    return of({ dashboards: [] });
  }

  private _findByIdFromApi(id: string, preference?: any) {
    return this.httpClient
      .get(
        `dashboards/${id}.json?fields=id,name,description,favorite,dashboardItems[id,type,x,y,height,width,shape,visualization[id],chart~rename(visualization)]`
      )
      .pipe(
        map((dashboardResponse) => new Dashboard(dashboardResponse).toObject())
      );
  }

  private _findByIdFromDataStore(id: string, preference?: any) {
    return this.httpClient.get(
      `dashboards/${id}.json?fields=id,name,description,favorite,dashboardItems[id,type,shape,visualization[id],chart~rename(visualization)]`
    );
  }
}
